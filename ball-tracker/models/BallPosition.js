const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const BallPosition = sequelize.define('BallPosition', {
    x: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    y: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    z: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = BallPosition;
