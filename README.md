# 大猿猴的前端世界

## 目录说明
```
src                    文章MD
- public               公共资源，主要存放文章资源
- index.md             网站主页
README.md              README
package.json           包配置
.vitepress
- components           自定义组件
- theme                主题开发或初始化
- utils                工具函数
- config.mjs           网站配置
- data.mjs             配置数据
.gitignore             .git忽略文件配置
.github                部署配置
patches                修改默认主题产生的差异文件（自动生成）
npm-shrinkwrap.json    可以视为npm锁文件（自动生成）
pnpm-lock.yaml         pnpm锁文件（自动生成）
```

## 注意事项
- 文章标题带(、)、!等符号会导致加载文章有问题

## TODO
- []是否考虑给系列文章使用专门的技术文档风格
- []移动端主页布局重构
- []示例代码支持在网站中展示和效果预览（示例不跳转仓库，代码放codepen，通过调用codepen库和api实现展示）
- []代码跳转codepen问题修复
- []changelog格式优化或支持自定义
