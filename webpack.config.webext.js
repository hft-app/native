const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');

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
                {from: 'image/icon.png', to: 'icon.png'},
                {from: 'manifest.json', to: 'manifest.json'},
            ]),
            new WriteFilePlugin(),
            new ZipPlugin({
                filename: 'hft-app',
                extension: 'xpi'
            })
            //new BundleAnalyzerPlugin()
        ]
    }
};
