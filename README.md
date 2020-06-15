# myzone

> A Vue.js project

## 6.16 更新

1. 修改了 header 组件中的图标显示，隐藏了邮件图标
2. 修改了 header 组件中的浮窗显示
3. 隐藏了 sidebar 组件中未完成的功能相关的入口
4. 为 dynamics 组件添加了分页功能
5. 修改了 login 组件中更改 store 内信息的顺序，并调整了提示信息
6. 新增了 message 组件，可以显示消息预览，但仍不能显示消息正文（故意的）
7. 下一步计划更新：
   1. 查看一条 message 的详细信息（messageView 组件）
   2. message 组件中显示变更的时候，应该同时去除 checkboxs 的选择

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
