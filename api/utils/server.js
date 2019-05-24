"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const reserva_1 = require("../clasesSocket/reserva");
const reservas_1 = require("../clasesSocket/reservas");
// BD
const servicio_1 = require("../routes/servicio");
const cancha_1 = require("../routes/cancha");
const sequelize_1 = require("../config/sequelize");
const registro_1 = require("../routes/registro");
const auth_1 = require("../routes/auth");
class Server {
    /**
     *
     */
    constructor() {
        this.reservas = new reservas_1.Reservas();
        this.bodyParser = require('body-parser');
        // Inicializo la variable express
        this.app = express_1.default();
        this.configurarCORS();
        // A la variable httpServer le paso la configuracion de express
        this.httpServer = new http_1.default.Server(this.app);
        // Por ultimo a socketIo le paso la configuracion de httpServer que le asigne anteriormente la configuracion
        // de express
        this.io = socket_io_1.default(this.httpServer);
        this.puerto = process.env.PORT || 3000;
        this.configurarBodyParser();
        this.asignarRutas();
        this.configuararRutasBD();
        this.escucharSockets();
    }
    configurarBodyParser() {
        var bodyParser = require('body-parser');
        //Configuracion del bodyParsedr
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    configuararRutasBD() {
        this.app.use('/api', servicio_1.servicio_router);
        this.app.use('/api', cancha_1.cancha_router);
        this.app.use('/api', registro_1.registro_router);
        this.app.use('/api', auth_1.auth_router);
    }
    configurarCORS() {
        //CONFIGURANDO EL CORS
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // Cualquier dominio puede acceder al api
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Tipo de cabeceras que acepta
            res.header('Access-Control-Allow-Methods', 'GET, POST'); // Metodo por cual va a ser invocado
            res.header('Allow', 'GET, POST'); // Asociado con el anterior
            next();
        });
    }
    escucharSockets() {
        console.log('Escuchando los sockets');
        this.io.on('connect', (reserva) => {
            // reserva.id es la LLAVE UNICA QUE IDENTIFICA;
            let objReserva = new reserva_1.Reserva(reserva.id);
            this.reservas.add(objReserva);
            console.log('Nueva lista de reservas =>');
            console.log(this.reservas.getReserva());
            reserva.on('disconnect', () => {
                console.log(`El cliente ${reserva.id} se desconecto`);
                this.reservas.remove(reserva.id);
                this.io.emit('retorno-usuarios', this.reservas.getReserva());
            });
            reserva.on('configurar-reserva', (data) => {
                let objReserva = new reserva_1.Reserva(reserva.id);
                objReserva.usu_id = data;
                this.reservas.update(objReserva);
                console.log('Nueva lista de reservass =>');
                console.log(this.reservas.getReserva());
                this.io.emit('retorno-usuarios', this.reservas.getReserva());
            });
            reserva.on('lista-reservas', () => {
                this.io.emit('retorno-reservas', this.reservas.getReserva());
            });
            reserva.on('enviar-reserva', (reservam) => {
                let objReserva = this.reservas.getReservaById(reserva.id);
                let content = {
                    reservam,
                    nombre: objReserva.usu_id
                };
                this.io.emit('nueva-reserva', content);
            });
        });
    }
    asignarRutas() {
        this.app.get('/', (req, res) => { res.send('Buenas'); });
        this.app.post('/enviar-mensaje', (req, res) => {
            let { para, mensaje, de } = req.body;
            let content = {
                mensaje,
                nombre: de
            };
            this.io.to(para).emit('nuevo-mensaje', content); // El socket dispara un evento al usuario que tenga el id PARA y emitir un evento nuevo-mensaje
            res.status(200).send('');
        });
    }
    start() {
        this.httpServer.listen(this.puerto, () => {
            console.log('Servidor corriendo exitosamente en el puerto ' + this.puerto);
            sequelize_1.sequelize.sync({ force: false }).then(() => {
                console.log('Base de datos creada con exito');
            }).catch((error) => {
                console.log(error);
                console.log('Error al crear la base de datos');
            });
        });
    }
}
exports.Server = Server;
