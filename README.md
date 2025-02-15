# Зависимости

Для работы приложения должны быть доступны сервисы:
1. danshin_gen API
2. danshin_id API
3. danshin_id Site
4. danshin_notice API

## Тестирование

Для тестирования нужны работающие сервисы:
1. danshin_gen API с тестовой базой данных (test_danshin_genealogy, если пустая запусти миграцию и сидеры php artisan migrate:fresh --seed --force)
2. danshin_id API - запуск java -jar app.jar --spring.profiles.active=dev
3. danshin_id Site
4. danshin_notice API

## Инструкция для user
1. Пройти регистрацию - https://id.danshin.net/register
2. Написать мне, я должен предоставить доступ
3. Настроить канал уведомлений (почта или телега) - https://gen.danshin.net/dates/notice
4. Можно выбрать время, людей, дни. По умолчанию включены все люди.
5. Не забыть нажать кнопку сохранить.

