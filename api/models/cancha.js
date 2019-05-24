"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.cancha_model = (sequelize) => {
    var cancha_model = sequelize.define('t_cancha', {
        cancha_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cancha_nom: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: false
        },
        cancha_lat: {
            type: sequelize_1.DataTypes.DECIMAL(13, 7),
            allowNull: false
        },
        cancha_lng: {
            type: sequelize_1.DataTypes.DECIMAL(13, 7),
            allowNull: false
        },
        cancha_dir: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 't_cancha'
    });
    // Aqui se declaran las funciones de Modelo (o de clase)
    return cancha_model;
};
