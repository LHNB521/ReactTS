// webpack公共配置
const path = require('path')//处理文件路径的小工具
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
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
            template: path.join(__dirname, "../template.html"),
            filename: "index.html"
        }),
        new MiniCssExtractPlugin(),
    ],
    stats: {
        modules: false,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)/,
                loader: "babel-loader"
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },

                    "less-loader",
                ],
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },
                    "sass-loader",
                ],
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
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false, //不在生成license
            })
        ]
    }
}