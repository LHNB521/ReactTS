
# 【React+TS】从零开始搭建react+typescript+router+redux+less+px2rem自适应+sass+axios反向代理+别名@+Antd-mobile

> ## Excerpt
> npm i react-router-dom@5.2.src目录下创建routes文件夹，同时创建index.import Home from '..import About from '..import Contact from '.. App.import Navbar fr...

---
## 一、通过create-react-app脚手架创建项目

```
npx create-react-app testproject --template typescript
```
在vscode中打开项目，可以看到顺利生成了react项目且组件的后缀为tsx,此时说明成功创建了react+typescript项目的雏形

![](https://cdn.jsdelivr.net/gh/521129/Jsd@main/xiaochengxu/20220513205616.png)

 在项目根目录下，运行npm run start，成功启动项目

```
npm run start
```

## 二、配置路由

```
npm i react-router-dom@5.2.0 react-router-config @types/react-router-config @types/react-router-dom -S
```

src目录下创建views文件夹，views内创建Home，Contact，About，Navbar四个tsx文件，其中Navbar用来控制路由，其他三个页面用来展示

Home:

```
import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="container">
          <h3 className="center"> Home页面</h3>
          <p>欢迎来到首页</p>
        </div>
      </div>
    );
  }
}
复制代码
```

Contact:

```
import React, { Component } from "react";

export default class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="container">
          <h3 className="center"> Contact页面</h3>
          <p>欢迎来到联系我们页面！</p>
        </div>
      </div>
    );
  }
}
复制代码
```

About:

```
import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="container">
          <h3 className="center"> About页面</h3>
          <p>欢迎来到关于我们页面！</p>
        </div>
      </div>
    );
  }
}
复制代码
```

Navbar:

```
import React, { Component } from "react";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="nav-wrapper">
                <div className="list">
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/about'>About</a></li>
                        <li><a href='/contact'>Contact</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
复制代码
```

![](https://cdn.jsdelivr.net/gh/521129/Jsd@main/xiaochengxu/20220513205748.png)

src目录下创建routes文件夹，同时创建index.ts，使用RouteConfig对路由进行统一管理

```
// 导入路由组件
import Home from '../views/Home'
import About from '../views/About'
import Contact from '../views/Contact'
// 导入路由管理工具
import {RouteConfig} from 'react-router-config'

const routes:RouteConfig = [
  {
    path:'/',
    exact:true,
    component:Home
  },
  {
    path:'/about',
    exact:true,
    component:About
  },
  {
    path:'/contact',
    exact:true,
    component:Contact
  }
]

export default routes;
```

![](https://cdn.jsdelivr.net/gh/521129/Jsd@main/xiaochengxu/20220513205829.png)

 App.tsx中引入Route，Navbar和路由管理工具

```
import React from "react";
// 引入路由导航栏
import Navbar from "./views/Navbar";
// 引入routes组件
import routes from "./routes";
// 引入包管理工具
import { renderRoutes, RouteConfig } from "react-router-config";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />

      {/* 设置routes的类型为RouteConfig[]，否则报错 */}
      {renderRoutes(routes as RouteConfig[])}
    </div>
  );
}

export default App;
```

![](https://cdn.jsdelivr.net/gh/521129/Jsd@main/xiaochengxu/20220513205857.png)

根目录index.tsx中这样定义

```
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
 至此，路由配置就完成了，启动项目如果出现错误，

 运行命令

```
npm i react-router@5.2.0 -s
```

 然后重新运行即可

 有点难看是吧，我们给App添加一点样式

```
* {
  padding: 0;
  margin: 0;
}

h1 {
  text-align: center;
  font-size: 45px;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(6, 0, 32);
  padding: 40px;
}

.list {
  display: flex;
  justify-content: center;
  width: 100%;
}

.list ul li {
  list-style: none;
  margin: 42px;
  text-align: center;
}

a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 14px 25px;
  background-color: transparent;
  border: 2px solid rgb(12, 0, 66);
}

a:hover {
  background-color: rgb(12, 0, 66);
  color: rgb(255, 255, 255);
}
```

## 三、配置less

##  第一种方式：暴露配置的方式

```
npm run eject
```

此时项目多出了config文件夹

安装`less`和`less-loader`

```
npm i less less-loader -S
```

仿照sass修改config目录下的webpack.config.js：

1. 找到config目录下的`webpack.config.js`文件，在50-70行之间有个cssRegex，在此处添加

```
// less
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
```

2\. 在`webpack.config.js`文件500多行有个sassRegex，模仿写对应的lessRegex

```
// less
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'less-loader'
              ),
              sideEffects: true,
            },
            // less
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
                'less-loader'
              ),
            },
```

3.重新启动项目，创建less文件并引入

样式生效，说明less配置成功!
这种方式有个不好的地方，就是会产生很多不必要的js文件，且这个操作不可逆，等到后期项目上传时造成代码冗余，不好维护。

## 第二种方式：找到config.js文件直接修改

1.找到文件路径：node\_modules\\react-scripts\\config\\webpack.config.js

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2381441295b94784b3291e6b6ae60a92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

 2.在60-80行之间有个cssRegex，在此处添加

```
// less
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
```

3\. 在550多行有个sassRegex，模仿写对应的lessRegex

```
// less
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                "less-loader"
              ),
              sideEffects: true,
            },
            // less
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
                "less-loader"
              ),
            },
```

3.重新启动项目，创建less文件并引入


```
.about{
  .container{
    font-size: 22px;
    p{
      color: red;
    }
  }
  }
```

样式生效，说明less配置成功!
## 四、配置sass

通过create-react-app创建的react项目，其实是默认已经配置好sass的，所以我们先尝试在项目中引入sass文件


会发生如下报错：

解决方法：执行下面的命令

```
npm i sass -s
```

 然后重新运行即可，样式生效!

## 五、配置px2rem自适应

## 第一种方式：暴露config

1. 安装lib-flexible、pxtorem，postcss

```
npm i lib-flexible postcss-pxtorem postcss postcss-loader postcss-preset-env postcss-flexbugs-fixes -s
```

2.配置config/webpack.config.js，在config目录下找到webpack.config.js文件，加入

```
const px2rem = require('postcss-pxtorem');

```

3.然后再下面代码中加入下面这行

```
px2rem({
       rootValue: 75,
       propWhiteList: [],
       minPixelValue: 2,
       exclude: /node_modules/i,
       unitPrecision: 5,
       propList: ['*']
}), //设计稿根据750px(iphone6)
```

 也可以使用一下代码覆盖loader

```
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            config: false,
            plugins: !useTailwind
              ? [
                  'postcss-nested',
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3
                    },
                  ],
                  // Adds PostCSS Normalize as the reset css with default options,
                  // so that it honors browserslist config in package.json
                  // which in turn let's users customize the target behavior as per their needs.
                  px2rem({
                    rootValue: 37.5,
                    selectorBlackList  : [], //过滤
                    propList   : ['*'],
                    minPixelValue: 2,
                    exclude: /node_modules/i
                  }), //设计稿根据750px(iphone6)
                'postcss-normalize',
                ]
              : [
                  'tailwindcss',
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  px2rem({
                    rootValue: 37.5,
                    selectorBlackList  : [], //过滤
                    propList   : ['*'],
                    minPixelValue: 2,
                    exclude: /node_modules/i
                    }), //设计稿根据750px(iphone6)
                ],
          },
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
      },
```

4\. src目录下找到index入口文件，在文件上面加入

```
import 'lib-flexible'; 
```
5\. 找到public/index.html文件，加入如下代码：

```
<meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        name="viewport"/>
```
6\. 重新运行项目，一般就可以看到px转rem了。


```
.contact {
  .container {
    font-size: 36px;

    .center {
      color: blue;
    }
    p {
      font-size: 24px;
    }
    button {
      width: 100px;
      height: 45px;
      background: #ccc;
      color: #fff;
    }
  }
}
复制代码
```

##  第二种方式：直接在config文件中修改

1.找到文件路径：node\_modules\\react-scripts\\config\\webpack.config.js

 2.配置webpack.config.js，加入如下代码：

```
const px2rem = require('postcss-pxtorem');
复制代码
```



3\. 然后再下面代码中加入下面这行

```
px2rem({
       rootValue: 75,
       propWhiteList: [],
       minPixelValue: 2,
       exclude: /node_modules/i,
       unitPrecision: 5,
       propList: ['*']
}), //设计稿根据750px(iphone6)
复制代码
```

也可以使用一下代码覆盖loader

```
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            config: false,
            plugins: !useTailwind
              ? [
                  'postcss-nested',
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3
                    },
                  ],
                  // Adds PostCSS Normalize as the reset css with default options,
                  // so that it honors browserslist config in package.json
                  // which in turn let's users customize the target behavior as per their needs.
                  px2rem({
                    rootValue: 37.5,
                    selectorBlackList  : [], //过滤
                    propList   : ['*'],
                    minPixelValue: 2,
                    exclude: /node_modules/i
                  }), //设计稿根据750px(iphone6)
                'postcss-normalize',
                ]
              : [
                  'tailwindcss',
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  px2rem({
                    rootValue: 37.5,
                    selectorBlackList  : [], //过滤
                    propList   : ['*'],
                    minPixelValue: 2,
                    exclude: /node_modules/i
                    }), //设计稿根据750px(iphone6)
                ],
          },
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
      },

```

4\. src目录下找到index入口文件，在文件上面加入

```
import 'lib-flexible'; 

```

5\. 找到public/index.html文件，加入如下代码：

```
<meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        name="viewport"/>

```

 
6\. 重新运行项目，一般就可以看到px转rem了。



存在问题：当设备宽度超过540后，样式就固定在540不再改变了

解决方法：在node-modules => lib-flexible => flexible.js中找到refreshRem修改其中的width值为设计稿宽度即可


## 六、配置axios和反向代理

1. 安装axios 和 http-proxy-middleware（后面反向代理会用到）

```
npm i axios http-proxy-middleware -s
复制代码
```

2\. 在src目录下创建api文件夹，然后创建 index.ts 和 request.ts 文件

```
//index.ts

import {Service} from './request';
//获取汽车列表
export function getCarList(config: { page: string; }){
    const params = new URLSearchParams()
    params.append('page',config.page);

    return Service({
        url:'./api/getCarList',
        data:params
    })
}


//request.ts

import axios from "axios";

declare module 'axios' {
     export interface AxiosResponse<T = any> extends Promise<T> {}
 }

export const Service = axios.create({
  timeout: 3000, //延迟时间
  method: "POST",
  headers: {
    "pc-token": "4a82b23dbbf3b23fd8aa291076e660ec",
    "content-Type": "application/x-www-form-urlencoded",
  },
});

//请求拦截
Service.interceptors.request.use((config) => config);

//响应拦截
Service.interceptors.response.use(
  (response) => response.data,
  (err) => console.log(err)
);
复制代码
```

3. 配置代理，可以访问到后台的服务器地址

在src文件夹中创建**setupProxy.js**内容配置如下

```
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ 
    target: 'http://www.ibugthree.com/oldcar/',//后台服务器地址
    changeOrigin: true,
    pathRewrite: {
    '^/api': '',
    },}))
};
复制代码
```

在新版本中已经默认设置代理的文件夹名为**setupProxy.js**

到这里所有配置就基本完成，在组件中调用即可

```
import React, { Component } from "react";
import "./contact.scss";
//导入要使用的接口
import { getCarList } from "../api/index";

export default class Contact extends Component {
  // 定义方法
  getList() {
    getCarList({ page: "1" }).then((res) => console.log(res));
  }
  render() {
    return (
      <div className="contact">
        <div className="container">
          <h3 className="center"> Contact页面</h3>
          <p>欢迎来到联系我们页面！</p>
          {/* 点击事件调用 */}
          <button onClick={this.getList}>获取数据</button>
        </div>
      </div>
    );
  }
}
```

##  七、配置redux

1\. 安装redux

```
npm i redux react-redux -s
复制代码
```

2.在src路径下创建store文件夹，文件假中创建两个文件action.ts和index.ts两个文件

action中定义type，然后返回设置状态的type和函数

```
export const SET_AGE = "set_age";
export const SET_NAME = "set_name";

export const setAge = function (n: number) {
  return {
    type: SET_AGE,
    n: n,
  };
};
export const setName = function (name: string) {
  return {
    type: SET_NAME,
    name: name,
  };
};
复制代码
```

index文件中取出redux中的createStore，以及action中的type，最后需要将createStore返回出去，并且需要传递一个函数，定义这个函数时有两个参数，一个是状态，一个是action，使用switch判断action中的type，当所有条件都不成立时，将所有的状态返回，有条件成立时，就通过扩展运算符将state展开，并且对age进行操作（...state）；

```
import { createStore } from "redux";
import { SET_AGE, SET_NAME } from "./action";

interface User {
  name: string;
  age: number;
}

const common: User = {
  name: "张三123",
  age: 18,
};

function user(state = common, action: any) {
  switch (action.type) {
    case SET_AGE:
      return {
        ...state,
        age: state.age + action.n,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
}

export default createStore(user);
复制代码
```

3\. 在主入口文件index.tsx中进行redux的连接和store的引用

```
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// 引入路由组件
import { BrowserRouter as Router } from "react-router-dom";
// 引入移动端自适应
import "lib-flexible";
//引入rootReducer组件
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    {/* provider组件将所有的组件包裹起来，用绑定属性的形式绑定store到组件中 */}
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
复制代码
```

4\. 在App中进行配置

```
import React from "react";
// 引入路由导航栏
import Navbar from "./views/Navbar";
// 引入routes组件
import routes from "./routes";
// 引入包管理工具
import { renderRoutes, RouteConfig } from "react-router-config";
import "./App.css";
// 引入connect连接组件
import {connect} from "react-redux"


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* 设置routes的类型为RouteConfig[]，否则报错 */}
      {renderRoutes(routes as RouteConfig[])}
    </div>
  );
}

//进行连接
export default connect((props,state)=>Object.assign({},props,state),{})(App);
复制代码
```

5.组件中使用redux

    1. 引入connect和action中的方法

    2. 定义props和state类型

    3. 修改render中的html结构，定义属性和方法调用

    4. connect连接属性并导出

```
import React, { Component } from "react";
import "./about.less";
// redux
import { connect } from "react-redux";
import { setName, setAge } from "../store/action";

interface Props {
  setAge: Function;
  setName: Function;
  age: number;
  name: string;
}

interface State {}

class About extends Component<Props,State> {
  refs:any = React.createRef()
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props:Props){
    super(props)
  }
  changeAge(){
    this.props.setAge(1);
    console.log(this.props);
  }
  changeName(){
    let name:number = this.refs.value
    this.props.setName(name)
    console.log(this.refs);
    this.refs.value = ''
  }
  render() {
    return (
      <div className="about">
        <div className="container">
          <h3 className="center"> About页面</h3>
          <p>欢迎来到关于我们页面！</p>
        </div>
        <div>
          <p>名字是：{this.props.name}</p>
          <input ref={(input: HTMLInputElement) => this.refs = input}  type="text" /> 
          <button onClick={this.changeName.bind(this)}>修改姓名</button>
          <p>年龄是：{this.props.age}</p> 
          <button onClick={this.changeAge.bind(this)}>修改年龄</button>
        </div>
      </div>
    );
  }
}

export default connect((props,state)=>Object.assign({},props,state),{
  setAge,setName
})(About);
复制代码
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dfa7d5ea3c342b5935915bdbb98f8ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 八、配置别名@

## **一、暴露方法**

**1.打开 config 文件夹下的 webpack.config.js 文件**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3277e1a09b848a2a1c553be7d775f73~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

**2.搜索 alias**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f079621a23c45bab6724e222641c468~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

**3.参照如下格式，设置路径别名**

```
alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
        // 文件路径别名
        '@': path.resolve(__dirname, '../src'),
        '@view': path.resolve(__dirname, '../src/view'),
      },
复制代码
```

## **二、直接在config文件中修改**

**1.找到文件路径：node\_modules\\react-scripts\\config\\webpack.config.js**

**其他步骤同上！！**

需要**特别注意**的是： webpack配置进行改动后，都需要**重新启动项目**，不然不生效

## 九、配置antd-mobile

1.在项目中安装antd-mobile 使用

```
npm install antd-mobile
//或
yarn add antd-mobile
复制代码
```

2.在项目中Home.tsx文件中导入要使用的组件

```
import React, { Component } from "react";
//使用组件直接在组件中进行使用即可
import { Button } from 'antd-mobile';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="container">
          <h3 className="center"> Home页面</h3>
          <p>欢迎来到首页</p>
          <Button color='primary'>按钮</Button>
        </div>
      </div>
    );
  }
}
复制代码
```

完成之后，你就能在react项目使用antd-mobile的样式文件进行构建自己的页面了

至此，react项目创建和配置完成
