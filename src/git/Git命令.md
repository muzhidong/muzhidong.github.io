本篇会对git常用命令作下分类分别介绍。

## 创建仓库
- 克隆仓库
```bash
# option说明:
# -l：从本地仓库复制
# -s：设置为共享仓库

# repo表示仓库地址，可以是本地地址，也可以是远程地址。
# 为本地时，可取值
# /path/to/repo.git/
# file:///path/to/repo.git/
# 为远程时，可取值
# ssh://[user@]host.xz[:port]/path/to/repo.git/
# git://host.xz[:port]/path/to/repo.git/
# http[s]://host.xz[:port]/path/to/repo.git/
# ftp[s]://host.xz[:port]/path/to/repo.git/

# dir表示存放路径
git clone [option] {repo} [dir]

# (待验证)克隆所有子模块
git clone --recursive {repo}
git submodule update --init --recursive
```

- 新建仓库
```bash
# 当前空目录下创建仓库，会有一个.git文件夹，带bare选项则表示为共享仓库
git init [--bare]
```

## 本地操作
- 添加文件到暂存区
```bash
# option说明:
# -u/--update：添加修改、删除状态的文件到暂存区，不包括新建文件
# –A/--all/–no-ignore-removal：添加所有文件
git add [option] <path/file>+

# 暂存文件的一部分内容：
git add --patch <path/file>
git add -p <path/file>
# 之后进入交互式，选择e选项，对每行是否暂存进行操作，不暂存的行删除即可

# 常用下面方式添加所有文件到暂存区 
git add .
```

- 从工作区中删除文件变更
```bash
git rm [options] <path/file>+
```

- 修改文件名
```bash
# 文件首字母大写变小写
git mv --force A.txt a.txt
```

- 提交仓库
```bash
# option说明：
# -m：对提交内容备注信息
# -a：对提交内容备注信息并显示提交后的详情
# --amend：提交后修改提交内容
git commit {option}

# 只对指定文件提交：
git commit -m 提交信息 <path/file>+

# 修改最近一次提交信息：
# 交互式
git commit --amend
# 命令式
git commit --amend -m "修改的提交信息"
git commit --amend --author "author <email>" # 修改最近一次提交的作者和邮箱
# ！！！一般来说, 要避免强推。最好是创建一个新的提交再推送，而不是强推一个已推送的修正提交。后者会使涉及到该分支的其他开发者在源历史中产生冲突

# 修改某次提交信息：
# 基于当前分支创建临时变基分支，回到最近第N次提交
git rebase -i HEAD~N
# 修改内容，保存退出
git commit --amend
# 恢复当前分支
git rebase --continue
```

- 查看当前工作状态
```bash
git status
```

- 标签操作
```bash
git tag [options] <tagName> [head/branch/commitid]

# [强制]为当前提交新增tag：
git tag [-f] <tagName>

# 删除tag：
git tag -d <tagName>

# 查询所有tag：
git tag [-l]

# 搜索tag：
git tag -l "tagName正则"

# 修改tag：
git tag <oldTagName> <newTagName>
```

- 撤销提交，产生新提交
```bash
# 撤销最近一次提交
git revert HEAD
# 撤销某次提交，也可以是某次tag
git revert <commitId/tag>
# 注意涉及合并该分支操作时，可能出现代码回退情况，当撤销的提交在其他分支存在时
```

- 撤回提交
```bash
# 撤回最近一次提交
git reset HEAD^

# 撤回最近3次提交
git reset HEAD^^^

# 撤回最近n次提交
git reset HEAD~n 

# 恢复到指定tag或commit
git reset tag <tagName>
git reset <commitId>

# 撤回最近一次提交中指定文件的变更
git reset HEAD <file>

# 撤回本地提交，不保留暂存区，保留工作区（默认方式）
git reset HEAD^1
git reset --mixed HEAD^1

# 撤回本地提交，并保留工作区和暂存区
git reset --soft HEAD^1

# 撤回本地提交，但不保留暂存区和工作区
git reset --hard HEAD^1

# 若已提交到远程仓库，本地撤回提交后需强制推送
git push origin -f
# ！！！一般来说, 要避免强推。此时考虑使用revert方式

# (待验证)实践：若不慎使用git reset --hard HEAD^1，如何恢复
# 找到最近一次提交id
git reflog 
# 临时分支，恢复提交
git checkout <COMMITID>
# 创建新分支
git checkout -b <TEMP_BRANCH> # 或git switch -c <TEMP_BRANCH>
# 撤回提交（终端是否支持^，不支持则使用git终端）
git reset HEAD^
# 存储工作区变更
git stash
# 切换到原分支，恢复工作区
git stash pop
# 提交
git commit -m "恢复提交"
```

- 变更暂存
```bash
# 保存工作现场
git stash save

# 暂存指定文件
# 指定某些文件，间隔空开，新文件可以使用选项u进行储藏
git stash push <path/file>
git stash push -u <path/file>

# 恢复stash保存内容，但不把stash内容删除，即此时git stash list可查看相应的stashId
git stash apply
# 使用某个暂存，n表示stash在栈中的位置，比如最上层的stash是0
git stash apply "stash@{n}"

# 恢复stash保存内容，并把stash内容删除，即git stash list不能查看相应的stashId
git stash pop

# 删除stash内容
git stash drop

# 查看当前分支stash列表
git stash list

# 清空所有stash
git stash clear

# 若知道变更不提交，可以先git stash save保存当前状态，做完需提交的操作后再git stash pop恢复
```

## 分支操作
- 分支基础操作
```bash
# 新建分支，若指定了起点，则分支在该起点建立，否则默认在当前起点建立分支
git branch <branch> [start-point]
# 恢复误删分支：
git log -g
git branch <误删分支名> <该分支最近一次提交ID>

# 删除分支，当分支不是被完全合并或包含在当前分支时删除失败
git branch -d branch
# 强制删除分支
git branch -D branch

# 重命名分支，若分支名已存在则修改失败
git branch -m
# 重命名分支，即使分支名已存在
git branch -M

# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看所有分支
git branch -a

查看所有分支最近一次提交的简短信息
git branch -v
```

- 切换分支
```bash
# 切换分支，并携带工作区变更
git checkout [options] <branch>
# (待验证)创建并切换分支，并基于start-point创建
git checkout -b <branch> [start-point]

# 切换分支，并携带指定文件变更
git checkout [options] [<branch>] -- <file> # (待验证)未指定分支，则默认当前分支的临时分支
# 示例：
git checkout -b dev -- a.txt
# fatal: 'a.txt' 不是一个提交，不能基于它创建分支 'dev'
```

- 合并分支
```bash
# 将指定的一个或多个分支合并到当前分支，产生一次合并提交
git merge branch1 ... 
# 将指定一个或多个分支压合，产生一次普通提交，但没有合并操作
git merge --squash branch1 ...
# 将指定的一个或多个分支合并到当前分支，不产生新的提交。又称快进合并
git merge --no-commit branch1 ...

# 非快进合并，产生一次合并提交
git merge --no-ff
# 快进合并，不产生新提交
git merge --ff     
# 仅快进合并 
git merge --ff-only

# 合并后不显示合并前后的不同状态
git merge -n
git merge --no-stat
# 合并后显示合并前后的不同状态 
git merge -stat

# 合并前调用配置的编辑器，否则提交内容是git默认生成
git merge -e

# 不打印输出的合并 
git merge --quiet
```

```bash
# 将两个分支的公共部分合并到当前分支，若有冲突则按分支顺序进行覆盖
git merge-base <branch1> <branch2>
```

```bash
# 合并某提交到当前分支，产生新的提交。一般不使用cherry-pick合并代码，因为产生的提交id会改变，容易冲突
git cherry-pick <commitId>
```

```bash
# rebase支持合并、执行、中止、回退操作

# 合并指定分支，并按先后操作进行合并
git rebase <branch>
# 以上可能产生强推，如何避免
# 1、为了不把rebase操作反映到远程分支上，需要在本地另起一个分支进行操作，再合并
git checkout -b temp
# 2、指定基分支进行交互式rebase
git rebase -i dev
# 3、若交互式报错，执行git rebase --edit-todo，重新进入交互，当重新修改满意，再执行git rebase --continue，会继续执行交互中未完成的命令，最后执行git rebase --abort退出交互
# 4、切换到原分支，合并临时分支
git checkout dev
git merge --ff-only temp
```

> merge、cherry-pick、rebase区别
> 
> merge：产生新的合并提交；提交按提交时间合并，分支树呈非线性结构
>
> cherry-pick：产生新的提交，id会变化
> 
> rebase：不产生新的提交；提交按先后操作合并，id会变化，分支树呈线性结构（Pull Request一般采用该方式）

## 日志操作
- 查看提交记录
```bash
# 查看当前分支提交日志
git log

# 查看当前分支的提交日志及其变更操作
git log --raw

# 压缩模式，一行显示每次提交的不完整id和信息
git log --oneline
# 压缩模式，一行显示每次提交的完整id和信息
git log --pretty=oneline


# 查看所有分支提交日志
git log --all

# 图形模式，输出左侧提供一张历史提交的树状图，与--all结合使用有效
git log --graph


# 查看指定分支提交日志
git log <branch>

# 查看指定分支的除合并信息外的提交日志
git log --no-merges <branch/tag>
# (待验证)检查A分支上的所有提交是否都有合并到B分支上，比如dev分支上的提交是否都有合并到main分支
git log main ^dev --no-merges

# 查看指定分支的合并信息的日志
git log --abbrev-commit <branch/tag>

# 统计指定分支的提交次数
git log --oneline <branch> | wc -l

# 查看指定分支从第1次到第n+1次的日志
git log <branch>@{n}

# 查看bran2日志，但不在bran1日志
git log <branch1>..<branch2>

# 查看当中任一分支日志，但不包括两个分支都有的日志
git log <branch1>...<branch2>

# 查看包含指定内容的日志
git log -S <content>

# 查看日志，并显示修补内容
git log -p

# 查看记录，含提交id、提交注释、各分支目前所在的位置等信息
git log --decorate --graph --oneline --all
```

- 查看本人提交记录，包括所有分支
```bash
# 类似git log --oneline，但不显示本人提交记录
git reflog
```

- 查看修改内容
```bash
# 查看未暂存的修改内容
git diff

# 查看暂存的修改内容
git diff --cached

# 对比两分支内容差异，从后者角度看
# git diff <branch1> <branch2>
git diff main origin/main
```

- 显示某次提交的变更内容
```bash
git show [<head/object/branch/tag>]

# 查看最近一次提交变更内容
git show
git show HEAD
```

- 查询指定文件指定行的提交信息
```bash
# 输入格式：git blame -L <n,m> <file>。其中n是起始行，m是结束行，file是指定文件
# 输出格式：commitID (代码提交作者 提交时间 代码位于文件中的行数) 实际代码
git blame -L 2,2 LICENSE
```

- 查看heads\tags\remotes提交记录
```bash
# option说明：
# --heads：只查看head对象的提交
# --tags：只查看tag对象的提交
git show-ref [option]
```

- 查看指定分支的版本列表
```bash
git rev-list <branch>
```

## 远程操作
- 获取或更新远程分支
```bash
# 获取或更新所有分支
git fetch --all

# 本地获取分支，并清理已删除的远程跟踪分支
git fetch -p
git fetch -p origin
git fetch --prune origin

# 从远程获取或更新指定分支
git fetch origin <branch>

# 根据url获取或更新分支
git fetch <url>
# 根据url强制更新分支
git fetch -f <url>
# 从url获取branch1到branch2分支
git fetch <url> <branch1>:<branch2>
```

- 检出远程分支，本地不创建
```bash
# 2.3之前
git checkout origin/<branch>
# 2.3之后
git switch --detach origin/<branch>
```

- 从远程跟踪分支创建本地跟踪分支
```bash
# 2.3之前
git checkout -b <branch> origin/<branch>
# (待验证)其简写如下，
git checkout --track origin/<branch>
# 2.3之后
git switch -c <branch> --track origin/<branch>
```

- 推送
```bash
# 推送分支
git push origin <branch>
```
push过程如下：

1、同步提交到远程
![](/git/push_1.png)

2、远程跟踪分支获取并指向最新提交
![](/git/push_2.png)

```bash
git push origin HEAD
git push -u origin <branch>
git push --set-upstream origin <branch>

# 删除远程分支
git push --delete origin <branch>

# 远程分支重命名
# 将本地分支重命名，然后删除远程分支，再将推送重命名分支

# 远程打tag
# 推送指定tag到远程
git push origin <tag>
# 推送所有tag到远程
git push origin --tags 

# 删除远程tag
git tag -d <tag ></tag>
git push origin :refs/tags/<tag>

# 空分支代替指定分支
git push origin :<branch>

# 将本地分支X推到远程分支Y
git push origin X:Y

# 强制推送
git push -f 
```

- 拉取
```bash
# 从远程分支拉取且合并到指定本地分支，若无指定则默认当前分支
git pull origin[:branch]
```
pull过程如下：

1、获取，`git fetch origin [branch]`
![](/git/pull_fetch.png)

2、合并分支，`git merge origin[/branch]`
![](/git/pull_merge.png)

- 远程仓库操作
```bash
# 查看所有远程仓库
git remote

# 查看指定的远程仓库详情
git remote show <repo>

# 添加远程仓库，指定仓库名和仓库地址
git remote add <repo> <url>

# 删除指定的远程库
git remote rm <repo>

# 重命名远程仓库
git remote rename [<oldRepo>] <newRepo>

# 删除指定远程库不存在的分支
git remote prune <repo>
```

## 问题定位
- 搜索指定tag下指定bad内容，若无指定tag，则默认在当前分支下搜索指定bad内容
```bash
git grep [<tag>] <bad_content>
```

- 使用二分查找
```bash
# 启动
# git bisect start

# 退出
# git bisect reset

# 设置指定提交为坏起点
# git bisect bad

# 设置指定提交为好起点 
# git bisect good

# 跳过指定提交
# git bisect skip

# gitk查看bisect状态
# git bisect visualize

# bisect日志操作
# git bisect log

# 示例：找出c.txt是何时写入1111111111111111111111111111
# 1、开始
git bisect start
# 2、坏起点
git bisect bad master
# 3、好起点
git bisect good V1.0.0
# 4、
# 方式一：人工手动处理
# # 移动坏起点
git bisect bad b529e27edbe77c71760062bc9c4b2be4cf8a76a1
# # 移动好起点
git bisect good c2520089ba372d5def8ea2c1dcc378c8a3f793a7
# # b529e27edbe77c71760062bc9c4b2be4cf8a76a1 is the first bad commit
# # commit b529e27edbe77c71760062bc9c4b2be4cf8a76a1
# # Author: liu <liu@qq.com>
# # Date:   Tue Oct 10 09:18:36 2023 +0800
# #     更新b.txt,c.txt
# #  b.txt |  2 ++
# #  c.txt | 22 ++++++++++++++++++++++
# #  2 files changed, 24 insertions(+)
# #  create mode 100644 c.txt
# 方式二：脚本自动处理
# 若git提交记录非常多，按上面一个个手动操作，效率很低，可以编写脚本实现自动执行
chmod 777 ./check.sh
git bisect run ./check.sh
./check.sh
# found bad
# 二分查找中：在此之后，还剩 0 个版本待测试 （大概 0 步）
# [c2520089ba372d5def8ea2c1dcc378c8a3f793a7] add b.txt
./check.sh
# not found bad
# b529e27edbe77c71760062bc9c4b2be4cf8a76a1 is the first bad commit
# commit b529e27edbe77c71760062bc9c4b2be4cf8a76a1
# Author: liu <liu@qq.com>
# Date:   Tue Oct 10 09:18:36 2023 +0800
#     更新b.txt,c.txt
#  b.txt |  2 ++
#  c.txt | 22 ++++++++++++++++++++++
#  2 files changed, 24 insertions(+)
#  create mode 100644 c.txt
# 二分查找运行成功
# 5、结束
git bisect reset
# 结果：创建c.txt时就写入了1111111111111111111111111111，因此定位提交是b529e27edbe77c71760062bc9c4b2be4cf8a76a1
```

## 其他
- 配置信息
```bash
# 常用option：
# --system：系统配置
# --global：当前用户的全局配置
# --local：当前用户的本地仓库配置
# --add：添加变量
# --unset：删除匹配的第一个变量
# --unset-all：删除匹配的所有变量
# -l/--list：查看配置信息
git config {option}

# 示例
# 全局添加user.email配置
git config --global [--add] user.email 123456@cc.com
# 查看全局配置
git config --global -l
# 查看本地配置
git config --list --local
# 查看某一配置值
git config --get core.ignorecase
# 修改配置
git config core.ignorecase false
```

- 检查仓库中的对象及其目录
```bash
git fsck
```

- 垃圾回收
```bash
git gc
```

- 将某次提交后的版本库导出
```bash
# --format：指定输出文件扩展名
# --prefix：指定每个路径名前缀
# -o：指定输出文件，注意带后缀名
# -l：支持输出格式
# path：输出路径
git archive [--format fmt] [-l] [--prefix prefix] [-o file] tree-ish [path] 
```

- 为邮件提交准备补丁
```bash
git format-patch
```

- 分离邮件信息到提交日志信息，应用到当前分支
```bash
git am
```

- 设置提交的对象名
```bash
# 使用已有object设置commit对象名
git name-rev [options] <object>

# 使用已有tag的SHA设置commit对象名
git name-rev --tags <tagName>
```

- 查看最近一次tag对应的commit对象
```bash
git describe --tags
```
