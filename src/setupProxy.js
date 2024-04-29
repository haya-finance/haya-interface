const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  // console.log('111111111111111111111')
  app.use(
    createProxyMiddleware("/apis", {
      target: 'http://172.104.84.97:8081',
      "secure": false,
      changeOrigin: true,
      pathRewrite: {
        "^/apis": ""
      }
    })
  )
}