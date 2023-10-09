"use strict";
exports.__esModule = true;
exports.AdministradorDeArchivos = void 0;
var fs = require("node:fs");
var rs = require("readline-sync");
//sistema de archivos.
//clase autilitaria, tiene solo metodos, no genera objetos.
var AdministradorDeArchivos = /** @class */ (function () {
    function AdministradorDeArchivos() {
    }
    //Metodo para agregar los prestamos al archivo Json
    AdministradorDeArchivos.agregarPrestamo = function (data) {
        try {
            fs.writeFileSync("./listaDePrestamos.json", JSON.stringify(data), { encoding: "utf-8" });
        }
        catch (error) {
            console.log("Sucedio un error", error);
            rs.keyInPause("\n");
        }
    };
    return AdministradorDeArchivos;
}());
exports.AdministradorDeArchivos = AdministradorDeArchivos;
