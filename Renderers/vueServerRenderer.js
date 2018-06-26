// const serialize = require('serialize-javascript')

const { createBundleRenderer } = require('vue-server-renderer')

// Webpack Server/Client will output a JSON file with server bundle/client manifest.
const serverBundle = require('../wwwroot/dist/vue-ssr-server-bundle.json');
const clientManifest = require('../wwwroot/dist/vue-ssr-client-manifest.json');

/** Create context from ASP.NET params. */
function createContext(params) {
  return {
    title: params.title || 'Vue SSR', // default title
    url: params.url,
    // absoluteUrl: params.absoluteUrl,
    // baseUrl: params.baseUrl,
    // data: params.data,
    // domainTasks: params.domainTasks,
    // location: params.location,
    // origin: params.origin,
    // xss: serialize("</script><script>alert('Possible XSS vulnerability from user input!')</script>")
  };
}

module.exports = (params, template) => {
  const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    clientManifest,
    template
  })

  return new Promise(function (resolve, reject) {
    // Create context.
    const context = createContext(params);
    // Render app.
    renderer.renderToString(context).then(html => {
      resolve({ html, context })
    }).catch(reject);
  });
}