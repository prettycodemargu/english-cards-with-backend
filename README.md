1. Запустить контейнеры. Перейти в папку проекта, выполнить:

    ```
    docker-compose up
    ```

1. Накатить миграции:

    ```
    ocker exec -it english-cards-with-backend_php_1 \
    php /service/bin/console doctrine:migrations:migrate
    ```

1. Прописать в /etc/hosts

    ```
    192.168.200.2 eng-cards.local
    192.168.200.3 api.eng-cards.local
    ```