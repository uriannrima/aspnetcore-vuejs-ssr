const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  // Server Side Entry Point
  entry: {
    'main-client': path.resolve(__dirname, '../ClientApp/client-entry.js')
  },
  target: 'web',
  plugins: [
    // Important: this splits the webpack runtime into a leading chunk
    // so that async chunks can be injected right after it.
    // this also enables better caching for your app/vendor code.
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),

    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin()
  ]
})

