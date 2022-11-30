---
title: 工具篇——使用Hexo在Github快速建站
tags: 
- hexo
---
# 使用Hexo在Github快速建站

本篇带你学习如何使用hexo快速在github上部署个人网站。

### 一、在github上创建自己的博客网站
1.创建新仓库

2.配置网站地址：[你的github账号名称].github.io

3.选定网站主题

4.访问https://[你的github账号名称].github.io，是否建站成功

### 二、在本地上安装node、git、hexo，运行hexo博客网站
#### 安装
1.安装node、git

2.查看node、git是否安装成功

```
npm -v
git --version
```

3.下载安装hexo

```
npm install -g hexo-cli
```

4.查看hexo是否安装成功

```
hexo -v
```

#### 建站
5.初始化hexo博客网站项目

```
hexo init [博客项目名称，若不指定默认当前文件夹]
```

6.安装依赖

```
npm install
```

7.打包网站代码

```
hexo g
```

8.预览网站

```
hexo s
```

### 三、上传hexo博客网站源码到github
1.在博客项目文件夹下初始化仓库

```
git init
```

2.新建并切换到dev分支

```
git checkout -b dev
```

> 注：由于Github仓库master分支用来存放打包好的网站代码，故在本地不用master分支开发，而在dev分支。简而言之，本地master分支可以忽略，直接在dev分支开发

3.添加基于hexo的Git多仓库发布的依赖

```
npm install hexo-deployer-git --save
```

4.修改_config.yml网站配置

```yml
deploy: 
 type: git
 repository: https://github.com/muzhidong/muzhidong.github.io.git
 branch: master
```

这段代码表示将打包代码发布到Github仓库master分支。

5.在dev分支提交源代码

```
git add .
git commit -m ""
```

6.添加远程仓库，并推送源代码到远程dev分支

```
git remote add origin https://github.com/muzhidong/muzhidong.github.io.git
git push origin dev
```

7.发布打包代码到远程master分支

```
hexo d
```

### 四、写博客
1.新增一篇文章

```
hexo new post 文章标题
```

当然，你也可以手动新增名为文章标题的md文件

2.构建网站，并本地预览调试文章

```
hexo g 
hexo s
```

3.当博客文章完成，即可一键发布

```
hexo d
```

4.记得最后将网站源码也提交

```
git add
git commit
git push
```

如果想在其他机器写博客，需要在本地先安装好Git、Node和hexo-cli。然后复制仓库，并切换到dev分支，即

```
git clone -b dev https://github.com/muzhidong/muzhidong.github.io.git
```

再安装项目依赖，就可以按上面步骤写博客了。

至此，前期建站、后期更博的流程就全部介绍完毕了。
