const Sequelize = require('sequelize');
const database = require('./db');

const Todos = database.define('Todos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: database.literal('NOW()')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: database.literal('NOW()')
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Todos;