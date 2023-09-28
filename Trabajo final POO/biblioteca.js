"use strict";
exports.__esModule = true;
exports.Biblioteca = void 0;
var prestamo_1 = require("./prestamo");
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
    // Metodo para realizar el prestamo
    Biblioteca.prototype.addPrestamos = function (cliente, elemento) {
        if (!this.validarCliente(cliente)) { // Valida si existe el usuario
            console.log("El usuario no existe");
            return;
        }
        var elementoExistente = this.buscarElemento(elemento);
        if (!elementoExistente || !elementoExistente.estaDisponible()) { //Validar si existe el elemento
            console.log("No esta disponible");
            return;
        } /*const penalizado = cliente.setPenalizado();
          if(penalizado){ // Validacion para ver si el usuario esta penalizado
            console.log(cliente.getNombre(),"No puede retirar ", elemento.getTitulo(),"Usted esta penalizado");
            return;
        } */
        elementoExistente.marcarNoDisponible();
        var nuevoPrestamo = new prestamo_1.Prestamos(cliente, elementoExistente); //Tanto el cliente como el elemento existe y se puede realizar el prestamo
        this.prestamos.push(nuevoPrestamo); // Se agrega el prestamo al arreglo de prestamos
        console.log(cliente.getNombre(), "retira ", elemento.getTitulo(), nuevoPrestamo.getFechaInicio().toLocaleDateString(), "con fecha de devolucion", nuevoPrestamo.getVencimiento().toLocaleDateString());
    };
    Biblioteca.prototype.devolverElemento = function (elemento, cliente, fechaDevolucion) {
        var prestamo = this.encontarPrestamosActivos(elemento, cliente);
        if (!prestamo) {
            console.log("Prestamo no registrado.");
            return;
        }
        var elementoExistente = this.buscarElemento(elemento);
        if (elementoExistente) {
            elementoExistente.marcarDisponible();
        }
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
                    break;
                default:
            }
            cliente.addPuntos(cargaPorDemora); // Se le agregan los puntos al cliente.
            console.log("".concat(cliente.getNombre(), " devolvio ").concat(elemento.getTitulo(), " tarde. Usteded tiene una penalizacion de ").concat(cargaPorDemora, " puntos."));
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
            console.log("".concat(cliente.getNombre(), " devolvio ").concat(elemento.getTitulo(), " en tiempo y forma. Usted tien ").concat(cliente.getPuntos(), " puntos."));
        }
        this.prestamos = this.prestamos.filter(function (buscarPrestamo) { return buscarPrestamo !== prestamo; });
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
