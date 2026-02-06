本篇先介绍了Linux系统不同系列，再整理了不同Linux系统下软件的安装卸载、启动关闭的几种方式，最后记录下使用过程中的一些问题和处理方案。

## Linux系统系列
- Redhat系列：CentOS、RedHat

  |        |  Fedora          |         CentOS Linux     |     Red Hat Enterprise Linux    |
  |--------|------------------|--------------------------|---------------------------------|    
  |        |  社区空间          |          共享空间         |          企业空间                | 
  | 受众    | 操作系统开发人员    |        社区和合作伙伴      |       RHEL客户和合作伙伴          |
  | 聚焦    | 操作系统创新，架构改变 | 开发、测试RHEL的下一个版本 |       稳定、安全和性能            |
  | 迭代    | 快速发展，每6个月发行一次 |       源源不断的新内容 |          可预测的发布节奏          |
  |  | 欢迎和鼓励贡献，上游打包集成，面向尝试和实验目的，一个开源社区，比企业更专注 | 欢迎和鼓励贡献，通过特殊兴趣小组（SIGs）鼓励变体，由红帽组织的贡献，持续提供红帽企业Linux的下一个小版本，关注企业的未来 | 发布之前内部开发，NDA和CVE协同，只能通过订阅访问，专注于企业的当下 |

- Debian系列：Ubuntu、Debian

```bash
# 查看操作系统版本
# 大多数linux发行版
cat /etc/issue
# 红帽系统发行版
cat /etc/redhat-release
```

## 不同Linux版本对应的安装工具
- Redhat系列:
	
	方式一：rpm检查包；yum下载、安装包 
	
	方式二：wget下载tar.xz包；解压二进制包；设置软链接ln，或使用vi ~/.bash_profile或.bashrc设置环境变量，再source ~/.bash_profile或.bashrc执行

	方式三：wget下载tar.gz包；解压、配置、编译源码文件

- Debian系列: apt-get

- MacOS
	
	方式一：homebrew一键下载安装
	
	方式二：下载dmg包；双击包直接安装
	
	方式三：下载tar.xz包；解压二进制包；设置软链接ln，或使用vi ~/.bash_profile或.bashrc设置环境变量，再source ~/.bash_profile或.bashrc执行

	方式四：下载tar.gz包；解压、配置、编译源码文件

## 软件安装与卸载
### wget安装Node
- 检查是否安装编译器、Python等环境和xz等必要工具，若没有则安装
```bash
# 查询已安装的所有软件：rpm -qa
# 查询指定包是否安装：rpm -q <software> 
# 安装：rpm –ivh <software>
# 卸载：rpm –e <software>

# 查询是否安装编译器、Python
rpm -q gcc
rpm -q gcc-c++
rpm -q kernel-devel
python -V || rpm -q python


# 查询已安装的所有软件：yum list
# 安装：yum -y install <software1>[,<software2>]
# 卸载：yum -y remove <software>
# 查询指定包的依赖包：yum deplist <software>
# 列出所有可更新的软件清单：yum check-update
# 更新所有软件：yum update
# 仅更新指定软件：yum update <software>
# 查找软件包：yum search <software>
# 清除缓存：yum clean

# 安装编译器、Python
yum -y install gcc gcc-c++ kernel-devel python
```

- 下载、解压、验证node
```bash
wget https ://nodejs.org/dist/v8.11.4/node-v8.11.4-linux-x64.tar.xz # 下载node
xz -d node-v8.11.4-linux-x64.tar.xz                                 # 解压xz
tar -xf node-v8.11.4-linux-x64.tar                                  # 解压tar
cd ./node-v8.11.4-linux-x64/bin & ./node -v                         # 验证
```

- 设置node和npm软链接
```bash
ln -s /root/soft/node/node-v8.11.4-linux-x64/bin/node /usr/local/bin/node
ln -s /root/soft/node/node-v8.11.4-linux-x64/bin/npm  /usr/local/bin/npm
```

### wget安装Nginx
- 检查nginx必要的包是否安装

- 下载、解压、配置、编译、验证Nginx
```bash
wget http://nginx.org/download/nginx-1.14.0.tar.gz
tar -zxvf nginx-1.14.0.tar.gz
cd ./nginx-1.14.0

# 默认安装路径
./configure

# 指定的安装路径
#./configure --prefix=/usr/local/nginx

# 如果使用https，需要安装ssl模块。
# ./configure --prefix=/usr/local/nginx --with-http_ssl_module

# 如果之前安装过nginx，重新配置(要带上--with-http_ssl_module选项)、编译、并用新生成的objs/nginx文件覆盖/usr/local/nginx/sbin，类似cp /root/soft/nginx/nginx-1.14.0/objs/nginx /usr/local/nginx/sbin，最后检验nginx -V打印的内容是否包含configure arguments:  --with-http_ssl_module这段话

# 编译
make && make install

# 验证，若不能访问，先去除是否是防火墙问题
firewall-cmd --zone-public --list-ports
firewall-cmd --zone-public --add-port=80/tcp [--permanent]
firewall-cmd --reload
```

- 拓展：设置nginx为系统服务
```bash
# 添加nginx.service文件到/usr/lib/systemd/system，内容格式参考firewalld.service

# 启动服务，如果服务器关机则需要重启
systemct1 enable nginx

# 关闭服务
systemct1 disable nginx
```

- 问题记录
```bash
# nginx: [error] invalid PID number "" in "/usr/local/nginx/logs/nginx.pid"
# 解决：手动指定nginx.conf，比如，
nginx -c  /usr/local/nginx/conf/nginx.conf

# 检查nginx配置文件是否有语法错误
nginx -t
# 出现下面结果表示正常
# nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
# nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
```

### yum安装nginx
```bash
# 1、切换到root用户
su root
# 2、安装nginx
yum install nginx
# 3、为nginx用户设置应用文件夹的访问权限（nginx配置默认用户是nginx:nginx）
cat /etc/group
groups nginx
sudo chown -R nginx:nginx  /path/to
sudo chmod -R 755  /path/to
```

### yum安装mysql
- 检查是否安装mysql
```bash
rpm -q mysql
# yum list installed mysql*
```

- 下载、安装mysql
```bash
# 更新mysql到最高版本
rpm -Uvh http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
# 查看mysql可用版本
yum repolist enabled | grep "mysql.*-community.*"
# 安装mysql
yum -y install mysql-community-server
```

- 开启mysql服务并检查状态
```bash
systemctl start mysql && systemctl status mysql
```

- 创建用户
```bash
mysqladmin -uroot password ****
```

- 访问mysql
```bash
mysql -uroot -p****
```

### apt-get卸载、重装软件
```bash
# 1、关闭
sudo killall <software_name>
# 2、卸载
sudo apt-get purge <software_name>* -y # 部分软件可能有多个包，所以用*通配符，注意有生成配置的要手动删除
# 3、安装
sudo apt-get install <software_name>* -y
```

## 软件启动与关闭
### 源码方式启动、关闭redis
```bash
# 启动（进入源码src目录）
# 启动redis服务器，可以指定redis.conf，设置认证密码
./redis-server [../redis.conf] &
# 检查redis是否启动
ps aux|grep redis

# 启动redis客户端
./redis-cli
# 使用中若报了(error) NOAUTH Authentication required.错误提示
> auth XXXX（XXXX是你设置的认证密码）


# 关闭
# 先退出redis客户端，输入exit即可

# 再关闭redis服务器
./redis-cli -h 127.0.0.1 -p 6379 shutdown
# 如果设置了认证密码
./redis-cli -h 127.0.0.1 -p 6379 -a 123456 shutdown
```

### 二进制包方式启动、关闭mongodb
```bash
# 启动
cd /usr/local/bin
# 启动服务器(可以在～/.bash_profile中添加mongod和mongo命令到环境变量)
./mongod -port=27017 -fork -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/mongodb.log -logappend 
# dbpath：指定存储数据的文件夹
# logpath：指定日志存储文件
# logappend：日志以增加方式产生
# port：指定端口，默认27017
# fork：表示后台运行

# 启动客户端
./mongo


# 关闭
# 从命令客户端输入exit退出

# 再关闭服务器
./mongod -shutdown -dbpath=/usr/local/mongodb/data 

# UnhandledPromiseRejectionWarning: MongoError: Authentication failed.
# 创建该用户，设置其角色权限
>db.createUser({user:'',pwd:'',roles:[{'role':'userAdmin',db:''}]})
```

## 踩坑记录
- 文件从window传输到linux，内容乱码
```bash
iconv -f 原编码 -t 新编码 源文件  -o 输出文件
```

- 文件从windows传输到linux，中文文件名乱码
```bash
# 查看本地编码，检查LANG是否为zh_CN.GBK
echo $LANG
# 下面命令可查看信息更多，优先级：LC_ALL（强制设定，一般为空） > LC_* > LANG（默认设定）
locale

# 若不是，则修改编码
vi /etc/profile
export LANG="zh_CN.GBK"

# 执行生效
source /etc/profile
```

- 文件从linux传输到window，内容未换行
```bash
rpm  -ivh  /mnt/Packages/doc2unix
unix2dos 文件名
```

- ssh保持长连接
```bash
# 1.在/etc/ssh/sshd_config文件对如下字段进行配置
TCPKeepAlive yes
ClientAliveInterval 60 
ClientAliveCountMax 3

# 2.重载服务
service sshd reload 
```

## 其他
- dhcp配置
```bash
# 路径：/etc/sysconfig/network-scripts
# 文件：ifcfg-eth0
# 文件内容：
# Created by cloud-init on instance boot automatically, do not edit.
#
BOOTPROTO=dhcp                 # 网卡获得ip地址的方式，值可以是static，dhcp或bootp
DEVICE=eth0                    # 网卡对应的设备别名
HWADDR=52:54:00:e2:16:ea       # 网卡对应的物理地址
NM_CONTROLLED=no
ONBOOT=yes
TYPE=Ethernet
USERCTL=no
PERSISTENT_DHCLIENT=yes
IPADDR=XXX.XXX.XXX.XXX         # 若网卡获得ip地址方式为static，则该字段表示网卡对应的ip地址
```

- 防火墙
  - 分类
    - 硬件防火墙（cisco\华为\天融信）
    - 软件防火墙（iptables，开源免费，系统默认已安装，开启即可）
  - 启动步骤
    - 执行setup命令
    - 可视化界面：选择firewall > 选择enabled
    - 执行/etc/init.d/iptables restart命令

- iptables
  - 3张规则表：NAT\Mangle\Filter
  - 7条规则链(3张表对应的链)
    
    NAT：PREROUTING、POSTROUTING、OUTPUT 
    
    Mangle：PREROUTING、INPUT 
    
    Filter：INPUT、OUPUT、FORWARD

  - 常用配置

    |      |             |
    |------|-------------|
    | -A/I  |  插入过滤表链，A表示插入到最后，I表示插入到最前，可以是处理进入的包INPUT，处理通过的包FORWARD，处理本地生成的包OUTPUT |
    | -s    |   ip地址 |
    | -m    |   模型？ |
    | --state |  状态,建立新的链接NEW \当前正在转发ESTABLISHED \接收到的包与本地发出的包有关联RELATIVED \无效数据包INVALID |
    | -m    |   ？|
    | -p    |   访问协议 |
    | --dport | 访问端口号 |
    | -j   |    拒绝DROP 接受ACCEPT |

  - 配置禁止192.11.11.0访问示例
    ```
    -A INPUT -s 192.11.11.0 -m state --state NEW -m tcp -p tcp --dport 22 -j DROP
    ```

- 查看目录结构
```bash
# 默认没有安装
yum -y install tree
# 指定显示的目录层级和路径
tree -L [level] [path]
```

- 查看块设备信息
```bash
# 显示所有可用块设备信息
lsblk
# 显示所有可用设备、通用唯一识别码、文件系统类型、卷标
blkid
```

- 修改文件系统配置

  一个文本文件，将磁盘的挂载信息写入该文件中，系统开机时自动挂载文件系统的配置信息，每个文件系统用一行描述，每一行用空格分隔各字段。注释行可以#开头

```bash
# 一、修改/etc/fstab文件，以下是文件的修改内容

# 用户磁盘配额
# 1.开启磁盘启动参数
LABEL=SWAP-sda3   swap   swap  defaults  0 0
LABEL=/disk2  /dev/sda2  ext3    defaults,usrquota,grpquota  1 2
# 2.建立aquota.user与aquota.group
touch /disk2/aquota.user
touch /disk2/aquota.group
chmod 600 /aquota.user
# 3.强制扫描已挂载的filesystem
quotacheck -avug -m
# quotacheck 运行完毕后，和启用配额（用户和/或组群）相应的配额文件中就会写入用于每个启用了配额的文件系统（如 /home ）的数据
# 4.使用edquota 命令分配磁盘配额
edquota -u username
# 5.管理磁盘配额
# 5.1报告磁盘配额
repquota /home
# 5.2磁盘配额的启用和禁用
quotaon -vaug  /home 启用
# quotaoff -vaug        关闭
# 5.3为组群分配配额
edquota -g groupname


# 二、重载
source /etc/fstab


# 三、测试是否可以正常挂载
mount
```
