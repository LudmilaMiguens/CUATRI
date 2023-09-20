"use strict";
exports.__esModule = true;
exports.Biblioteca = void 0;
var cliente_1 = require("./cliente");
var prestamo_1 = require("./prestamo");
var libro_1 = require("./libro");
var Biblioteca = /** @class */ (function () {
    function Biblioteca(nombre, domicilio) {
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.clientes = [];
        this.elementos = [];
        this.prestamos = [];
    }
    Biblioteca.prototype.getNombre = function () {
        return this.nombre;
    };
    Biblioteca.prototype.getDomicilio = function () {
        return this.domicilio;
    };
    Biblioteca.prototype.addCliente = function (cliente) {
        this.clientes.push(cliente);
    };
    Biblioteca.prototype.eliminarCliente = function (cliente) {
        var eliminarCliente = this.clientes.indexOf(cliente);
        if (eliminarCliente !== -1) {
            this.clientes.splice(eliminarCliente, 1);
            console.log("Cliente eliminado correctamente");
        }
    };
    Biblioteca.prototype.listaClientes = function () {
        console.log(this.clientes);
    };
    Biblioteca.prototype.addElemento = function (elemento) {
        this.elementos.push(elemento);
    };
    Biblioteca.prototype.eliminarElementos = function (elemento) {
        var eliminarElementos = this.elementos.indexOf(elemento);
        if (eliminarElementos !== -1) {
            this.elementos.splice(eliminarElementos, 1);
            console.log("Elemento eliminado correctamente");
        }
    };
    Biblioteca.prototype.listaElementos = function () {
        return this.elementos;
    };
    Biblioteca.prototype.addPrestamos = function (cliente, elemento) {
        if (!this.validarCliente(cliente)) {
            console.log("El usuario no existe");
            return;
        }
        var elementoExistente = this.buscarElemento(elemento);
        if (!elementoExistente || !elementoExistente.estaDisponible()) {
            console.log("No esta disponible");
            return;
        }
        elementoExistente.marcarNoDisponible();
        var nuevoPrestamo = new prestamo_1.Prestamos(cliente, elementoExistente);
        this.prestamos.push(nuevoPrestamo);
        console.log(cliente.getNombre(), "retira ", elemento.getTitulo(), nuevoPrestamo.getFechaInicio().toLocaleDateString(), "con fecha de devolucion", nuevoPrestamo.getVencimiento().toLocaleDateString());
    };
    Biblioteca.prototype.devolverElemento = function (elemento, cliente, fechaDevolucion) {
        var prestamo = this.encontarPrestamosActivos(elemento, cliente);
        if (!prestamo) {
            //  throw new Error
            console.log("Prestamo no registrado.");
            return;
        }
        var elementoExistente = this.buscarElemento(elemento);
        if (elementoExistente) {
            elementoExistente.marcarDisponible();
        }
        var fechaVencimiento = prestamo.getVencimiento();
        if (fechaDevolucion > fechaVencimiento) {
            var diasDemora = Math.ceil((fechaDevolucion.getTime()) - fechaVencimiento.getTime());
            var cargaPorDemora = 0;
            switch (true) {
                case diasDemora >= 1 && diasDemora < 2:
                    cargaPorDemora = 2;
                    break;
                case diasDemora >= 2 && diasDemora <= 5:
                    cargaPorDemora = 3;
                    break;
                case diasDemora > 5 && diasDemora <= 10:
                    cargaPorDemora = 6;
                    break;
                case diasDemora > 10:
                    console.log("".concat(cliente.getNombre(), " excedio el limite de dias de devolucion y fue eliminado"));
                    break;
                default:
            }
            cliente.addPuntos(cargaPorDemora);
            console.log("".concat(cliente.getNombre(), " devolvio ").concat(elemento.getTitulo(), " tarde. Usteded tiene una penalizacion de ").concat(cargaPorDemora, " puntos."));
        }
        else {
            console.log("".concat(cliente.getNombre(), " devolvio ").concat(elemento.getTitulo(), " en tiempo y forma"));
        }
        this.prestamos = this.prestamos.filter(function (buscarPrestamo) { return buscarPrestamo !== prestamo; });
        console.log(cliente.getNombre(), "devolvio", elemento.getTitulo(), "En la fecha");
    };
    Biblioteca.prototype.encontarPrestamosActivos = function (elemento, cliente) {
        return this.prestamos.find(function (prestamo) { return prestamo.getElementos() === elemento && prestamo.getCliente() === cliente; });
    };
    Biblioteca.prototype.listadoPrestamos = function () {
        return this.prestamos;
    };
    Biblioteca.prototype.validarCliente = function (cliente) {
        return this.clientes.includes(cliente);
    };
    Biblioteca.prototype.buscarElemento = function (elemento) {
        return this.elementos.find(function (i) { return i === elemento; });
    };
    return Biblioteca;
}());
exports.Biblioteca = Biblioteca;
// Creacion de biblioteca
var biblioteca1 = new Biblioteca("AS", "25 de mayo");
// Crearcion de elementos
var libro1 = new libro_1.Libro("Casita", "Cosito", 1896);
//let revista1 = new Revista ("Gente", "Mimina", 2023);
// Creacion de clientes
var cliente1 = new cliente_1.Cliente("Ludmila", "Miguens", "uriburu", 289355);
//let cliente2 = new Cliente("Ludmilaaaaa", "Miguens", "uriburu", 289355);
var prestamo1 = new prestamo_1.Prestamos(cliente1, libro1);
//Agregamos los clientes a la biblioteca.
biblioteca1.addCliente(cliente1);
//biblioteca1.addCliente(cliente2);
// Agregamos los elementos a la biblioteca.
biblioteca1.addElemento(libro1);
//biblioteca1.addElemento(revista1);
// Realizamos un prestamo.
biblioteca1.addPrestamos(cliente1, libro1);
//biblioteca1.addPrestamos(cliente2,revista1);
//biblioteca1.addPrestamos(cliente1,libro1); // No se puede realizar ya que esta prestado el libro.
// Devolver el elemento.
var fechaDevolucion = new Date();
prestamo1.getVencimiento().setDate(fechaDevolucion.getDate() + 8);
biblioteca1.devolverElemento(libro1, cliente1, fechaDevolucion);
// Mostramos la lista de clientes.
//biblioteca1.listaClientes();
//biblioteca1.eliminarCliente(cliente1); // Eliminar cliente de la biblioteca.
//biblioteca1.listaClientes();
//Mostramos la lista de elementos.
//console.log(biblioteca1.listaElementos());
//biblioteca1.eliminarElementos(revista1); //Eliminamos un elemento de la biblioteca.
//console.log(biblioteca1.listaElementos());
