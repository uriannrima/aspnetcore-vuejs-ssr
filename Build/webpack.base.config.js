const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

console.log();

module.exports = {
  output: {
    path: path.resolve(__dirname, '../wwwroot/dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
}