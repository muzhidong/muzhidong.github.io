本篇介绍两个规范，一个是commit规范，另一个是tag规范。

## commit规范
- 提交格式：type(scope): message
- 参数说明

  type：代码提交类型，不同类型表示不同的代码改动，比如：
  - feat：新功能开发
  - fix：bug修复
  - docs：文档改动
  - style：格式改动，包括空格、缩进、分号等
  - refactor：代码重构
  - perf：性能优化
  - test：增加或修改测试用例
  - revert：撤销上次commit
  - chore：对构建过程或辅助工具和库的更改，如生成文档

  scope：影响范围

  message：变更简短说明

> 前期可考虑使用[commitizen](https://www.npmjs.com/package/commitizen)工具，便捷生成commit规范格式

## tag规范
- 采用semver项目版本规范
- 版本格式：主版本号.次版本号.修订号
- 版本号递增规则
  - 主版本号：当你做了不兼容的API修改
  - 次版本号：当你做了向下兼容的功能性新增
  - 修订号：当你做了向下兼容的问题修正
  > 先行版本号及版本编译元数据可以加到"主版本号.次版本号.修订号"的后面，作为延伸


