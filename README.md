### Запуск

1. Перейти в папку front, выполнить установку пакетов

    ```
    npm install
    ```
   
1. Выполнить сборку

    ```
    npm build
    ```

1. Поднять контейнеры. Для этого перейти в корневую папку проекта и выполнить:

    ```
    docker-compose up
    ```

1. Накатить миграции:

    ```
    docker exec -it english-cards-with-backend_php_1 \
    php /service/bin/console doctrine:migrations:migrate
    ```

1. Прописать в /etc/hosts

    ```
    192.168.200.2 eng-cards.local
    192.168.200.3 api.eng-cards.local
    ```