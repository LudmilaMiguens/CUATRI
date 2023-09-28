"use strict";
exports.__esModule = true;
exports.administradorDePrestamos = void 0;
var fs = require("file-system");
var rs = require("readline-sync");
var administradorDePrestamos = /** @class */ (function () {
    function administradorDePrestamos() {
    }
    administradorDePrestamos.convertirPrestamos = function () {
        try {
            var prestamo = fs.readFileSync("./listaDePrestamos.json", { encoding: "utf-8" });
            console.log("Lectura de datos sagtifatoria");
            rs.keyInPause("\n");
            return JSON.parse(prestamo);
        }
        catch (error) {
            console.log("Error inesperado", error);
        }
    };
    administradorDePrestamos.agregarPrestamo = function (prestamo) {
        try {
            fs.writeFileSync("./listaDePrestamos.json", JSON.stringify(prestamo), { encoding: "utf8" });
            console.log("Operacion completa\n");
            rs.keyInPause("\n");
        }
        catch (error) {
            console.log("Sucedio un error:", error);
            rs.keyInPause("\n");
        }
    };
    return administradorDePrestamos;
}());
exports.administradorDePrestamos = administradorDePrestamos;
