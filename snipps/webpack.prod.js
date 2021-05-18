const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');



module.exports = merge(common, {
    plugins: [
        // let Django know where bundles are
        // save the file one directory above from 'output.path'
        // prefix the manifet file item values the same as the the 'output.path' dir
        new WebpackManifestPlugin({fileName:'../manifest.prod.json', publicPath:'/bundles/'}),

        // delete all files in 'build/bundles/' dir automatically
        new CleanWebpackPlugin(),

        // make sure React strips out debug junk
        // Note: NODE_ENV=production in sh env doesn't trigger this
        // see https://github.com/webpack/webpack/issues/2537
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 5,
                    output: {
                        comments: false
                    },
                    compress: {
                        dead_code: true,
                        drop_console: true
                    }
                },
                extractComments: false,
            })
        ],
    },
});