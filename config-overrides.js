const webpack = require('webpack')
const WorkBoxPlugin = require('workbox-webpack-plugin')
const path = require('path')
const timeStamp = new Date().getTime()

module.exports = function override (config) {
  config.resolve.fallback = {
    process: require.resolve('process/browser'),
    // zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer'),
    asset: require.resolve('assert')
  }



  // https://stackoverflow.com/questions/69135310/workaround-for-cache-size-limit-in-create-react-app-pwa-service-worker
  config.plugins.forEach((plugin) => {
    if (plugin instanceof WorkBoxPlugin.InjectManifest) {
      plugin.config.maximumFileSizeToCacheInBytes = 50 * 1024 * 1024
    }
  })




  // console.log('timeStamp', timeStamp)

  config.plugins = [
    ...config.plugins,

    new webpack.ProvidePlugin({
      output: {
        filename: 'bundle.js',
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
      },
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer']
    })
  ]

  return config
}
