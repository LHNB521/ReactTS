// webpack打包配置
const { merge } = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
    mode: "production"
})