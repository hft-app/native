const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = (env, options) => {
  return {
    entry: {
      content: path.resolve(__dirname, 'src/main.js'),
      background: path.resolve(__dirname, 'src/platform/webext/background.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      alias: {
        'platform/fetch': path.resolve(__dirname, 'src/platform/webext/fetch.js')
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        chunks: ['content'],
        template: 'src/index.html'
      }),
      new CopyPlugin([
        {from: 'image/dist/icon_32.png', to: 'icon_32.png'},
        {from: 'image/dist/icon_48.png', to: 'icon_48.png'},
        {from: 'image/dist/icon_96.png', to: 'icon_96.png'},
        {from: 'manifest.json', to: 'manifest.json'},
      ]),
      // new BundleAnalyzerPlugin()
    ]
  }
};
