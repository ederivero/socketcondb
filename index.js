"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./api/utils/server");
/*
//importando las rutas
import { servicio_router } from './api/routes/servicio';
import { cancha_router } from './api/routes/cancha';
import { sequelize } from './api/config/sequelize';
import { registro_router } from './api/routes/registro';
import { auth_router } from './api/routes/auth';
import { NextFunction,Request,Response } from 'express';
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Configuracion del bodyParsedr
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PUERTO = process.env.PORT || 3000;

//CONFIGURANDO EL CORS
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.header('Access-Control-Allow-Origin','*');// Cualquier dominio puede acceder al api
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization');// Tipo de cabeceras que acepta
    res.header('Access-Control-Allow-Methods','GET, POST'); // Metodo por cual va a ser invocado
    res.header('Allow','GET, POST');// Asociado con el anterior
    next();
});

// Usando las rutas importadas "/api" es el prefijo
app.use('/api', servicio_router);
app.use('/api', cancha_router);
app.use('/api', registro_router);
app.use('/api', auth_router);

app.listen(PUERTO, function () {
    console.log('Servidor corriendo correctamente en el puerto 3000');
    //force=> true. cada vez que el proyecto inicie se va a eliminar todas las tablas contenido y relaciones que tengan para crearse nuevamente
    //force=>false cada vez que el proyecto inicie no elimine ninguna tabla de la base de datos, sin embargo si tenemos uan tabla recientemente creada, la funcion sync la crea en la base de datos
    sequelize.sync({ force: false }).then(() => {
        console.log('Base de datos creada con exito');
    }).catch((error: any) => {
        console.log(error);
        console.log('Error al crear la base de datos');
    })
});
*/
let servidorSocket = new server_1.Server();
servidorSocket.start();
