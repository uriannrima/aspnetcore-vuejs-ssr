import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const { app, router, store } = createApp();

    // Push the URL to the router
    router.push(context.url);

    // Wait for it to resolve the url.
    router.onReady(() => {
      // Get the matched components
      const matchedComponents = router.getMatchedComponents();

      // Check if none was found.
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // Fetch async data for each component.
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({ store, route: router.currentRoute })
      )).then(() => {
        console.log(`data pre-fetch: ${Date.now() - startTime}ms`)
        // The store.state has been updated so...
        // Update context.state to be used on __INITIAL_STATE__
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject);
  });
}