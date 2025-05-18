# Project Name

MySQL - Database for the hotel reservation system

## Description

This project is built with Node.js and Express for managing hotel operations.
It uses MySQL as the relational database to handle guests, room bookings, and availability. 
The API supports adding guests, booking rooms, checking available rooms for a specific date, 
and calculating hotel revenue per month.
Environment variables are managed through a .env file,
and Docker support is optionally included for easy deployment.

## Tech Stack
- Node.js
- Express.js
- MySQL
- Docker (optional)

## Getting Started

git clone https://github.com/TANINSAMXI/node_hw/tree/hw_25.git

cd project-name

npm install

cp .env.example .env


## Project Structure

src/
└── db.js
└── index.js
db/
└── book_income.sql
└── create_tables.sql
└── schema.dbml
└── seed_data.sql

## Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Create a pull request


## Author

- TANINSAMXI — www.linkedin.com/in/dmytro-pishchanyi-2a28a52b6
