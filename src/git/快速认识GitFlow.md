本篇从零到一带你使用gitflow管理项目分支。

## 安装
安装操作[点这](https://github.com/nvie/gitflow/wiki/Installation)

## 检查是否安装成功
终端输入`git flow`，若成功会出现如下信息，
```bash
usage: git flow <subcommand>

Available subcommands are:
  init      Initialize a new git repo with support for the branching model.
  feature   Manage your feature branches.
  release   Manage your release branches.
  hotfix    Manage your hotfix branches.
  support   Manage your support branches.
  version   Shows version information.

Try 'git flow <subcommand> help' for details.
```

## 开发前准备
### 1、配置全局git环境
```bash
# name一般作为当前打包发布和部署的用户,不单独设置给开发人员使用
git config --global user.name "中文拼音名称,不需要起其他名称"   		
git config --global user.email "邮件" 

# window下设置不自动转换为CRLF换行,这样避免在window上进行开发时候将CRLF的换行带到linux服务器上
git config --global core.autocrlf false

# 拒绝提交时包含混合换行符号的文件,这样在提交到git服务器上的时候就可以知道有没有文件存在不同的换行符号
git config --global core.safecrlf true

# 提交时区分文件大小写，git默认不区分
git config --global core.ignorecase false 
```

### 2、初始化git flow
```bash
git checkout main && git pull && git checkout dev && git pull
git flow init -d
```

## 各阶段分支管理流程
### 1、开发阶段

从dev分支创建feature分支，feature分支只用于功能开发，最终合并到dev分支

- 基于dev分支创建功能分支
```bash
git flow feature start <分支名>
```

- 将功能分支发布到远程
```bash
git flow feature publish <分支名>
```

- 将功能分支合并到dev
```bash
git checkout main && git pull && git checkout dev && git pull
# 合并成功后默认会删除功能分支，若添加了k选项则不删除功能分支
git flow feature finish [-k] <分支名>       
git push	
```

- 查看功能某个子命令说明
```bash
git flow feature command --help
```

### 2、发布阶段

从dev分支创建release分支，release分支只用于修复功能bug，最终合并到main分支和dev分支。创建了release分支，说明已经定版，不能再开发新功能，要开发新功能只能在下一版迭代

- 基于dev分支创建发布分支
```bash
git flow release start <分支名>
```

- 发布分支提交到远程
```bash
git flow release publish <分支名>
```

- 发布分支合并到dev和main分支，并打上tag
```bash
git flow release finish [-k] <分支名>
```

### 3、线上热修复阶段

从main分支创建hotfix分支，hotfix分支只用于修复线上紧急问题，最终合并到main分支和dev分支

- 基于main分支创建修复分支
```bash
git flow hotfix start <分支名>
```

- 修复分支提交到远程
```bash
git flow hotfix publish <分支名>
```

- 修复分支合并到dev和main分支
```bash
git flow hotfix finish [-k] <分支名>
```
