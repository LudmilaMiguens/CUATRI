"use strict";
exports.__esModule = true;
exports.AdministradorDePrestamos = void 0;
var rs = require("readline-sync");
var biblioteca_1 = require("./biblioteca");
var cliente_1 = require("./cliente");
var libro_1 = require("./libro");
var revista_1 = require("./revista");
var prestamo_1 = require("./prestamo");
var _1 = require(".");
// Creacion de biblioteca
var biblioteca1 = new biblioteca_1.Biblioteca("AS", "25 de mayo");
// Crearcion de elementos
var libro1 = new libro_1.Libro("Casita", "Cosito", 1896);
var revista1 = new revista_1.Revista("Gente", "Mimina", 2023);
// Creacion de clientes
var cliente1 = new cliente_1.Cliente("Ludmila", "Miguens", "uriburu", 289355);
var cliente2 = new cliente_1.Cliente("Ludmilaaaaa", "Miguens", "uriburu", 289355);
// Creacion del prestamo
var prestamo1 = new prestamo_1.Prestamos(cliente1, libro1);
// Agregamos los clientes a la biblioteca.
//biblioteca1.addCliente(cliente1);
//biblioteca1.addCliente(cliente2);
// Agregamos los elementos a la biblioteca.
//biblioteca1.addElemento(libro1);
//biblioteca1.addElemento(revista1);
// Realizamos un prestamo.
//biblioteca1.addPrestamos(cliente1,libro1);
//biblioteca1.addPrestamos(cliente2,revista1);
//biblioteca1.addPrestamos(cliente1,libro1); // No se puede realizar ya que esta prestado el libro.
//console.log(biblioteca1.listadoPrestamos());
// Devolver el elemento.4
var fechaDevolucion = new Date();
fechaDevolucion.setDate(fechaDevolucion.getDate() + 12); // A la fecha le sumamos 9 dias
biblioteca1.devolverElemento(libro1, cliente1, fechaDevolucion); // Suma 3 puntos
//console.log(biblioteca1.listadoPrestamos());
biblioteca1.addPrestamos(cliente1, libro1); // El usuario esta penalizado, no puede retirar un elemento
//let fechaDevolucion1 = new Date();
//biblioteca1.addPrestamos(cliente1,libro1);
//fechaDevolucion1.setDate(fechaDevolucion1.getDate() +2);
//biblioteca1.devolverElemento(libro1,cliente1, fechaDevolucion1); // resta 1 punto
// Mostramos la lista de clientes.
//biblioteca1.listaClientes();
// Eliminar cliente de la biblioteca.
//biblioteca1.eliminarCliente(cliente1); 
//biblioteca1.listaClientes();
// Mostramos la lista de elementos.
//console.log(biblioteca1.listaElementos());
//biblioteca1.eliminarElementos(revista1);
//Eliminamos un elemento de la biblioteca.
//console.log(biblioteca1.listaElementos());
var AdministradorDePrestamos = /** @class */ (function () {
    function AdministradorDePrestamos() {
        this.opcionesMenu = [
            "Crear un prestamo",
            "Modificar un prestamo",
            "Borrar un prestamo",
            "Lista de prestamos activos"
        ];
        this.prestamos = [];
    }
    AdministradorDePrestamos.prototype.leerPrestamos = function () {
        var resultado = _1.AdministradorDeArchivos.leerArchivos();
        if (resultado) {
            this.prestamos = resultado;
            console.log("*** Prestamos ***");
            if (this.prestamos.length === 0) {
                console.log("No hay prestamos.");
            }
            else {
                this.prestamos.forEach(function (prestamo) {
                    console.log("ID: ", prestamo.getId(), "Ciente: ", prestamo.getCliente(), "Elemento prestado: ", prestamo.getElementos(), "Fecha de inicio: ", prestamo.getFechaInicio(), "Fecha de devolucion: ", prestamo.getVencimiento(), "*********************");
                });
            }
        }
        rs.keyInPause("\n");
    };
    AdministradorDePrestamos.prototype.crearPrestamo = function () {
        console.log("**** Crear Prestamo ****");
        var leerPrestamo = _1.AdministradorDeArchivos.leerArchivos();
        if (leerPrestamo) {
            this.prestamos = leerPrestamo;
        }
        var nombre = rs.question("Ingrese su nombre: ");
        var apellido = rs.question("Ingrese su apellido: ");
        var direccion = rs.question("Ingrese su direccion: ");
        var cel = rs.questionInt("Ingrese su celular: ");
        var newCliente = new cliente_1.Cliente(nombre, apellido, direccion, cel);
        var consulta = rs.keyInYN("Retira un libro??");
        rs.keyInPause();
        if (consulta) {
            var titulo = rs.question("Ingrese el titulo: ");
            var autor = rs.question("Ingrese el autor: ");
            var año = rs.questionInt("Ingrese el año: ");
            var newLibro = new libro_1.Libro(titulo, autor, año);
            var newPrestamo = new prestamo_1.Prestamos(newCliente, newLibro);
            this.prestamos.push(newPrestamo);
            rs.keyInPause();
            _1.AdministradorDeArchivos.agregarPrestamo(this.prestamos);
            rs.keyInPause("");
        }
        else {
            var titulo = rs.question("Ingrese el titulo: ");
            var editorial = rs.question("Ingrese la editorial: ");
            var año = rs.questionInt("Ingrese el año: ");
            var newRevista = new revista_1.Revista(titulo, editorial, año);
            var newPrestamo = new prestamo_1.Prestamos(newCliente, newRevista);
            this.prestamos.push(newPrestamo);
            rs.keyInPause();
            _1.AdministradorDeArchivos.agregarPrestamo(this.prestamos);
            rs.keyInPause("");
        }
    };
    AdministradorDePrestamos.prototype.borrarPrestamo = function () {
        console.log("**** Borrar Prestamo ****");
        var leerPrestamo = _1.AdministradorDeArchivos.leerArchivos();
        if (leerPrestamo) {
            this.prestamos = leerPrestamo;
        }
        rs.keyInPause("");
        var idParaModificar = rs.question("Ingrese el id del prestamo a modificar: ");
        console.log("Prestamos ", this.prestamos);
        var registro = this.prestamos.findIndex(function (prestamos) { return prestamos.getId() === idParaModificar; });
        if (registro !== -1) {
            var grabarActualizacion = this.prestamos[registro];
            var confirmacion = rs.keyInYN("Quieres eliminar este prestamo?"); // que muestre el prestamo que encontro
            if (confirmacion) {
                this.prestamos.splice(registro, 1);
                _1.AdministradorDeArchivos.agregarPrestamo(this.prestamos);
            }
            else {
                console.log("Se cancelo la eliminacion del prestamo ");
            }
        }
        else {
            console.log("Prestamo no existente ");
        }
        rs.keyInPause();
    };
    AdministradorDePrestamos.prototype.modificarPrestamo = function () {
        console.log("**** Modificar Prestamo ****");
        var leerPrestamo = _1.AdministradorDeArchivos.leerArchivos();
        if (leerPrestamo) {
            this.prestamos = leerPrestamo;
        }
        rs.keyInPause("");
        var idParaModificar = rs.question("Ingrese el id del prestamo a modificar: ");
        var registro = this.prestamos.findIndex(function (prestamo) { return prestamo.getId() === idParaModificar; });
        if (registro !== -1) {
            var grabarActualizacion = this.prestamos[registro];
            var confirmacion = rs.keyInYN("Quieres actualizar?");
            if (confirmacion) {
                var newCliente = rs.question("Ingrese su nombre: ");
                var newElemento = rs.question("Ingrese el nombre del elemento: ");
                grabarActualizacion.getCliente().setNombre(newCliente);
                grabarActualizacion.getElementos().setTitulo(newElemento);
                _1.AdministradorDeArchivos.agregarPrestamo(this.prestamos);
            }
            else {
                console.log("Actualizacion cancelada ");
            }
        }
        else {
            console.log("El prestami no existe ");
        }
        rs.keyInPause();
    };
    AdministradorDePrestamos.prototype.menu = function () {
        while (true) {
            console.clear(); // Limpia la consola
            var eleccion = rs.keyInSelect(this.opcionesMenu); // Con keyInSelect seleccionamos la opcion que elege el cliente
            switch (eleccion) {
                case 0:
                    this.crearPrestamo();
                    break;
                case 1:
                    this.modificarPrestamo();
                    break;
                case 2:
                    this.borrarPrestamo();
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
exports.AdministradorDePrestamos = AdministradorDePrestamos;
var menu1 = new AdministradorDePrestamos();
menu1.menu();
