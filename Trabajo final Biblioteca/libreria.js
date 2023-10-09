"use strict";
exports.__esModule = true;
exports.Libreria = void 0;
var node_crypto_1 = require("node:crypto");
//Clase madre para la creacion de los elementos
var Libreria = /** @class */ (function () {
    function Libreria(titulo, año) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.disponibilidad = true;
        this.titulo = titulo;
        this.año = año;
    }
    //Metodo para modificar datos
    Libreria.prototype.setTitulo = function (titulo) {
        this.titulo = titulo;
    };
    Libreria.prototype.setAño = function (año) {
        this.año = año;
    };
    Libreria.prototype.getTitulo = function () {
        return this.titulo;
    };
    Libreria.prototype.getAño = function () {
        return this.año;
    };
    //Muestra el estado del elemento
    Libreria.prototype.estaDisponible = function () {
        return this.disponibilidad;
    };
    Libreria.prototype.marcarNoDisponible = function () {
        this.disponibilidad = false;
    };
    Libreria.prototype.marcarDisponible = function () {
        this.disponibilidad = true;
    };
    return Libreria;
}());
exports.Libreria = Libreria;
