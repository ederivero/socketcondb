"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
var Sequelize = require('sequelize');
var moment = require('moment');
const Op = Sequelize.Op;
//import { Servicio } from '../config/sequelize';
exports.registro_controller = {
    /**
     * Funcion para obtener todos los especios o slots dado el id de la Cancha
     */
    getAllRegitrosBySlotId: (req, res) => {
        const { slotp_id } = req.params;
        sequelize_1.Registro.findAll({
            include: [{
                    model: sequelize_1.SlotCancha,
                    where: {
                        slotp_id: { [Op.between]: [2, 3] }
                    },
                    include: [{
                            model: sequelize_1.Cancha
                        }]
                }]
        }).then((respuesta) => {
            let response = {
                message: 'Ok',
                content: respuesta
            };
            res.status(200).json(response);
        });
    },
    /**
     * Obtener todos los registros de un '.slotp_id' dado un dia '.fecha'
     */
    getAllRegistrosByDateBySlotId: (req, res) => {
        const { dia, slotp_id } = req.params;
        const actual = moment().format(`${dia} 00:00:00`); // new Date(dia);
        const tomorrow = moment(actual).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        sequelize_1.Registro.findAll({
            where: {
                [Op.and]: [{ slotp_id },
                    {
                        reg_fechin: {
                            [Op.and]: {
                                [Op.gt]: actual,
                                [Op.lt]: tomorrow
                            }
                        }
                    }]
            },
            include: [{
                    model: sequelize_1.SlotCancha,
                    include: [{
                            model: sequelize_1.Cancha
                        }]
                }]
        }).then((respuesta) => {
            let response = {
                message: 'Ok',
                content: respuesta
            };
            res.status(200).json(response);
        });
    },
    AddRegistro: (req, res) => {
        let { reg_fechin, reg_fechfin, reg_est, reg_monto, slotp_id, usu_id } = req.body;
        console.log(req.body);
        sequelize_1.Registro.findAll({}).then((Registros) => {
            let objRegistro = sequelize_1.Registro.build(req.body);
            objRegistro.save().then((Registro) => {
                if (Registro) {
                    let response = {
                        message: 'Ok',
                        content: {
                            reg_fechin,
                            reg_fechfin,
                            slotp_id
                        }
                    };
                    res.status(201).json(response);
                }
                else {
                    let response = {
                        message: 'ERROR',
                        content: 'Error al crear Registro y/o token'
                    };
                    res.status(500).json(response);
                }
            });
        });
    },
    getAllRegistrosByUsuId: (req, res) => {
        const { usu_id } = req.params;
        sequelize_1.Registro.findAll({
            attributes: ['reg_fechin', 'reg_fechfin', 'slotp_id'],
            where: {
                usu_id
            }
        }).then((respuesta) => {
            let response = {
                message: 'Ok',
                content: respuesta
            };
            res.status(200).json(response);
        });
    },
};
