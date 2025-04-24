// filepath: src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/logos',
    createProxyMiddleware({
      target: 'https://cryptologos.cc',
      changeOrigin: true,
      pathRewrite: {
        '^/logos': '/logos',
      },
    })
  );
};