// webpack开发环境配置
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
module.exports = merge(common, {
    mode: "development",
    devServer: {
        host: "localhost",
        port: "8888"
    }
})