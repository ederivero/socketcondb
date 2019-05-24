"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//PLAYA ROUTER
const cancha_1 = require("../controllers/cancha");
const express_1 = require("express");
exports.cancha_router = express_1.Router();
// cancha_router.get('/cancha/:cancha_id/getslots', wachiman, Cancha_controller.getSlotsByCanchaId);
exports.cancha_router.get('/cancha/:cancha_id/getslots', cancha_1.Cancha_controller.getSlotsByCanchaId);
exports.cancha_router.get('/cancha/', cancha_1.Cancha_controller.getAllCancha);
