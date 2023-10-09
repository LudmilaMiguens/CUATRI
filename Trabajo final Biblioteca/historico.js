"use strict";
exports.__esModule = true;
exports.Historico = void 0;
var node_crypto_1 = require("node:crypto");
var Historico = /** @class */ (function () {
    function Historico() {
        this.historico = [];
    }
    Historico.prototype.addRegistro = function (estado, elemento) {
        var registro = {
            id: (0, node_crypto_1.randomUUID)(),
            estado: estado,
            elemento: elemento
        };
        this.historico.push(registro);
    };
    Historico.prototype.getHistorico = function () {
        return this.historico;
    };
    Historico.prototype.mostrarHistorico = function () {
        console.log("HISTORIAL DE PRESTAMOS");
        this.historico.forEach(function (registro, index) {
            console.log("Registro:", index + 1);
            console.log("ID:", registro.id);
            console.log("Estado:", registro.estado);
            console.log("Elemento:", registro.elemento);
        });
    };
    return Historico;
}());
exports.Historico = Historico;
