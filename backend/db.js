// docker run --name trabalhoDB -p 3306:3306 -e MYSQL_ROOT_PASSWORD=258460 -d mysql:8.0.27

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:258460@localhost:3306/schema');

module.exports = sequelize;