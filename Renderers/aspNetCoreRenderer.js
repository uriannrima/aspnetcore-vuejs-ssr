const preRendering = require('aspnet-prerendering')
const renderer = require('./vueServerRenderer');

module.exports = preRendering.createServerRenderer(params => {
  return new Promise((resolve, reject) => {
    renderer(params).then(({ html, context }) => {
      // Return it to the ASP.NET Server Side Rendering
      // Withe the "window.__INITIAL_STATE__" with the updated Context.State (Store State)
      const response = {
        html,
        globals: {
          __INITIAL_STATE__: context.state
        }
      };

      resolve(response);
    }).catch(reject);
  });
});
