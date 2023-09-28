"use strict";
exports.__esModule = true;
var biblioteca_1 = require("./biblioteca");
var cliente_1 = require("./cliente");
var libro_1 = require("./libro");
var prestamo_1 = require("./prestamo");
// Creacion de biblioteca
var biblioteca1 = new biblioteca_1.Biblioteca("AS", "25 de mayo");
// Crearcion de elementos
var libro1 = new libro_1.Libro("Casita", "Cosito", 1896);
//let revista1 = new Revista ("Gente", "Mimina", 2023);
// Creacion de clientes
var cliente1 = new cliente_1.Cliente("Ludmila", "Miguens", "uriburu", 289355);
//let cliente2 = new Cliente("Ludmilaaaaa", "Miguens", "uriburu", 289355);
// Creacion del prestamo
var prestamo1 = new prestamo_1.Prestamos(cliente1, libro1);
// Agregamos los clientes a la biblioteca.
biblioteca1.addCliente(cliente1);
//biblioteca1.addCliente(cliente2);
// Agregamos los elementos a la biblioteca.
biblioteca1.addElemento(libro1);
//biblioteca1.addElemento(revista1);
// Realizamos un prestamo.
biblioteca1.addPrestamos(cliente1, libro1);
//biblioteca1.addPrestamos(cliente2,revista1);
//biblioteca1.addPrestamos(cliente1,libro1); // No se puede realizar ya que esta prestado el libro.
//console.log(biblioteca1.listadoPrestamos());
// Devolver el elemento.
//let fechaDevolucion = new Date(); 
//fechaDevolucion.setDate(fechaDevolucion.getDate() +12); // A la fecha le sumamos 9 dias
//biblioteca1.devolverElemento(libro1,cliente1, fechaDevolucion); // Suma 3 puntos
////console.log(biblioteca1.listadoPrestamos());
//biblioteca1.addPrestamos(cliente1,libro1);
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
