"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
exports.auth_controller = {
    /**
     * Funcion para registrar un Cliente
     * se reciben los parametros por el BODY metodo POST
     */
    register: (req, res) => {
        let { cli_email, cli_pass } = req.body;
        sequelize_1.Cliente.findAll({
            where: {
                cli_email
            }
        }).then((Clientes) => {
            if (Clientes.length === 0) {
                //intanciando un objeto del modelo Cliente
                let objCliente = sequelize_1.Cliente.build(req.body);
                objCliente.setSaltAndHash(cli_pass);
                objCliente.save().then((Cliente) => {
                    let token = Cliente.generateJWT();
                    if (Cliente && token) {
                        let response = {
                            message: 'Ok',
                            token
                        };
                        res.status(201).json(response);
                    }
                    else {
                        let response = {
                            message: 'ERROR',
                            content: 'Error al crear Cliente y/o token'
                        };
                        res.status(500).json(response);
                    }
                });
            }
            else {
                let response = {
                    message: 'ERROR',
                    content: `El Cliente con email ${cli_email} ya existe`
                };
                res.status(500).json(response);
            }
        });
    },
    login: (req, res) => {
        let { cli_email, cli_pass } = req.body;
        console.log(cli_email, cli_pass);
        sequelize_1.Cliente.findOne({
            where: {
                cli_email
            }
        }).then((objUsu) => {
            if (objUsu) {
                if (objUsu.validPassword(cli_pass)) {
                    let token = objUsu.generateJWT();
                    let response = {
                        message: 'OK',
                        token,
                        id: objUsu.cli_id,
                        content: `Bienvenido ${objUsu.cli_nom} ${objUsu.cli_ape}`
                    };
                    res.status(200).json(response);
                }
                else {
                    let response = {
                        message: 'ERROR',
                        content: `El Cliente o la password incorrecta`
                    };
                    res.status(500).json(response);
                }
            }
            else {
                let response = {
                    message: 'ERROR',
                    content: `El Cliente o password incorrecta.`
                };
                res.status(500).json(response);
            }
        });
    }
};
