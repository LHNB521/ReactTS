// webpack打包配置
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")//清楚上一次打包文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")//压缩css
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin  //打包文件大小

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
        new CssMinimizerWebpackPlugin(),
        new BundleAnalyzerPlugin(),
    ],
})