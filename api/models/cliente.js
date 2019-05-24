"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
exports.cliente_model = (sequelize) => {
    var cliente_model = sequelize.define('t_cliente', {
        cli_id: {
            type: sequelize_1.default.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cli_email: {
            type: sequelize_1.default.STRING(50)
        },
        cli_hash: {
            type: sequelize_1.default.TEXT
        },
        cli_salt: {
            type: sequelize_1.default.TEXT
        },
        cli_rol: {
            type: sequelize_1.default.STRING(1)
        },
        cli_nom: {
            type: sequelize_1.default.STRING(100)
        },
        cli_ape: {
            type: sequelize_1.default.STRING(100)
        },
        cli_tel: {
            type: sequelize_1.default.STRING(50)
        }
    }, {
        timestamps: false,
        tableName: 't_cliente'
    });
    // Aqui se declaran las funciones de Modelo (o de clase)
    cliente_model.prototype.setSaltAndHash = function (password) {
        this.cli_salt = crypto.randomBytes(16).toString('hex');
        this.cli_hash = crypto.pbkdf2Sync(password, this.cli_salt, 1000, 64, 'sha512').toString('hex');
    };
    cliente_model.prototype.validPassword = function (password) {
        let hash_temporal = crypto.pbkdf2Sync(password, this.cli_salt, 1000, 64, 'sha512').toString('hex');
        if (hash_temporal === this.cli_hash) {
            return true;
        }
        else {
            return false;
        }
    };
    cliente_model.prototype.generateJWT = function () {
        let payload = {
            cli_id: this.cli_id,
            cli_nom: this.cli_nom + ' ' + this.cli_ape
        };
        const algorithm = {
            algorithm: 'RS256'
        };
        const config = {
            expiresIn: '1H'
        };
        var token = jwt.sign(payload, 'melgar', config, algorithm);
        return token;
    };
    return cliente_model;
};
