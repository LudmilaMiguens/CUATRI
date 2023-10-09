"use strict";
exports.__esModule = true;
exports.Biblioteca = void 0;
var prestamo_1 = require("./prestamo");
var rs = require("readline-sync");
var _1 = require(".");
var Biblioteca = /** @class */ (function () {
    function Biblioteca(nombre, domicilio, historico) {
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.clientes = [];
        this.elementos = [];
        this.prestamos = [];
        this.historico = historico;
    }
    Biblioteca.prototype.getNombre = function () {
        return this.nombre;
    };
    Biblioteca.prototype.getDomicilio = function () {
        return this.domicilio;
    };
    //Agregamos un nuevo cliente a la biblioteca
    Biblioteca.prototype.addCliente = function (cliente) {
        this.clientes.push(cliente);
    };
    //Eliminamos un cliente
    Biblioteca.prototype.eliminarCliente = function (cliente) {
        var eliminarCliente = this.clientes.indexOf(cliente);
        if (eliminarCliente !== -1) {
            this.clientes.splice(eliminarCliente, 1);
            console.log("Cliente eliminado correctamente");
            rs.keyInPause("\n");
        }
    };
    //Mostramos la lista de clientes activos
    Biblioteca.prototype.listaClientes = function () {
        console.log(this.clientes);
        rs.keyInPause("\n");
    };
    //Agregamos un elemento
    Biblioteca.prototype.addElemento = function (elemento) {
        this.elementos.push(elemento);
    };
    //Se elimina un elemento de la biblioteca
    Biblioteca.prototype.eliminarElementos = function (elemento) {
        var eliminarElementos = this.elementos.indexOf(elemento);
        if (eliminarElementos !== -1) {
            this.elementos.splice(eliminarElementos, 1);
            console.log("Elemento eliminado correctamente");
            rs.keyInPause("\n");
        }
    };
    //Mostramo la lista de elementos de la biblioteca
    Biblioteca.prototype.listaElementos = function () {
        return this.elementos;
    };
    // Metodo para realizar el prestamo
    Biblioteca.prototype.addPrestamos = function (cliente, elemento) {
        if (!this.validarCliente(cliente)) { // Valida si existe el usuario
            console.log("El usuario no existe");
            rs.keyInPause("\n");
            return;
        }
        var elementoExistente = this.buscarElemento(elemento);
        if (!elementoExistente || !elementoExistente.estaDisponible()) { //Validar si existe el elemento
            console.log("No esta disponible");
            rs.keyInPause("\n");
            return;
        }
        var penalizado = cliente.setPenalizado();
        if (!cliente === penalizado) { // Validacion para ver si el usuario esta penalizado
            console.log(cliente.getNombre(), "No puede retirar ", elemento.getTitulo(), "Usted esta penalizado");
            rs.keyInPause("\n");
            return;
        }
        elementoExistente.marcarNoDisponible();
        var nuevoPrestamo = new prestamo_1.Prestamos(cliente, elementoExistente); //Tanto el cliente como el elemento existe y se puede realizar el prestamo
        this.prestamos.push(nuevoPrestamo); // Se agrega el prestamo al arreglo de prestamos
        _1.AdministradorDeArchivos.agregarPrestamo(this.prestamos); // Guarda el prestamo en memoria ("listaDePrestamos.json")
        console.log(cliente.getNombre(), "retira ", elemento.getTitulo(), nuevoPrestamo.getFechaInicio().toLocaleDateString(), "con fecha de devolucion", nuevoPrestamo.getVencimiento().toLocaleDateString());
        rs.keyInPause("\n");
        this.historico.addRegistro("Elemento prestado", elemento.getTitulo());
    };
    // Metodo para devolver un prestamo
    Biblioteca.prototype.devolverElemento = function (elemento, cliente, fechaDevolucion) {
        var prestamo = this.encontarPrestamosActivos(elemento, cliente);
        if (!prestamo) {
            console.log("Prestamo no registrado."); //No se encontro ningun prestamo
            rs.keyInPause("\n");
            return;
        }
        var elementoExistente = this.buscarElemento(elemento); //Devuelve el prestamo y marca como disponible al elemento
        if (elementoExistente) {
            elementoExistente.marcarDisponible();
        }
        //Penalizacion del usuario por devolver tarde el prestamo
        var fechaVencimiento = prestamo.getVencimiento();
        if (fechaDevolucion > fechaVencimiento) {
            var diasDemora = Math.ceil(((fechaDevolucion.getTime()) - (fechaVencimiento.getTime())) / (1000 * 3600 * 24));
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
                case diasDemora > 10: //Se elimina al cliente de la biblioteca por exceder el limite
                    this.eliminarCliente(cliente);
                    console.log("".concat(cliente.getNombre(), " excedio el limite de dias de devolucion y fue eliminado"));
                    rs.keyInPause("\n");
                    break;
                default:
            }
            cliente.addPuntos(cargaPorDemora); // Se le agregan los puntos al cliente.
            console.log("".concat(cliente.getNombre(), " devolvio ").concat(elemento.getTitulo(), " tarde. Usteded tiene una penalizacion de ").concat(cargaPorDemora, " puntos."));
            rs.keyInPause("\n");
            cliente.setPenalizado();
        }
        else { // Resta puntos o Despenaliza al usuario.
            if (cliente.getPuntos() > 1) {
                cliente.removePuntos();
            }
            else if (cliente.getPuntos() === 1) {
                cliente.removePuntos();
                cliente.setDespenalizar();
            }
            console.log("".concat(cliente.getNombre(), " devolvio ").concat(elemento.getTitulo(), " en tiempo y forma. Usted tiene ").concat(cliente.getPuntos(), " puntos."));
            rs.keyInPause("\n");
        }
        this.prestamos = this.prestamos.filter(function (buscarPrestamo) { return buscarPrestamo !== prestamo; });
        _1.AdministradorDeArchivos.agregarPrestamo(this.prestamos); // Quita el prestamo de la lista de prestamos Activos ("listadePrestamos.json")
        this.historico.addRegistro("Elemento Devuelto", elemento.getTitulo());
    };
    // Buscamos el prestamo activo
    Biblioteca.prototype.encontarPrestamosActivos = function (elemento, cliente) {
        return this.prestamos.find(function (prestamo) { return prestamo.getElementos() === elemento && prestamo.getCliente() === cliente; });
    };
    // Mostrar lista de Prestamo
    Biblioteca.prototype.listadoPrestamos = function () {
        return this.prestamos;
    };
    // Validamos si el cliente esta ingresado en la biblioteca
    Biblioteca.prototype.validarCliente = function (cliente) {
        return this.clientes.includes(cliente);
    };
    //Buscamos si el elemento deseado existe   
    Biblioteca.prototype.buscarElemento = function (elemento) {
        return this.elementos.find(function (i) { return i === elemento; });
    };
    return Biblioteca;
}());
exports.Biblioteca = Biblioteca;
