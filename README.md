
open -a Docker

# Собрать и запустить все сервисы
docker-compose up --build

# Запустить в фоне
docker-compose up -d --build

# Остановить
docker-compose down

# Посмотреть логи
docker-compose logs -f

# Перезапустить только сервер
docker-compose restart server