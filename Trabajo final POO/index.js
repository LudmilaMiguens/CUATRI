"use strict";
exports.__esModule = true;
var fs = require("node:fs");
var rs = require("readline-sync");
//sistema de archivos.
var AdministradorDeArchivos = /** @class */ (function () {
    function AdministradorDeArchivos() {
    }
    AdministradorDeArchivos.leerArchivos = function () {
        try {
            var prestamos = fs.readFileSync("./listaDePrestamos.json", { encoding: "utf-8" });
            console.log(("Lectura de datos perfecta"));
            return JSON.parse(prestamos); // JSON.parse devuelve los datos al estado original
        }
        catch (error) {
            console.log("Sucedio un error: ", error);
        }
        rs.keyInPause("\n");
    };
    return AdministradorDeArchivos;
}());
var AdministradorDePrestamos = /** @class */ (function () {
    function AdministradorDePrestamos() {
        this.opcionesMenu = [
            "Crear usuario",
            "Retirar un elemento",
            "Devolver un elemento",
            "Lista de prestamos activos"
        ];
        this.prestamos = [];
    }
    AdministradorDePrestamos.prototype.leerPrestamos = function () {
        var resultado = AdministradorDeArchivos.leerArchivos();
        if (resultado) {
            this.prestamos = resultado;
            console.log("*** Prestamos ***");
            if (this.prestamos.length === 0) {
                console.log("No hay prestamos.");
            }
            else {
                this.prestamos.forEach(function (prestamo) {
                    console.log("ID: ", prestamo.getId(), "Ciente: ", prestamo.getCliente(), "Elemento prestado: ", prestamo.getElementos(), "Fecha de inicio: ", prestamo.getFechaInicio(), "Fecha de devolucion: ", prestamo.getVencimiento(), "****");
                });
            }
        }
        rs.keyInPause("\n");
    };
    AdministradorDePrestamos.prototype.crearusuario = function () {
        console.log("Crear usuario");
    };
    AdministradorDePrestamos.prototype.retirarElemento = function () {
        console.log("Retiro excelente");
    };
    AdministradorDePrestamos.prototype.devolverElemento = function () {
        console.log("Devolucion excelente");
    };
    AdministradorDePrestamos.prototype.menu = function () {
        while (true) {
            console.clear(); // Limpia la consola
            var eleccion = rs.keyInSelect(this.opcionesMenu); // Con keyInSelect seleccionamos la opcion que elege el cliente
            switch (eleccion) {
                case 0:
                    this.crearusuario();
                    break;
                case 1:
                    this.retirarElemento();
                    break;
                case 2:
                    this.devolverElemento();
                    break;
                case 3:
                    this.leerPrestamos();
                    break;
                default:
                    console.log("Gracias por elegirnos, hasta luego!!!");
                    return;
            }
        }
    };
    return AdministradorDePrestamos;
}());
var menu1 = new AdministradorDePrestamos();
menu1.menu();
