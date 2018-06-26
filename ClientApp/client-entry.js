import { createApp } from './app'

const { app, router, store } = createApp();

// If the Window has a __INITIAL_STATE__
if (window.__INITIAL_STATE__) {
  // Replace it to hydratate.
  store.replaceState(window.__INITIAL_STATE__);
}

// Wait for router to finish requesting components.
router.onReady(() => {

  // Fetch data before redirecting logic
  router.beforeResolve((to, from, next) => {
    const startTime = Date.now();

    // Get next and previous components.
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    // Check if the next are different from the previous one
    let diffed = false;
    const activated = matched.filter((component, index) => {
      return diffed || (diffed = (prevMatched[index] !== component));
    });

    // If no differents were found
    if (!activated.length) {
      // Just move next.
      next();
    }

    // Turn on loading indicator

    // Otherwhise load their async data.
    const asyncDataHooks = activated.map(component => component.asyncData).filter(_ => _)
    if (!asyncDataHooks) {
      return next();
    }

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to }))).then(() => {
      console.log(`data pre-fetch: ${Date.now() - startTime}ms`)
      // Remove loading
      next();
    }).catch(next);
  })

  // Mount the app
  app.$mount('#app');
})