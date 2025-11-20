本篇教你如何搭建git服务器，并解决当中可能出现的问题。

## 步骤
```bash
# 服务端安装git
yum install -y git

# 服务端初始化仓库
git init [repoName].git

# 服务端设置仓库文件夹只能由组root用户git修改
useradd git -g root
chown -R git:root [repoName]

# 客户端生成并上传公钥到服务端
ssh-keygen -t rsa -C '你的邮箱'
ssh-copy-id 远程用户名@远程IP

# 客户端克隆远程仓库
git clone ssh://远程用户名@远程IP/root/project/[repoName]/[repoName].git
```

## 遇到的问题
### 本地git pull时，报refusing to merge unrelated histories
```bash
git pull --allow-unrelated-histories
```

### 本地push后，服务器找不到文件
- 远程本地仓库配置
```bash
# 无需配置服务器仓库为共享，因为共享仓库是没有工作树的概念的，不存放工作目录，只存放历史和元信息
git config --local core.bare false
git config --local receive.denyCurrentBranch ignore
```

- shell编写.git/hooks/post-receive钩子函数
```bash
#!/bin/bash
# 不保留工作区和暂存区的变更
WORK_TREE='../'
git --work-tree="${WORK_TREE}" reset --hard
# 每当有代码提交，重新打包项目，比如
cd /root/project/docs && npm run build
```

- 对post-receive文件赋予可执行权限
```bash
chmod 755 post-receive
```
