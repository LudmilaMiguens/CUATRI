"use strict";
exports.__esModule = true;
exports.Cliente = void 0;
var node_crypto_1 = require("node:crypto");
var Cliente = /** @class */ (function () {
    function Cliente(nombre, apellido, direccion, cel) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.puntos = 0;
        this.penalizacion = false;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.cel = cel;
    }
    Cliente.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Cliente.prototype.setApellido = function (apellido) {
        this.apellido = apellido;
    };
    Cliente.prototype.setDireccion = function (direccion) {
        this.direccion = direccion;
    };
    Cliente.prototype.setCel = function (cel) {
        this.cel = cel;
    };
    Cliente.prototype.getId = function () {
        return this.id;
    };
    Cliente.prototype.getNombre = function () {
        return this.nombre;
    };
    Cliente.prototype.getApellido = function () {
        return this.apellido;
    };
    Cliente.prototype.getDireccion = function () {
        return this.direccion;
    };
    Cliente.prototype.getCel = function () {
        return this.cel;
    };
    Cliente.prototype.getPuntos = function () {
        return this.puntos;
    };
    Cliente.prototype.addPuntos = function (puntos) {
        this.puntos += puntos;
    };
    Cliente.prototype.removePuntos = function (puntos) {
        this.puntos -= puntos;
    };
    return Cliente;
}());
exports.Cliente = Cliente;
