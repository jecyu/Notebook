const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
    publicPath: 'http://localhost:8088/',
    devServer: {
        port: 8088
    },
    configureWebpack: {
        plugins: [
            new ModuleFederationPlugin({
                name: 'child1',
                filename: 'remoteEntry.js',
                remotes: {
                    mainApp: `mainApp@http://localhost:8000/remoteEntry.js` 
                },
                exposes: {
                    './Hello': './src/components/HelloWorld.vue'
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