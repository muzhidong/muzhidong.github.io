#!bin/bash

# 预设置变量
userName=mudong
userEmail=
urls=(https://github.com/muzhidong/muzhidong.github.io.git)
branch=master
target=deploy
time=`date +%Y-%m-%d/%H:%M:%S`
# echo "$userName $userEmail $urls $branch $target $time"

# 打包
yarn build

# 初始化仓库并提交上传
if [ -d ./$target ];then
	rm -rf $target
fi

mkdir $target
cd ./$target

git init
git config user.name $userName
git config user.email $userEmail

cp -ri ../dist/ .

function func(){
 	git add -A .
	git commit -m "blog update on $time"
	git remote add origin $1
	git pull
	git push -u origin $branch --force
}

for url in $urls
	do
		func $url
	done

cd ..
rm -rf ./$target
rm -rf ./dist



