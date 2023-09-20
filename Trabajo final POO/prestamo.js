"use strict";
exports.__esModule = true;
exports.Prestamos = void 0;
var node_crypto_1 = require("node:crypto");
var Prestamos = /** @class */ (function () {
    function Prestamos(cliente, elementos) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.cliente = cliente;
        this.elementos = elementos;
        this.fechaInicio = new Date();
        this.fechaVencimiento = new Date();
        this.fechaVencimiento.setDate(this.fechaInicio.getDate() + 7);
    }
    Prestamos.prototype.getId = function () {
        return this.id;
    };
    Prestamos.prototype.getCliente = function () {
        return this.cliente;
    };
    Prestamos.prototype.getElementos = function () {
        return this.elementos;
    };
    Prestamos.prototype.getFechaInicio = function () {
        return this.fechaInicio;
    };
    Prestamos.prototype.getVencimiento = function () {
        return this.fechaVencimiento;
    };
    return Prestamos;
}());
exports.Prestamos = Prestamos;
