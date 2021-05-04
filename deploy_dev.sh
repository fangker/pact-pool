#!/bin/bash

FILE="../dev_deploys/source.zip"


rm $FILE

zip -r -y $FILE . -x "deploy.sh" "deploy_dev.sh" "node_modules/*" "\.git/*" "\.idea/*" "logs/*" "run/*" "coverage/*" "app/public/apidoc/*"
scp $FILE tins1:/root/cyan-lottery/

CMD="
cd /root/cyan-lottery/source;
rm -rf database;
rm -rf app;
cd ..;
export NODE_ENV=development;
unzip -q -o ./source.zip -d ./source;
cd ./source;
rm -rf test;
echo 'dev' > config/env;
cnpm install;
npm run clean;
npm run apidoc;
npm run tsc;
find . -type f -name '*.ts' ! -path './node_modules/*' -exec rm {} \; &&
npx typeorm migration:run;
npx typeorm schema:sync;

npm run stop;
npm run start-dev;
"

ssh tins1 $CMD
