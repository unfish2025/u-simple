---
mode: agent
---

# 项目概述

当前项目是一个 vue2 + ts 的 uniapp 组件库项目.

前端主要技术栈为: ts, vue2, @yishu/event, dayjs

## 文件结构

-   `src/` 源码
    -   `components/` 组件
    -   `utils/` 工具函数
    -   `pages/` 测试页面
    -   `config/` 配置相关
    -   `styles/` 全局样式相关
    -   `App.vue` 根组件
    -   `main.ts` 入口文件
    -   `pages.json` 页面配置(路由配置)

## 编码规范

一律使用 ESModule 规范 . 在遇到 Promise 时尽可能使用 async await

使用包管理器安装包时, 如果可以一律使用 pnpm

在使用 console.log 方法时, 请使用以下格式:

```ts
console.log('variable -> ', variable)
```

在语句结束时, 尽量省略分号结尾

在顶级使用函数时使用 function, 在非顶级使用箭头函数

变量声明尽可能使用 const, 除非变量可变则使用 let

在代码块之间请使用空行分隔, 如类上的方法之间, 函数内各大代码块之间

函数的注释一律使用文档注释

在创建一个模块时, 首先创建一个目录, 其次创建一个 index.ts|js|vue 文件作为入口, 如果有拆分则其他文件也放在该目录中

在编写代码时, 单文件尽量不要超过 600 行, 如果可以则进行拆分
