# Project Name

Mongo - Database for an online store

## Description

This project is  built with Node.js, Express, and MongoDB to manage products, 
categories, and customer orders for an e-commerce system. It allows querying products by category, 
calculating total revenue from orders, updating stock quantities, and retrieving top-selling products. 
Docker and environment variable configuration are included for scalable and secure deployment.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Docker

## Getting Started

git clone https://github.com/TANINSAMXI/node_hw/tree/hw_26.git

cd project-name

npm install

cp .env.example .env

npm run dev

## Project Structure

src/
├── controllers/
│   ├── categoryController.js
│   ├── orderController.js
│   └── productController.js
├── models/
│   ├── category.js
│   ├── order.js
│   └── product.js
├── routes/
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── .env
├── app.js
├── Dockerfile
├── docker-compose.yml
└── seed.js

## Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Create a pull request

## Author

TANINSAMXI    www.linkedin.com/in/dmytro-pishchanyi-2a28a52b6