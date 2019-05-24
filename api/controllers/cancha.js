"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
const sequelize = require("sequelize");
//import { Servicio } from '../config/sequelize';
exports.Cancha_controller = {
    /**
     * Funcion para obtener todos los especios o slots dado el id de la Cancha
     */
    getSlotsByCanchaId: (req, res) => {
        const { cancha_id } = req.params;
        sequelize_1.Cancha.findAll({
            where: { cancha_id },
            include: [{
                    model: sequelize_1.SlotCancha
                }]
        }).then((respuesta) => {
            let response = {
                message: 'Ok',
                content: respuesta
            };
            res.status(200).json(response);
        });
    },
    getAllCancha: (req, res) => {
        const Op = sequelize.Op;
        sequelize_1.Cancha.findAll({
            include: [{
                    model: sequelize_1.SlotCancha,
                }]
        }).then((respuesta) => {
            let response = {
                message: 'Ok',
                content: respuesta
            };
            res.status(200).json(response);
        });
    }
};
