// webpack公共配置
const path = require('path')//处理文件路径的小工具
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: {// 核心入口
        index : path.join(__dirname, "../src/index.js")
    },
    output: {// 核心出口
        filename: "[name].[hash:4].js",
        path: path.join(__dirname, "../dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../tempate.html"),
            filename: "index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)/,
                loader: "babel-loader"
            },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },
                ],
            },
            {
                test: /\.(less)/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(bmp|gif|png|jpe?g)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10 * 1024,
                            name: "[name].[contenthash:8].[ext]",
                            outputPath: "assets/images",
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[contenthash:8].[ext]",
                            outputPath: "assets/fonts",
                        },
                    },
                ],
            },
        ],
    },
}