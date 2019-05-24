"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
exports.cancha_servicio_model = (sequelize) => {
    var cancha_servicio_model = sequelize.define('t_canchaservicio', {
        canchaserv_id: {
            type: sequelize_1.default.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        canchaserv_cost: {
            type: sequelize_1.default.DECIMAL(5, 2),
            allowNull: false
        },
    }, {
        timestamps: false,
        tableName: 't_canchaservicio'
    });
    // aqui se declaran las funcions de Modelo o de la clase
    return cancha_servicio_model;
};
