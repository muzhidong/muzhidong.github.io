本篇是Linux系统的入门学习，主要了解系统目录、常见命令以及vi编辑器的使用。系统学习centos7[点这](https://linux.vbird.org/linux_basic/centos7/)

## Linux系统目录
```
|-- /         根目录
|-- /boot     存放内核以及启动所需的文件
|-- /dev      存放设备文件
|-- /sbin     存放系统管理程序
|-- /bin      存放必要的命令
|-- /proc     存放存储进程和系统信息
|-- /lib      存放必要的运行库

|-- /var      系统默认日志存放目录
|-- /tmp      存放临时文件

|-- /mnt      存放临时的映射文件系统，通常用来作挂载
|-- /etc      存放系统配置文件

|-- /usr      存放应用程序，命令程序文件，程序库，手册和其它文档
|-- /home     普通用户的宿主目录，用户数据存放在其主目录中
|-- /root     超级用户的主目录
```

## 用户命令
- sudo/su
```bash
# 切换到root用户
sudo -i

# 切换到指定用户
su - root

# 以root用户操作命令
# sudo <命令名称>
sudo npm i -g @vue/cli

# sudo通过维护一个特权到用户名映射的数据库将特权分配给不同的用户，这些特权可由数据库中所列的一些不同的命令来识别。
# sudo工具由文件/etc/sudoers进行配置，该文件包含所有可以访问sudo工具的用户列表并定义了他们的特权。下面举例对文件说明：
Host_Alias SERVER=no1 # User_Alias、Host_Alias、Cmnd_Alias项在其后面加入名称，多个则逗号分隔
User_Alias ADMINS=testuser,gem 
Cmnd_Alias SHUTDOWN=/usr/sbin/halt,/usr/sbin/shutdown,/usr/sbin/reboot # 赋予用户testuser开、关机权限
ADMINS SERVER=NOPASSWD:SHUTDOWN # 表示允许用户testuser不用密码执行关机操作

%cuug ALL=(ALL) ALL # 对一组用户进行定义，可以在组名前加上%
```

- groupadd
```bash
# 创建组
groupadd <组名>
```

- groupdel
```bash
# 删除组，先删除用户再删除组？
groupdel <组名>
```

- groupmod
```bash
# 更改组名
groupmod -n <旧组名> <新组名>
```

- groups
```bash
# 查看用户所在的用户组
groups #当前用户所在组
groups mudong #用户mudong所在组
```

- useradd
```bash
# 创建用户
useradd <用户名>

# 创建指定用户组的用户
useradd <用户名>  –g <组名>
```

- userdel
```bash
# 删除用户
userdel <用户名>
```

- usermod
```bash
# 迁移指定用户到指定用户组下
usermod <用户名> -g <组名>

# 修改用户名
usermod -l <旧用户名> <新用户名>

# 锁定用户账号
usermod -L mudong

# 解除用户锁定
usermod -U mudong
```

- id
```bash
# 查看用户是否存在
id mudong
```

- passwd
```bash
# 设置用户登录密码
passwd <用户名>

# 锁定用户密码
passwd -l <用户名>
```

- change
```bash
# 更改用户口令有效期
change –M 100 <用户名>
```

- chfn
```bash
# 修改用户信息
chfn <用户名>
```

- whoami/who
```bash
# 查看当前用户名
whoami
# 相较上面命令，会另外显示用户登录时间和方式
who am i
# 查看登录本台机器的用户
who
```

- finger
```bash
# 显示用户信息
finger <用户名>
```

## 文件命令
- 文件属性的字符表示
  - d指文件夹
  - l指链接文件，可认为是快捷文件(夹)
  - b指设备文件，比如硬盘
  - c指字符设备文件，比如鼠标、键盘
  - s指Socket
  - p指管道

- chmod
```bash
# 修改用户对文件的访问权限
# 文件权限标识位有9位，分为3组，分别表示文件所属用户权限，文件所属用户组权限和其它用户权限，每组由3个标识位组成，分别表示是否可读，是否可写，是否可执行。其中，可读用r/4表示，可写用w/2表示，可执行用x/1表示，无权限用-/0表示。u表示文件所属用户，g表示文件所属用户组，o表示其他用户，a表示所有用户
# 方式一：8进制数值控制整体权限，每1位代表每组权限，每位值代表3个标识位之和
chmod 760 filename         # 文件所属用户有读写执行权限，文件所属用户组有读写权限，其他用户没有权限
# 方式二：按组赋值权限
chmod g=rw,o=-  my_file    # 组成员有访问文件的读写权限，其他用户则没有
# 方式三：按组加减权限
chmod u+x  koorka.file     # 给文件拥有者添加执行权限 
chmod a+rw koorka.file     # 所有人具有读写权限
chmod a-rwx koorka.file    # 所有人拒绝访问
chmod go-r koorka.file     # 给文件属组和其它用户减去读取权限 
```

- chown
```bash
# 修改文件只能被某用户组某用户访问
# chown -R <用户组>:<用户名> <访问路径>
chown -R mongo:mongo /root/mongo
```

- chgrp
```bash
# 改变文件所属用户组
chgrp [group] [file]
```

- df/du
```bash
# 查看存储
# 以1024B为单位显示磁盘信息
df -h
df --human-readable

# 以1000B为单位显示磁盘信息
df -H
df --si

# 除了显示各磁盘使用信息，也显示总统计信息
df --total

# 显示所有文件系统使用情况
df -a

# 显示inode信息
df -i

# 显示区块占用情况
df -k

# 显示文件系统类型
df -T
```

```bash
# 查看某个目录磁盘占用情况
# 显示目录大小
du -s [path]

# 显示目录大小带单位
du -h [path]

# 显示具体文件名
du -a [path]

# 指定目录层级
du --max-depth=1 [path]

# 显示每个目录汇总值
du -c [path]
```

```bash
# 牛刀小试：无法新建文件夹，提示空间已满
# 1.磁盘块和索引节点当中有一个已满，都会导致无法创建文件
df -h  # 查看磁盘空间占用(blocks)，实际查看磁盘块占用文件
df -i  # 查看索引节点占用(Inodes)，可能空间未满，节点满，也会造成该现象
# 2.确定资源的占用位置
find / -size +100M |xargs ls -lh  # 列出系统内大于100M的文件
du -d 1 -h # 查看当前目录内文件夹的大小
# 3.删除超大文件
```

- pwd
```bash
# 查看当前路径
pwd
```

- ls
```bash
# 先认识文件信息的含义，以下面举例说明，
# -rw-r--r-- 1 root root 50K Oct 19 23:38 /root/install.log
# 文件类型：文件标志的第一个字符是 -”，表示这是一个普通文件,如果是d,表示为文件目录。
# 文件权限：文件权限是 rw-r--r--  ，表示文件属主可读写，文件所归属的用户组可读，其它用户可读； 
# 硬链接个数：/root/install.log 这个文件没有硬链接，因为数值是 1，就是他本身； 
# 文件属主：该文件归哪于哪个用户，它归于 root； 
# 文件属组：该文件归属于哪个用户组，在这是 root 用户组； 
# 文件大小：文件大小是 50K； 
# 最后访问时间：Oct 19 23:38，这里时间是最后访问时间，最后访问和文件被修改或创建时间有时并不一致； 
# 文件名或目录名：在这是文件名称

# 查看当前目录下文件列表信息
# 列出详情文件列表
ls -l
# 按文件最后修改时间逆序(由旧到新)列出文件列表
ls -rt
```

- cd
```bash
# 返回上一级目录
cd ..
```

- cat/head/tail/strings
```bash
# 查看文件内容
cat package.json
# 查看所有用户，有两种查看路径
cat /etc/passwd  # 配置文件
cat /etc/shadow  # 影子口令文件
# 查看所有用户组，有两种查看路径
cat /etc/group   # 配置文件
cat /etc/gshadow # 影子口令文件

# 查看文件前10行
head -n 10 package.json

# 查看文件倒数10行
tail -n 10 package.json

# 只打印ASCII内容，非ASCII的会被过滤
strings README.md
```

- more/less
```bash
# 以vi编辑器方式可滚动查看文件，对大文件阅读更友好
more README.md
less README.md
```

- grep
```bash
# grep [option] <搜索内容> <搜索文件>
# 选项如下：
# -c：只输出搜索路径内匹配行的总数
# -I：搜索内容中的字母不区分大小写
# -h：多文件查询时不显示文件名
# -l：多文件查询时只输出包含匹配字符的文件名
# -n：显示匹配行及行号
# -s：不显示不存在或无匹配文本的错误信息
# -v：在搜索路径内显示不包含匹配文本的所有行
grep -c dev package.json  
grep -n dev *.json  
```

> 扩展：

> 基本的正则表达式：Basic Regular Expression，简称BREs
> 
> 扩展的正则表达式：Extended Regular Expression，简称EREs
> 
> Perl正则表达式：Perl Regular Expression，简称PREs
>
> <a href='/os/regexp.jpg' title='BREs、EREs、PREs比较' alt='BREs、EREs、PREs比较'>BREs、EREs、PREs比较</a>

> grep支持BREs、EREs、PREs
>
> grep指令后不跟任何参数，则表示要使用BREs
>
> grep指令后跟-E，则表示要使用EREs
>
> grep指令后跟-P, 则表示要使用PREs

> egrep支持EREs、PREs
>
> egrep指令后不跟任何参数, 则表示要使用EREs
>
> egrep指令后跟-P参数, 则表示要使用PREs

> sed支持BREs、EREs
>
> sed指令默认使用BREs
>
> sed指令后跟-r参数，则表示要使用EREs

> awk支持EREs, 默认使用EREs

- find
```bash
# 搜索/路径下名为i18n的文件
find / -name i18n

# 查找当前目录下文件目录名为abc，且是一天内有修改的
find . -name abc -type d -mtime -1

# 查找指定目标，并对其执行某一操作，格式为find ... -exec 命令 \;
find . -name test.txt -type -f -exec cp {} /mudong \; # {}表示查找到的目标
```

- touch
```bash
# 新建文件
touch <fileName>
# 更便捷的方式：自动新建且写入
echo 'abc' > a.txt # 覆盖写入
echo 'edf' >> a.txt # 追加写入
```

- mkdir
```bash
# 创建空文件夹
mkdir <dirName>
```

- rm/rmdir
```bash
# 删除文件夹及其文件
# 格式：rm -rf 文件名或正则表达式 
# -r：若目标是文件夹，则连同文件夹下的文件或文件夹一同删除
# -f：强制删除
rm -rf <path>

# 删除文件夹
rmdir <path>
```

- mv
```bash
# 移动文件
mv ./source/a.txt ./target/
# 移动文件，并强制覆盖同名文件
mv -f ./source/a.txt ./target/
```

- cp
```bash
# 复制文件
cp ./source/a.txt ./target/
# 复制目录下所有文件
cp -R ./source/ ./target/
```

- source
```bash
# 执行文件
source locale.conf
```

- scp
```bash
# 前提是两系统间能通过ssh连接
# 从window传输文件到linux
scp /path/to/file user@ip_address:/path/to  # 单文件传输
scp -r /path/to/dir user@ip_address:/path/to # 多文件传输
# 从linux传输文件到window或mac
scp user@ip_address:/path/to/file /path/to  # 单文件传输
scp -r user@ip_address:/path/to/dir /path/to # 多文件传输
```

- sh

直接输入`sh`进入shell脚本终端，输入`exit`退出shell终端
```bash
# 表示边执行，边打印执行代码
sh -x <脚本名称> 
```

## 进程命令
- top
```bash
# 查看cpu
top
# Processes: 413 total, 4 running, 409 sleeping, 2588 threads
# Load Avg: 2.69, 3.19, 3.88  CPU usage: 8.64% user, 8.87% sys, 82.47% idle
# SharedLibs: 240M resident, 53M data, 21M linkedit.
# MemRegions: 239908 total, 1561M resident, 51M private, 594M shared.
# PhysMem: 8144M used (2407M wired), 47M unused.
# VM: 5321G vsize, 2305M framework vsize, 1332087745(1145) swapins, 1350564392(0) swapouts.
# Networks: packets: 490515510/513G in, 288783990/50G out.
# Disks: 98259355/5984G read, 60850728/5650G written.

# 其中Load Avg的三个值超过5就表示超负荷了？


# 查看cpu明细
cat /proc/cpuinfo
lscpu

# 查看cpu物理个数（主板上实际插入的cpu数量）
grep "physical id" /proc/cpuinfo | sort | uniq | wc -l

# 查看核心数量
grep "core id" /proc/cpuinfo | sort -u | wc -l

# 查看cpu逻辑个数（一般逻辑cpu = 物理cpu * 每颗核数，若不等，说明cpu支持超线程）
grep "processor" /proc/cpuinfo | wc -l

# 查看cpu型号
cat /proc/cpuinfo | grep "name" | sort | uniq
```

- free
```bash
# 查看内存
# mem        
# swap   虚拟内存（数据存放在硬盘上的数据，解决内存不足问题，但是swap大小是有上限的，一旦超过系统自动将耗存较多的进程kill）
# shared 共享的物理内存，即和普通用户共享的物理内存
# buffer 存放到disk的数据
# cached 从disk读取的数据
# total  总的物理内存，total = used + free
# used   已使用的物理内存
# free   空闲的物理内存
free -m
free -h

# 每隔3秒查询内存
free -s 3
```

- ps
```bash
# 查看用户进程
ps
# 查看所有进程
ps -ax
# 查看某一进程
ps -ef｜ grep processName
```

- lsof
```bash
# 查看指定进程打开的所有文件
lsof -p 93946
# COMMAND     PID   USER   FD   TYPE             DEVICE SIZE/OFF                NODE NAME
# iTermServ 93946 mudong  cwd    DIR                1,4      640                   2 /
# iTermServ 93946 mudong  txt    REG                1,4   217632           218070605 /Users/mudong/Library/Application Support/iTerm2/iTermServer-3.4.15
# iTermServ 93946 mudong  txt    REG                1,4  2528384 1152921500312786224 /usr/lib/dyld
```

- kill
```bash
# 该命令实质是向进程发送信号
kill <进程号> # 发送SIGTERM信号。而优雅退出便是监听到该信号，并递归退出子进程
kill -9 <进程号> # 发送SIGKILL信号。强杀进程
kill -s SIGUSR1 34534 # 调试nodejs应用，因为nodejs接收到SIGUSER1时会进入调试模式
```

- netstat
```bash
# 查看启动的进程
netstat -nplt

# 根据端口查找占用进程
netstat -ano | findstr "8080"
```

## 网络命令
- ifconfig
```bash
# 查看网络信息
ifconfig

# 查看指定网卡信息
ifconfig eth0

# 查看指定网卡信息，并过滤出IP地址
ifconfig eth0 | grep inet

# 查看指定网卡信息，并过滤出MAC地址
ifconfig eth0 | grep HWaddr
```

- hostname
```bash
# 查看主机名
hostname
```

- nslookup
```bash
# 查看域名解析情况
nslookup <ip>
```

- ping
```bash
# 查看网络连通性、网速
# 返回信息：
# bytes 数据包大小，单位字节
# time  响应时间，值越小说明网速好
# ttl   Time To Live，生存时间，表示DNS记录在DNS服务器上存在时间，告知路由器该数据包何时被丢弃。一般可以通过它判断目标系统，值为32是Windows98，值为64是Linux，值为128是WindowsNT/2000/XP，值为255是Linux或Unix
# 错误提示
# NoAnswer：中心主机未工作、本机或中心主机网络配置不正确、本地或中心路由器不工作、通信线路故障、中心主机存在路由选择问题
# RequestTimedOut：目标主机未连接、路由器连接有问题、路由器不通过、目标主机设置防火墙
# UnknownHostName：DNS设置不对、目标主机不存在
ping <域名>
ping <ip>
```

- telnet
```bash
# 查看端口连通性、是否占用
# telnet是windows标准服务，但在linux和mac需要自行安装telnet
telnet <ip> <port>
```

- curl
```bash
# curl指client url工具
# 完整选项说明：https://www.ruanyifeng.com/blog/2019/09/curl-reference.html
# -X 指定http请求方式
# -H 指定http请求头
# -d 指定http请求体，会自动添加请求头Content-Type:application/x-www-form-urlencoded，并且请求方式转为POST
# -b 向服务器发送cookie
curl -X POST -H "Content-Type:application/x-www-form-urlencoded" -d "username=admin&password=123456" -b "JSESSIONID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" http://127.0.0.1:8080/login
```

- ssh
```bash
# 远程免密登录
# 1.本地生成rsa密钥文件。生成文件默认在/用户名/.ssh文件夹下
ssh-keygen -t rsa -C <your_email>

# 2.在远端./.ssh/authorized_keys文件中手动写入公钥
# 另一种更便捷方式，具体用法通过ssh-copy-id -h查看
ssh-copy-id <remote_server_username>@<remote_server_ip>

# 3.本地验证ssh连接是否正常
# 格式如下，
# ssh -T <username>@<ip_or_domain> 
# 举例如下，github ssh服务使用git作为默认用户名
ssh -T git@github.com

# 4.公钥远程登录
# 格式如下，
# ssh <remote_server_username>@<remote_server_ip>
# 举例如下，
ssh root@106.53.127.43
```

> ssh原理
  ![](/os/ssh原理.png)


## 系统命令
- enable
```bash
# 查看系统内部命令
enable
```

- which
```bash
# 查看命令的所在执行路径和别名信息，若查看的是内部命令则只提示它是内置命令，而where命令会另外打印执行路径，type则无异
which cd
# cd: shell built-in command
which ssh
# /usr/bin/ssh
```

- uname
```bash
# 查看系统内核信息
uname [-r]
# 查看系统详细信息
uname -a # cat /etc/os-release 或。more /etc/*release*
```

- locale/localectl
```bash
# 查看系统的语言设置
locale
# 查看系统使用的语言
echo $LANG
# 查看系统已安装的语言
locale -a
# 设置系统语言，注意检查使用的访问工具是否将字符集设置为utf8，不是则设置为utf8
localectl set-locale LANG=zh_CN.utf8  #如果不起效，再执行命令 source /etc/locale.conf
```

- cal
```bash
# 查看日历
cal
# 查看某年日历
cal [year]
```

- date
```bash
# 查看日期
date
# 只查看年、月、日、时、分或秒
date +%Y
date +%m
date +%d
date +%H
date +%M
date +%S
```

- env
```bash
# 查看环境变量
env
```

- ln
```bash
# 建立软链接
ln -s /path/to/original /path/to/link
```

- history
```bash
# 显示终端命令操作记录
history
```

- 拓展一个分区 
```bash
# 创建分区
fdisk <分区名>
# 格式化分区
mkfs
# 挂载分区 
mount <分区名> <挂载路径>
```

## 工具命令
- man 
```bash
# 输出命令使用说明
man [cmd]
```

- 输入输出
```bash
# 从输入中写入变量var
read var  
# 输出变量var
echo $var
```

- gzip/gunzip
```bash
# 只能压缩为gz文件，但不能压缩目录，也不保留原文件
gzip <file>
# 解压文件，但不保留原文件
gunzip <file>
```

- zip/unzip
```bash
# 压缩文件或目录，会保留原文件
zip a.zip a.txt
# 解压文件，会保留原文件
zip -r a.zip a.txt # 存在文件直接覆盖
unzip a.zip # 存在文件会询问操作
```

- tar
```bash
# 压缩文件
tar -cf test.tar.gz test.txt
# 解压文件
tar -xf test.tar.gz
```

- textutil
```bash
# textutil -convert <要转换的格式> <要转换的文件>
textutil -convert html *.webarchive
```

## vi/vim编辑器
### 正常模式操作
- 复制当前行：按yy
- 粘贴当前行：按p
- 剪切当前行：按dd
- 撤销：按u
- 查找：/要查找的内容，按n正序查找，按shift + n 倒序查找
- 追加内容：%s/要查找的内容/&要追加的内容
- 替换：%s/要被替换的内容/替换的内容/g（全局替换）
- 删除当前字符：按s
- 删除当前行：按dd 或 按shift + s
- 删除从当前行到末尾：先按d，再按shift + g
- 定位到文件末尾：按G
- 定位到文件开头：按gg
- 定位行首：按O
- 定位行尾：按$
- 定位到第n行：输入:n
- 光标移动到本屏中间：按ZZ

### 正常模式切换到插入模式
- i 在光标位置插入
- I 在光标所在行的第一个非空格处插入
- a 在光标的下一个位置插入
- A 在光标所在行的最后一个字符处插入
- o 在光标所在行的下一行处插入新行
- O 在光标所在行的上一行处插入新行
- r 替换光标所在处的字符一次
- R 持续替换光标所在处的字符，直到按下ESC

### 插入模式切换到正常模式
- 按esc键即切换 

### 正常模式切换到命令行模式
- :w    保存文件
- :q    退出
- :wq   保存文件并退出
- :w!   强制保存文件
- :q!   强制退出
- :wq!  强制保存文件并退出
- :w filename   另存为文件
- :x     若文件有更改，则保存后退出，否则直接退出
- :n1,n2 w filename   将n1行到n2行的数据另存为文件

### 应用示例
- 快速清除文件内容
  
  1、处于正常模式：按Esc键可以确保
  
  2、跳转到文件末尾：按G，光标将移动到文件最后一行
  
  3、删除到文件开头：按dgg，其中d是删除，gg是跳转到文件第一行。因此，会从当前位置(即文件末尾)删除到文件开头，清空整个文件
