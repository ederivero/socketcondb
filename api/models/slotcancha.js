"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
exports.slotCancha_model = (sequelize) => {
    var slotCancha_model = sequelize.define('t_slotCancha', {
        slotp_id: {
            type: sequelize_1.default.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        slotp_nro: {
            type: sequelize_1.default.INTEGER,
            allowNull: false
        },
        slotp_est: {
            type: sequelize_1.default.STRING(1),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 't_slotCancha'
    });
    // Aqui se declaran las funciones de Modelo(o de clase)
    return slotCancha_model;
};
