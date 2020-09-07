# 水滴记账
一款基于Vue3技术栈开发的简洁风格本地记账WebApp

![预览地址](https://raw.githubusercontent.com/rust404/waterdrop-vue3/master/src/assets/qrcode.png)

## 技术栈
- Vue3
- Vuex4.0
- VueRouter4.0
- TypeScript
- Vite
- Sass

## 功能
- 账目记录添加（包括数目，收入/支出，分类，日期）
- 账目记录编辑
- 账目记录删除
- 账目单月明细
- 账目年月趋势图表及分类占比
- 分类添加
- 分类编辑
- 分类删除

## 项目使用
### 开发
```
yarn dev 
```
### 构建
```
yarn build
```
### 部署
需要自行修改文件中自己的部署地址，以及package.json中vite的public path
```
sh ./deploy.sh
```
