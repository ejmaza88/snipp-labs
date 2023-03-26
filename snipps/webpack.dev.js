const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


// starts the webpack dev server
const devServerConfig = {
    devServer: {
        // compress: true,
        allowedHosts: ['*'],
        // publicPath: 'http://localhost:7654/assets/bundles/',
        host: '0.0.0.0',
        port: 7654,
        headers: { "Access-Control-Allow-Origin": "*" },
        writeToDisk: (filePath) => /\.json$/.test(filePath),  // save a copy of the manifest JSON file to disk, needed for webpack dev server
    },
    output: {
        path: path.resolve(__dirname, 'build/dev_bundles/'),
        publicPath: 'http://localhost:7654/assets/bundles/'
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        // let Django know where bundles are
        // save the file one directory above from 'output.path'
        new WebpackManifestPlugin({fileName:'../manifest.dev.json'}),

        // delete all files in 'build/dev_bundles/' dir automatically
        new CleanWebpackPlugin(),
    ],
}


// creates the local dev build files
const devBuildConfig = {
    output: {
        filename: "[name]-[chunkhash].js",
        path: path.resolve(__dirname, 'build/dev_bundles/'),
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        // let Django know where bundles are
        // save the file one directory above from 'output.path'
        new WebpackManifestPlugin({fileName:'../manifest.dev.json', publicPath:'/dev_bundles/'}),

        // delete all files in 'build/dev_bundles/' dir automatically
        new CleanWebpackPlugin(),
    ],
}


module.exports = (env, args) => {
    if(env.startDevServer) {
        return merge(common, devServerConfig)
    } else {
        return merge(common, devBuildConfig)
    }
}




// console.log('args:', process.argv)
// process.argv[process.argv.length - 1]
// module.exports = (env, args) => {
//     console.log(env)
//     console.log(args)
//     switch (args.mode) {
//         case 'development':
//             return merge(common, {...});
//         default:
//             throw new Error('No matching configuration was found!');
//     }
// }