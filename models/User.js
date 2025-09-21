const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true // Permite null para usuários que fazem login pelo Google
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
})

module.exports = User
