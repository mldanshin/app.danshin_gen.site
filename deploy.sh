#!/usr/bin/env bash

#Перед первым deploy выполни!
#Создай файл sudo nano /etc/systemd/system/danshin_gen_site.service
#и скопируй туда текст из файла danshin_gen_site.service,
#который находится в корне проекта.
#Перезагрузи systemctl - sudo systemctl daemon-reload.
#Добавь в автозапуск - systemctl enable danshin_gen_site.

echo "Погнали..."

rm -rf storage/logs/app.log
    
rm -rf ../gen-site
cp -a ../site ../gen-site

cd ../gen-site
rm -rf node_modules
rm -rf package-lock.json
rm -rf .git
rm -rf .next

rm .env.local
cp .env.production .env
rm .env.production

cd ../

tar -cf gen-site.tar gen-site

ssh root@194.34.239.72 "systemctl stop danshin_gen_site"

scp gen-site.tar root@194.34.239.72:/var/www
ssh root@194.34.239.72 mkdir /var/www/app
ssh root@194.34.239.72 mkdir /var/www/app/danshin_gen
ssh root@194.34.239.72 rm -r /var/www/app/danshin_gen/site
ssh root@194.34.239.72 tar -C /var/www/app -xvf /var/www/gen-site.tar
ssh root@194.34.239.72 rm -rf /var/www/gen-site.tar
ssh root@194.34.239.72 mv /var/www/app/gen-site /var/www/app/danshin_gen/site

echo "Запустил npm install..."
ssh root@194.34.239.72 "cd /var/www/app/danshin_gen/site && /usr/bin/npm install"
ssh root@194.34.239.72 "cd /var/www/app/danshin_gen/site && /usr/bin/npm run build"
ssh root@194.34.239.72 "sudo systemctl start danshin_gen_site"
ssh root@194.34.239.72 "sudo systemctl status danshin_gen_site"

rm -rf gen-site.tar
rm -rf gen-site

echo "Успешно завершено!"
