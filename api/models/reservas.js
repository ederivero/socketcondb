"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
exports.registro_model = (sequelize) => {
    var registro_model = sequelize.define('t_registro', {
        reg_id: {
            type: sequelize_1.default.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        reg_fechin: {
            type: sequelize_1.default.DATE
        },
        reg_fechfin: {
            type: sequelize_1.default.DATE
        },
        reg_est: {
            type: sequelize_1.default.STRING(45)
        },
        reg_monto: {
            type: sequelize_1.default.DECIMAL(5, 2)
        }
    }, {
        timestamps: false,
        tableName: 't_registro'
    });
    // Aquí se declaran las funciones de Modelo(o de clase)
    return registro_model;
};
