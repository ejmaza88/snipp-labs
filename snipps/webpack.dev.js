const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


module.exports = merge(common, {
    devServer: {
        // compress: true,
        // allowedHosts: ['*'],
        // publicPath: 'http://localhost:7654/assets/bundles/',
        // host: '0.0.0.0',
        port: 7654,
        headers: { "Access-Control-Allow-Origin": "*" },
        writeToDisk: (filePath) => /\.json$/.test(filePath),  // save a copy of the manifest JSON file to disk
    },
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'build/dev_bundles/'),
        publicPath: 'http://localhost:7654/assets/bundles/'
    },
    plugins: [
        // let Django know where bundles are
        // save the file one directory above from 'output.path'
        new WebpackManifestPlugin({fileName:'../manifest.dev.json'}),

        // delete all files in 'build/dev_bundles/' dir automatically
        new CleanWebpackPlugin(),
    ],
});


/*
*
* Uncomment bellow to run local dev bundles, don't forget to comment above code
* */
// module.exports = merge(common, {
//     devtool: 'cheap-module-source-map',
//     output: {
//         filename: "[name]-[chunkhash].js",
//         path: path.resolve(__dirname, 'build/dev_bundles/'),
//     },
//     plugins: [
//         // let Django know where bundles are
//         // save the file one directory above from 'output.path'
//         new WebpackManifestPlugin({fileName:'../manifest.dev.json', publicPath:'/dev_bundles/'}),
//
//         // delete all files in 'build/dev_bundles/' dir automatically
//         new CleanWebpackPlugin(),
//     ],
// });