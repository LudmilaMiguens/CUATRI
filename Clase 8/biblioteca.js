"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Biblioteca = exports.Prestamos = exports.Cliente = exports.Libro = exports.Revista = exports.Libreria = void 0;
var node_crypto_1 = require("node:crypto");
var Libreria = /** @class */ (function () {
    function Libreria(titulo, año) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.disponibilidad = true;
        this.titulo = titulo;
        this.año = año;
    }
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
var Revista = /** @class */ (function (_super) {
    __extends(Revista, _super);
    function Revista(titulo, editorial, año) {
        var _this = _super.call(this, titulo, año) || this;
        _this.editorial = editorial;
        return _this;
    }
    Revista.prototype.setEditorial = function (editorial) {
        this.editorial = editorial;
    };
    Revista.prototype.getEditorial = function () {
        return this.editorial;
    };
    return Revista;
}(Libreria));
exports.Revista = Revista;
var Libro = /** @class */ (function (_super) {
    __extends(Libro, _super);
    function Libro(titulo, autor, año) {
        var _this = _super.call(this, titulo, año) || this;
        _this.autor = autor;
        return _this;
    }
    Libro.prototype.setAutor = function (autor) {
        this.autor = autor;
    };
    Libro.prototype.getAutor = function () {
        return this.autor;
    };
    return Libro;
}(Libreria));
exports.Libro = Libro;
var Cliente = /** @class */ (function () {
    function Cliente(nombre, apellido, direccion, cel) {
        this.id = (0, node_crypto_1.randomUUID)();
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
    return Cliente;
}());
exports.Cliente = Cliente;
var Prestamos = /** @class */ (function () {
    function Prestamos(cliente, elementos) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.cliente = cliente;
        this.elementos = elementos;
        this.fechaInicio = new Date();
        this.fechaVencimiento = new Date();
        this.fechaVencimiento.setDate(this.fechaInicio.getDate() + 7);
    }
    Prestamos.prototype.getId = function () {
        return this.id;
    };
    Prestamos.prototype.getCliente = function () {
        return this.cliente;
    };
    Prestamos.prototype.getElementos = function () {
        return this.elementos;
    };
    Prestamos.prototype.getFechaInicio = function () {
        return this.fechaInicio;
    };
    Prestamos.prototype.getVencimiento = function () {
        return this.fechaVencimiento;
    };
    return Prestamos;
}());
exports.Prestamos = Prestamos;
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
    Biblioteca.prototype.listaClientes = function () {
        console.log(this.clientes);
    };
    Biblioteca.prototype.addElemento = function (elemento) {
        this.elementos.push(elemento);
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
        var nuevoPrestamo = new Prestamos(cliente, elementoExistente);
        this.prestamos.push(nuevoPrestamo);
        console.log(cliente.getNombre(), "retira ", elemento.getTitulo(), "con fecha de devolucion", nuevoPrestamo.getVencimiento().toDateString());
    };
    Biblioteca.prototype.devolverElemento = function (elemento, cliente) {
        var prestamo = this.encontarPrestamosActivos(elemento, cliente);
        if (!prestamo) {
            console.log("Prestamo no registrado.");
            return;
        }
        var elementoExistente = this.buscarElemento(elemento);
        if (elementoExistente) {
            elementoExistente.marcarDisponible();
        }
        this.prestamos = this.prestamos.filter(function (i) { return i !== prestamo; });
        console.log(cliente.getNombre(), "devolvio", elemento.getTitulo());
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
var biblioteca1 = new Biblioteca("AS", "25 de mayo");
var libro1 = new Libro("Casita", "Cosito", 1896);
var cliente1 = new Cliente("Ludmila", "Miguens", "uriburu", 289355);
var cliente2 = new Cliente("Ludmilaaaaa", "Miguens", "uriburu", 289355);
var prestamo1 = new Prestamos(cliente1, libro1);
biblioteca1.addCliente(cliente1);
biblioteca1.addElemento(libro1);
biblioteca1.addPrestamos(cliente1, libro1);
biblioteca1.addPrestamos(cliente2, libro1);
biblioteca1.addPrestamos(cliente1, libro1);
biblioteca1.devolverElemento(libro1, cliente1);
//biblioteca1.listaClientes();
//console.log(biblioteca1.listaElementos());
//console.log(biblioteca1.listadoPrestamos());
