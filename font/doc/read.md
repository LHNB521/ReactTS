# 初始化
`npm init -y`
# 安装webpack
`npm i webpack webpack-cli -D`
# 新建一些文件

- config 文件夹存放 webpack 配置文件
  - webpack.common.js，用于 webpack 公共配置
  - webpack.prod.js，用于 webpack 打包配置
  - webpack.dev.js，用于 webpack 开发环境配置
- src 文件夹存放 js、react 文件
  - index.js
# 初期webpack配置
先配置webpack.common.js
  ```webpack.common.js
    // webpack公共配置
    const path = require('path')//处理文件路径的小工具
    module.exports = {
    entry: {// 核心入口
        index : path.join(__dirname, "../src/index.js")
    },
    output: {// 核心出口
        filename: "[name].[hash: 4].js",
        path: path.join(__dirname, "../dist")
    }
    }
   ```
后配置webpack.prod.js
```
// webpack打包配置
const { merge } = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
    mode: "development"
})
```
因为在 webpack.prod.js 使用 webpack-merge，所以咱们需要安装一下 webpack-merge 依赖包。
安装 webpack-merge
`npm i webpack-merge -D`
简单吧，很简单的；
- entry 核心入口，
- output 核心出口；这两个是 webpack 的入口与出口；路径可以使用 node 中 path 模块
- mode 定义 webpack 的模式，可以是 production development
# webpack用于打包
## 先安装一个依赖cross-env
安装cross-env
`npm i cross-env -D`
## 执行webpack.prod.js
找到 package.json 文件，找到 scripts 添加 build
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js"
  },
```
build：这句代码的意思是，设置环境变量为 production 使用 webpack 并让 webpack 按照配置文件 config 文件夹中 webpack.prod.js 配置运行。
## 第一次执行webpack
根目录执行
`npm run build`
webpack 已经运行并将 src/index.js 的 js 打包到 dist 文件夹下
# webpack 用于开发
## 需要的依赖包

- webpack-dev-server用于启动webpack服务（热更新）
- html-webpack-plugin用于将JavaScript文件打包在一起
`npm i html-webpack-plugin webpack-dev-server -D`
## 修改webpack.common.js

- 引入html-webpack-plugin
- 配置html-webpack-plugin需要的文件地址和文件名，具体代码如下：
```
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: {
    // doing
  },
  output: {
    // doing
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../tempate.html"),
      filename: "index.html",
    }),
  ],
}
```
因为在 webpack.common.js 文件中使用了 tempate.html，所以需要在根目录新建 tempate.html 文件；文件内容如下:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
## 修改webpack.dev.js

- 引入 webpack 公共配置，webpack.common.js
- 定义环境 mode 为 development（开发环境）
- 定义 devServer 启动 webpack 服务的地址、端口
```
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
module.exports = merge(common, {
  mode: "development",
  devServer: {
    host: "localhost",
    port: "8888",
  },
})
```
## 修改package.json文件中的script,新增start命令
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js",
    "start": "cross-env NODE_ENV=development webpack-dev-server --config ./config/webpack.dev.js"
  },
```
start 代码的意思是：设置环境变量为 development 使用 webpack-dev-server 并让 webpack-dev-server 按照配置文件 config 文件夹中 webpack.dev.js 配置运行。
## 修改src/index.js
```
console.log("webpack")
const root = document.getElementById("root")
root.textContent = "webpack2"
```
## 启动
`npm start`

# 支持React
## 安装React
`npm i react react-dom -S`
## 修改src/index.js
```
import React from "react"
import ReactDOM from "react-dom"
export default function App() {
  return (
    <div>
      <h2>我是react</h2>
    </div>
  )
}

const root = document.getElementById("root")
ReactDOM.render(<App />, root)
```
此时运行肯定报错，因为webpack并不认识React，需要将React转换为普通的可运行的Javascript，需要安装Babel
## 安装Babel
`npm i babel-loder @babel/core @babel/preset-react -D`
- @babel/core : 是 Babel 的核心库，所有的核心 Api 都在这个库里，这些 Api 供 babel-loader 调用 1
- babel-loader : @babel/core 在做 es6 的语法转换和弥补缺失的功能，但是在使用 webpack 打包 js 时，webpack 并不知道应该怎么去调用这些规则去编译 js。这时就需要 babel-loader 了，它作为一个中间桥梁，通过调用 babel/core 中的 api 来告诉 webpack 要如何处理 js1。
- @babel/preset-react:预设了一些 Babel 插件，主要负责编译 React 语法2
## 修改webpack.common.js
```
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: {
    // other
  },
  output: {
    // other
  },
  plugins: [
    // other
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        loader: "babel-loader",
      },
    ],
  },
}
```
## 新建.babelrc
根目录添加.babelrc文件，添加代码
```
{
  "presets": ["@babel/preset-react"]
}
```
这个文件的作用是告知 webpack 在使用 Babel 解析 react 文件时，使用@babel/preset-react 这个预设
## 运行
`npm start`
# 支持TypeScript
TypeScript是趋势，因此我们安装TypeScript
## 安装@babel/preset-typescript
@babel/preset-typescript : 预设了一些 Babel 插件，主要负责编译 Typescript 语法
`npm i @babel/preset-typescript -D`
## 修改.babel文件
```
{
  "presets": ["@babel/preset-react", "@babel/preset-typescript"]
}
```
## 修改webpack.common.js
```
// other
module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        loader: "babel-loader",
      },
    ],
  },
```
## 修改src/index.js
```
import React from "react"
import ReactDOM from "react-dom"
import Home from "./Home.tsx"
export default function App() {
  return (
    <div>
      <h2>我是react</h2>
      <Home />
    </div>
  )
}

const root = document.getElementById("root")
ReactDOM.render(<App />, root)
```
因为 index.js 引入了 Home 组件，所以需要新建 Home.tsx 文件
# 支持CSS
## 安装依赖包
`npm i style-loader css-loader -D`
- css-loader:js 中导入了 css，那么就需要使用 css-loader 来识别这个模块，通过特定的语法规则进行转换内容最后导出。3
- style-loader: 是通过一个 JS 脚本创建一个 style 标签，里面包含一些样式。style-loader 是不能单独使用的，应为它并不负责解析 css 之前的依赖关系，每个 loader 的功能都是单一的，各自拆分独立
## 修改webpack.common.js
```
 module: {
    rules: [
      {
        // other
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
```
## 修改src/Home.jsx
```
import React from "react"

import "./Home.css"
type Props = {}

export default function Home({}: Props) {
  return <div className="box">我是typescript</div>
}
```
因为 src/Home.jsx 引入了 Home.css，所以在根目录新建 Home.css 文件
## 新建Home.css
```
.box{
  color: red;
}
```
# 支持less、sass
## 安装依赖
`npm i less less-loader sass sass-loader -D`
## 修改webpack.common.js
```
 module: {
    rules: [
      {
        // other
      },
      {
       // other
      },
      {
        test: /\.(less)$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
```
## 修改src/Home.tsx
```
import React from "react"

import "./Home.css"
import "./style.less"
import "./style.scss"
type Props = {}

export default function Home({}: Props) {
  return <div className="box">我是typescript</div>
}
```
在 src/Home.tsx 引入 style.less、style.scss 文件，所以需要新建这两个文件并编辑如下代码
## 新建style.less和style.scss
```
.box {
  background: blue;
}
```
```
.box {
  border: 1px solid green;
}
```
# PostCSS
PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具
## 安装依赖包
`npm i postcss-loader autoprefixer -D`
## 修改webpack.common.js
```
 module: {
    rules: [
      {
        // other
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
        // other
      },

    ],
  },
```
## 新增postcss.config.js
postcss 生效需要使用一些配置，postcss-loader 会默认使用根目录下 postcss.config.js 文件
根目录新建 postcss.config.js 并编写如下代码
```
module.exports = {
  plugins: [require("autoprefixer")],
}
```
## 修改src/Home.css
```
.box {
  display: flex;
  color: red;
  justify-content: center;
}
```
## 修改package.json
```
  "dependencies": {
   // other
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "ie >= 9",
    "not op_mini all"
  ]
```
## 注意
postcss需要在css-loader之前，less-loader或者scss-loader之前之后使用，所以修改webpack.common.js如下修改，可支持less和sass预编译文件支持自动添加浏览器前缀
```
 module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        loader: "babel-loader",
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
        test: /\.(less)$/,
        use: [
          "style-loader",
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
          "style-loader",
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
    ],
  },
```
# 支持文件与字体引入
在开发过程中需要使用一些图片后者自定义字体，有的需求是直接引用静态服务器，有的是直接打包在工程中。所以需要对引入的图片后者字体做一些处理
## 安装依赖
`npm i url-loader file-loader -D`
## 修改webpack.common.js
```
module: {
    rules: [
      {
        // other
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
```
可以在study-webpack工程中使用后缀为.bmp、.gif、.png、.jpeg等格式的图片的
已经可以使用 React、Typescript、css、less、scss、图片和字体。已经勉强可以用来开发前端页面了。



