"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
exports.verificarToken = (token) => {
    try {
        let data = jwt.verify(token, 'melgar', { algorithm: 'RS256' });
        return data;
    }
    catch (err) {
        console.log(err.message);
        return null;
    }
};
exports.wachiman = (req, res, next) => {
    // console.log(req.headers.authorization);
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        if (exports.verificarToken(token)) {
            next();
        }
        else {
            let response = {
                message: 'error',
                content: 'Error en el token'
            };
            res.status(401).json(response);
        }
        ;
    }
    else {
        let response = {
            message: 'unauthorize',
            content: 'No esta autorizado para realizar esta solicitud'
        };
        res.status(401).json(response);
    }
};
