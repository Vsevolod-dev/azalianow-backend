# azalianow-backend
Server use json file for store data.

## Installation:
 - create .env file with PORT
 - npm i  - for package installation
 - npm run dev  - for run in developer mode
 - npm run prod  - for run in production mode

## Routes:

- GET http://localhost:3001/messages HTTP/1.1

Response:
[
  {
    "id": 1,
    "text": "Privet123",
    "author": "Kirill"
  },
  {
    "id": 2,
    "text": "Privet1423",
    "author": "Kirill"
  }
]

- POST http://localhost:3001/messages/add HTTP/1.1
content-type: application/json

body: {
    "text": "Hi"
}

- GET http://localhost:3001/numbers HTTP/1.1

Response:
[
  {
    "prev": 553,
    "current": 662,
    "average": 607.5
  },
  {
    "prev": 662,
    "current": 583,
    "average": 622.5
  }
]

- POST http://localhost:3001/numbers/add HTTP/1.1
content-type: application/json

body: {
    "number": 540
}

Requirements:   
Сервер на NodeJS должен работать в качестве файлового сервера (выдавать файлы для работы Frontend-части) и принимать/отдавать данные по API (3 эндпоинта):

1. POST для добавления нового сообщения
2. POST для отправки следующего числа и получения среднего между ним и предыдущим в ответ
3. GET для получения информации обо всех предыдущих числах и расчётах
