# Changelog

## [2.2.1](///compare/2.2.0...2.2.1) (2025-12-02)

# blog

## 2.2.1

### Patch Changes

- feat:代码预览支持跳转 codepen
- feat:调整菜单入口
- chore:依赖升级
- chore:引入 release-it，使提交、打 tag、push 完全自动化，并支持自动发布 GitHub Release

## 2.1.0

### Minor Changes

- fix:侧边栏支持展示三级标题&修复警告
- fix:本地访问不计入埋点
- chore:依赖更新
- chore:添加机器人脚本，自动更新依赖到最新
- feat:添加 codepen 入口

## 2.0.1

### Patch Changes

- fix:编译时报 window 未定义

## 2.0.0

### Major Changes

- [✅]升级为 vitepress，检查配置更新、页面跳转、资源路径、插件集成
- [✅]主题变更处重新开发，如 PC 支持悬浮展示公众号、小程序图标，而移动端是直接打开图片；标题支持~~语法；标题以\_开头不展示
- [✅]md 中使用的表格需对主题做兼容，比如主页、CSS3 动画等地方
- [✅]实现网站主题自动跟随系统或用户代理主题
- [✅]切换部署方式，从本地切换到线上，修改 deploy.yml
- [✅]为了使仓库比较干净，同时保持之前的提交记录：先删除 main 分支，再将 dev 重命名为 main
- [✅]README 更新
- [✅]项目增加 changelog 日志
