官网：https://git-scm.com/

## 特点
分布式，支持离线操作，避免引入辅助目录

## .git目录介绍
```
|-- HEAD           指定当前分支
|-- description    指定仓库名称
|-- config         指定仓库的配置信息，如核心选项配置、远程仓库地址等
|-- info           存放exclude文件，指定项目要忽略的文件，仅对本地有效。使用.gitignore可共享要忽略提交的文件
|-- objects        对象库。commit对象关联parentCommitId和treeId，tree对象关联文件id。使用git ls-files --stage可以显示提交内容的对象名称，使用git cat-file -t <对象名称>可以查看对象类型
|-- refs           存放本地分支、远程分支、tag当前各指向的提交id
|-- hooks          存放各种hook示例
```

下面了解下config文件，以本博为例，

- remote配置
  ```
  [remote "origin"]
    url = git@github.com:muzhidong/muzhidong.github.io.git
    fetch = +refs/heads/*:refs/remotes/origin/*
  ```

  其中，fetch值的格式为`[+]src:dest`，其中带+表示强制non-fast-forward(非快速前进，不必基于上次提交进行获取)的fetch操作，不带+表示强制fast-forward(快速前进，必须基于上次提交进行获取)的fetch操作。默认是允许非快速前进的fetch操作，即带+

  设置多个远程仓库，此时config文件会多出一个remote配置
  ```bash
  git remote add <remote_repo_name> <remote_repo_url>
  ```

  修改远程仓库地址
  ```bash
  # 若push时报HTTP/2 stream 1 was not closed cleanly before end of the underlying stream，尝试执行以下命令，修改远程仓库地址
  git remote set-url origin <remote_repo_url>
  ```

  为远程仓库设置多个命名空间，此时config文件在remote配置中会多出一个fetch
  ```bash
  git remote set-branches --add <remote_repo_name> <namespace>/*
  ```

- branch配置
  ```
  [branch "main"]
    remote = origin
    merge = refs/heads/main
  ```

  设置该配置有以下几种方式
  ```bash
  git branch --set-upstream-to=<remote_repo_name>/<remote_branch_name> [<branchName>]

  git branch -u <remote_repo_name>/<remote_branch_name> [<branchName>]

  git branch --set-upstream <branchName> [<start-point>]

  git branch --track <branchName> [<start-point>]

  git checkout # 从远程跟踪分支指向位置检出对应分支时自动设置
  
  # 动态配置某分支的远程仓库url和远程分支名称
  git config branch.<branchName>.remote <remote_repo_name>
  git config branch.<branchName>.merge refs/heads/<remote_branch_name>
  ```

- push配置
  ```bash
  # 值为nothing时，推送时需指定refspec，如`git push origin main`推送成功，而`git push origin`推送拒绝
  # 值为current时，允许推送到远程不存在的同名分支(自动创建)，与配置的远程分支同在
  # 值为upstream时，推送到配置的远程分支
  # 值为matching时，只推送本地和远程都有的同名分支。v2前默认值
  # 值为simple时，推送到主仓库的，同upstream，但配置的分支要求同名；推送到非主仓库的，同current。v2后默认值
  [push]
    default = nothing|current|upstream|matching|simple
  ```

## git钩子
Git钩子存放在.git/hooks文件夹下，分Client端钩子和Server端钩子。Client端钩子被操作触发，如commit、merge，Server端钩子被网络动作触发，如push、pull

> 可以使用shell\perl\python写钩子，且注意将文件设置为可执行的，如`chmod u+x your_hook`

- Client端钩子
  - pre-commit：当执行commit动作时先执行此hook，可以用此hook做一些检查，比如代码风格检查，或者先跑测试
  - prepare-commit-msg：当commit时需要输入message前会触发此hook，可以用此hook定制自己的default message信息
  - commit-msg：当用户输入commit的message后触发，可以用此hook校验message的信息，比如是否符合规定，有没有cr等
  - post-commit：当commit完成后被触发，可以用此hook发送notification

  - pre-rebase：rebase前被触发，可以用此hook拒绝所有已经push的commits进行rebase操作
  
  - post-merge：当merge成功后触发此hook
  
  - pre-push：当push时，remote refs被更新，但是在所有的objects传输前被触发
  
  - pre-auto-gc：当git gc --auto执行前被触发，可用于在垃圾回收之前做一些验证或备份

- Server端钩子
  - pre-receive：收到push动作之前执行
  - update：收到push动作之前被执行，但是有可能被执行多次，每个branch一次
  - post-receive：当push动作已完成时触发，可以用此hook来push notification等，如发邮件，通知持续构建服务器等

> [点这查看完整git钩子](https://git-scm.com/docs/githooks#_hooks)

## 操作建议
- 1、提交前，先执行pull操作，获取最新
- 2、更新代码的周期不要太长
