# description of homework
Зробити REST API на Express для керування завданнями, де всі дані зберігаються у файлі tasks.json. 
API має повністю працювати з цим файлом: при кожній зміні — перезапис, при кожному читанні — зчитування з файлу.

Структура завдання (одне завдання у файлі):

{
"id": 1,
"title": "Learn Express",
"description": "Understand how routing and middleware work",
"status": "todo",
"createdAt": "2025-04-06T14:12:00Z"
}



Що реалізувати:

Зберігання у файлі
-Використовуй fs.promises (fs.readFile, fs.writeFile)
-Файл: ./data/tasks.json
-Читай перед кожною операцією, перезаписуй після змін

Валідація
-title — обов’язкове, мінімум 3 символи
-status — одне з "todo", "in-progress", "done"

Middleware логування
-Записуй метод, шлях і час запиту в консоль

Error handling
-Якщо id не знайдено — 404 Not Found
-Якщо валідація не проходить — 400 Bad Request

Бонус-фічі:
-GET /tasks?status=done — фільтрація по статусу
-GET /tasks/sorted?by=createdAt — сортування
-Створи PATCH /tasks/:id/status — оновлення тільки статусу