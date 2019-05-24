"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
//import { Servicio } from '../config/sequelize';
exports.servicio_controller = {
    getAll: (req, res) => {
        //Servicio.findAll().then((servicios:any)=>{
        //    console.log(servicios);
        //}).catch(()=>{
        //    console.log("Error al procesar la consulta");
        //})
        //res.send('Soy el home del servicio');
        sequelize_1.Servicio.findAll().then((servicios) => {
            //CODIGO DE PRUEBA
            servicios.forEach((servicio) => {
                servicio.mostrarIdYNombre();
            });
            //CODIGO DE PRUEBA
            let response = {
                message: 'Ok',
                content: servicios
            };
            res.status(404).json(response);
        }).catch((error) => {
            console.log(error);
        });
    },
    create: (req, res) => {
        /*
        let { serv_nom, serv_desc } = req.body;
        let objServicio = {
            serv_nom,
            serv_desc
        };
        */
        // tiene que coindir los campos
        sequelize_1.Servicio.create(req.body).then((servicioCreado) => {
            if (servicioCreado) {
                let response = {
                    message: 'Created',
                    content: servicioCreado
                };
                res.status(201).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: null
                };
                res.status(500).json(response);
            }
        });
    },
    getById: (req, res) => {
        sequelize_1.Servicio.findByPk(req.params.serv_id).then((servicio) => {
            if (servicio) {
                let response = {
                    message: 'Found',
                    content: servicio
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Not Found',
                    content: null
                };
                res.status(200).json(response);
            }
        });
    },
    dropById: (req, res) => {
        sequelize_1.Servicio.destroy({ where: { serv_id: req.params.serv_id } }).then((cantidad) => {
            if (cantidad > 0) {
                let response = {
                    message: 'Eliminado',
                    content: cantidad
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: null
                };
                res.status(200).json(response);
            }
        });
    },
    update: (req, res) => {
        // tiene que coindir los campos
        sequelize_1.Servicio.update(req.body, { where: { serv_id: req.params.serv_id } }).then((cantidad) => {
            if (cantidad > 0) {
                let response = {
                    message: 'Actualizado',
                    content: cantidad
                };
                res.status(201).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: null
                };
                res.status(500).json(response);
            }
        });
    },
};
