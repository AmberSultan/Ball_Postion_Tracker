const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ball_tracker', 'root', 'JBw@@~?C5An9#xx', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
