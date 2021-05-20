const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const devMode = process.env.NODE_ENV !== 'production';


// To find which plugin(s) is causing DeprecationWarning(s) un-comment next line
// process.traceDeprecation = true;

module.exports = {
    entry: {
        base: './assets/js/base.js',
        linqs: './assets/js/linqs/linqs.js',
        snippets: './assets/js/snippets/snippets.js',

        vendor: [
          'react',
          'react-dom',
        //   'jquery',
          'bootstrap',
          // 'moment'
        ]
    },
    devtool: false,
    output: {
        filename: "[name]-[chunkhash].js",
        path: path.resolve(__dirname, 'build/bundles/'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.css$/i,
                // use: ['style-loader', 'css-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        // css to their own files
        new MiniCssExtractPlugin({filename: '[name]-[contenthash].css'}),

        // new webpack.ProvidePlugin({
        //     Popper: ['popper.js', 'default']  // Used with Bootstrap5
        // }),
    ],
    optimization: {
        splitChunks: {  // 3rd party code into its own bundle for long term caching
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                }
            }
        },
        runtimeChunk: {  // webpack runtime and manifest in its own bundle
            name: 'runtime'
        },
        moduleIds: 'deterministic'
    },
};
