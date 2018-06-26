const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');


module.exports = merge(baseConfig, {
  // Server Side Entry Point
  entry: {
    'main-server': path.resolve(__dirname, '../ClientApp/server-entry.js')
  },

  // Output on Node fashion
  target: 'node',

  // Bundle renderer source map
  devtool: 'source-map',

  // Node-style exports.
  output: {
    libraryTarget: 'commonjs2'
  },

  // Externalize apps dependencies.
  // Smaller and faster bundle size.
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    // https://ssr.vuejs.org/guide/build-config.html#externals-caveats
    whitelist: /\.css$/
  }),

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin()
  ]
})