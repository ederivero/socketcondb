"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reservas {
    constructor() {
        this.lista = [];
    }
    add(Reserva) {
        this.lista.push(Reserva);
    }
    getReserva() {
        return this.lista;
        //return this.lista.filter(Reserva=>Reserva.usu_id!='sin-nombre');
    }
    remove(id) {
        this.lista = this.lista.filter(Reserva => Reserva.id != id);
    }
    update(objReserva) {
        this.lista.forEach((Reserva) => {
            if (Reserva.id === objReserva.id) {
                Reserva.usu_id = objReserva.usu_id;
            }
        });
    }
    getReservaById(id) {
        for (let i = 0; i < this.lista.length; i++) {
            if (this.lista[i].id === id) {
                return this.lista[i];
            }
        }
    }
}
exports.Reservas = Reservas;
