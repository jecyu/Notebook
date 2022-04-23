const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
    publicPath: '/',
    configureWebpack: {
        
        devServer: {
            port: 8000
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'mainApp',
                filename: 'remoteEntry.js',
                remotes: {
                    child1: `child1@http://localhost:8088/remoteEntry.js` 
                }
            })
        ],
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js'
            },
            fallback: {
                path: require.resolve('path-browserify'),
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                vm: require.resolve('vm-browserify'),
                fs: false
            }
        }
    }
}