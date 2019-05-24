"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
exports.servicio_model = (sequelize) => {
    var servicio_model = sequelize.define('t_servicio', {
        serv_id: {
            type: sequelize_1.default.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        serv_nom: {
            type: sequelize_1.default.STRING(50),
            allowNull: true
        },
        serv_desc: {
            type: sequelize_1.default.TEXT
        }
    }, {
        timestamps: false,
        tableName: 't_servicio'
    });
    // Aqui se declaran las funciones de Modelo (o de clase)
    servicio_model.prototype.mostrarIdYNombre = function () {
        console.log(`ID => ${this.serv_id}`);
        console.log(`Nombre => ${this.serv_nom}`);
    };
    return servicio_model;
};
