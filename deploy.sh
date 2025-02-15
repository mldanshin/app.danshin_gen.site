#!/usr/bin/env bash

#Перед первым deploy выполни!
#Создай файл sudo nano /etc/systemd/system/danshin_gen_site.service
#и скопируй туда текст из файла danshin_gen_site.service,
#который находится в корне проекта.
#Перезагрузи systemctl - sudo systemctl daemon-reload.
#Добавь в автозапуск - systemctl enable danshin_gen_site.

echo "Останови процесс: systemctl stop danshin_gen_site. Сделал? y/n"
read answer

if [ $answer == "y" ]; then
    rm -rf storage/logs/app.log
    
    rm -rf ../gen-site
    cp -a ../site ../gen-site

    cd ../gen-site
    rm -rf node_modules
    rm -rf package-lock.json

    rm .env
    cp .env.production .env
    rm .env.production

    cd ../

    tar -cf gen-site.tar gen-site
    
    scp gen-site.tar root@194.34.239.72:/var/www
    ssh root@194.34.239.72 mkdir /var/www/app
    ssh root@194.34.239.72 mkdir /var/www/app/danshin_gen
    ssh root@194.34.239.72 rm -r /var/www/app/danshin_gen/site
    ssh root@194.34.239.72 tar -C /var/www/app -xvf /var/www/gen-site.tar
    ssh root@194.34.239.72 rm -rf /var/www/app/gen-site.tar
    ssh root@194.34.239.72 mv /var/www/app/gen-site /var/www/app/danshin_gen/site

    rm -rf gen-site.tar
    rm -rf gen-site

    echo "Выполни на удалённом сервере команды! Перейди в каталог cd /var/www/app/danshin_gen/site. Сделал? y/n"
    read answer1
    if [ $answer1 == "y" ]; then
        echo "Выполни npm install. Сделал? y/n"
        read answer2
        if [ $answer2 == "y" ]; then
            echo "Выполни npm run build. Сделал? y/n"
            read answer3
            if [ $answer3 == "y" ]; then
                echo "Запусти процесс: systemctl start danshin_gen_site."
                echo "Успешно завершено!"
            else
                echo "Меня надо было слушать. Ты банкрот."
            fi
        else
            echo "Меня надо было слушать. Ты банкрот."
        fi
    else
        echo "Меня надо было слушать. Ты банкрот."
    fi
else
    echo "Останови и удали, а потом приходи"
fi

