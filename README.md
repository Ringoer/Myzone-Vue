# myzone

> A Vue.js project

## 6.17 更新

1. 在 message 页面新增了按类型、发件人、已读/未读查询消息的功能
2. 修改了动态页面的布局，并使得动态支持多行输入
3. 新增了用户的个人信息页面
4. 

## 6.16 更新 2

1. 修改了文件组织方式，将不同部分的组件放入不同文件夹进行管理
2. 点击消息按键时，会再发送一次GET请求以确保消息时效性
3. 在侧边栏上增加了消息列表的入口
4. 新增了 messageAdd 组件和 messageView 组件，现在可以发送消息和查看消息了
5. 暂未实装好友系统，所以发送消息页面的选择列表，实际上是写定的

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
