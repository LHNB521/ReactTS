const {
    createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: 'http://127.0.0.1:3000', //后台服务器地址
        changeOrigin: true, //控制服务器收到的请求头中Host的值
        pathRewrite: {
            '^/api': '', //重写请求路径，下面有示例解释
        },
    }))
};