// webpack打包配置
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
module.exports = merge(common, {
    mode: "production",
    plugins: [new CleanWebpackPlugin(),new CssMinimizerWebpackPlugin()],
})