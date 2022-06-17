const Sequelize = require('sequelize');
const database = require('./db');

const Logs = database.define('Logs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    requisicao: {
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
    }
});

module.exports = Logs;