#!/bin/bash

DATE=$(date +%Y%m%d.%H%M)
cd ..
cd ./deploys
DEPLOY_DIR=`PWD`;
echo $DEPLOY_DIR
rm -rf $DATE
git clone --depth=1 -b master https://github.com/fangker/cyan-lottery.git $DATE

cd $DATE

cp -R ../../prod/ ./

rm -rf .git
#rm -rf apidoc
rm -rf test

#cd fn
#cnpm i
#npm run build:prod
#cd ../

cnpm i

npm run apidoc
npm run tsc

rm -rf node_modules
rm -rf coverage
rm -rf typings
rm -rf scripts
rm deploy*
rm -f *.md
rm -rf fn/node_modules

find . -type f -name "*.ts" -exec rm {} \;

FILE="$DATE.zip"
echo $FILE
cd  $DEPLOY_DIR
pwd
zip -r $FILE $DATE/*

# CMD="source /home/dtb/.bash_profile;cd /home/dtb/qqpetv3;unzip -q -o $FILE;rm $FILE;"

scp $FILE ins1:/root/deploys
