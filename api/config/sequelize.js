"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cancha_1 = require("../models/cancha");
const canchaServicio_1 = require("../models/canchaServicio");
const cliente_1 = require("../models/cliente");
const reservas_1 = require("../models/reservas");
const servicio_1 = require("../models/servicio");
const slotcancha_1 = require("../models/slotcancha");
const Sequelize = require('sequelize');
exports.sequelize = new Sequelize('fCAq3YGXLQ', 'fCAq3YGXLQ', 'WMFApsuHCs', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    timezone: '-05:00',
    loggin: console.log()
});
exports.Cancha = cancha_1.cancha_model(exports.sequelize);
exports.CanchaServicio = canchaServicio_1.cancha_servicio_model(exports.sequelize);
exports.Servicio = servicio_1.servicio_model(exports.sequelize);
exports.Registro = reservas_1.registro_model(exports.sequelize);
exports.Cliente = cliente_1.cliente_model(exports.sequelize);
exports.SlotCancha = slotcancha_1.slotCancha_model(exports.sequelize);
//Crear entidades de diagrama Relacion
exports.CanchaServicio.belongsTo(exports.Cancha, { foreignKey: 'cancha_id' });
exports.CanchaServicio.belongsTo(exports.Servicio, { foreignKey: 'serv_id' });
exports.SlotCancha.belongsTo(exports.Cancha, { foreignKey: 'cancha_id' });
//Para retornar la relacion
exports.Cancha.hasMany(exports.SlotCancha, { foreignKey: 'cancha_id' });
exports.Registro.belongsTo(exports.SlotCancha, { foreignKey: 'slotp_id' });
exports.SlotCancha.hasMany(exports.Registro, { foreignKey: 'slotp_id' });
exports.Registro.belongsTo(exports.Cliente, { foreignKey: 'usu_id' });
