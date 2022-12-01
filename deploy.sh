#!bin/bash

# 预设置变量
urls=(git@github.com:muzhidong/muzhidong.github.io.git)
names=(muzhidong.github.io)
branchs=(master)
target=deploy
time=`date +%Y-%m-%d/%H:%M:%S`
len=${#urls[@]}
((len--))

# 打包
yarn build

# 检查发布文件夹是否存在，不存在则创建，并进入该文件夹
if [ ! -d ./$target ];then
	mkdir ./$target
fi
cd ./$target

function func(){
	# 目标文件夹若不存在，则克隆远程仓库
	if [ ! -d ./$2 ];then
		git clone $1
	fi

	# 获取最新远程仓库代码
	cd ./$2
	git pull

	# 清空目标文件夹下除.git外的所有文件
	rm -rf `ls -a | egrep -v ^.git$`

	# 复制dist文件夹内容、.gitginore到目标文件夹下
	cp -ri ../../dist/ .
	cp ../../.gitignore .

	# push到远程仓库
	git add -A .
	git commit -m "blog update on $time"
	git push -u origin $3 --force

	# 回到上层deploy文件夹
	cd ..
}

for i in $len
	do
		func ${urls[$i]} ${names[$i]} ${branchs[$i]}
	done

# 后续处理
cd ..
git checkout .




