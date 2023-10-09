"use strict";
exports.__esModule = true;
var biblioteca_1 = require("./biblioteca");
var cliente_1 = require("./cliente");
var libro_1 = require("./libro");
var revista_1 = require("./revista");
var historico_1 = require("./historico");
// Creacion de biblioteca
var historico = new historico_1.Historico();
var biblioteca1 = new biblioteca_1.Biblioteca("AS", "25 de mayo", historico);
// Crearcion de elementos
var libro1 = new libro_1.Libro("Caos", "Magali Tajes", 2018);
var libro2 = new libro_1.Libro("Mariposa", "Felipe Perez", 2003);
var revista1 = new revista_1.Revista("Gente", "Mimina", 2023);
var revista2 = new revista_1.Revista("Hola", "Miami", 2023);
// Creacion de clientes
var cliente1 = new cliente_1.Cliente("Ludmila", "Miguens", "Uriburu", 289355);
var cliente2 = new cliente_1.Cliente("Ambar", "Perez", "Avenida San Martin", 289355);
var cliente3 = new cliente_1.Cliente("Yael", "Lopez", "Bronw", 289355);
var cliente4 = new cliente_1.Cliente("Lujan", "Pereyra", "25 de Mayo", 289355);
// Creacion del prestamo
//let prestamo1 = new Prestamos(cliente1, libro1);
// Agregamos los clientes a la biblioteca.
biblioteca1.addCliente(cliente1);
biblioteca1.addCliente(cliente2);
biblioteca1.addCliente(cliente3);
biblioteca1.addCliente(cliente4);
// Agregamos los elementos a la biblioteca.
biblioteca1.addElemento(libro1);
biblioteca1.addElemento(libro2);
biblioteca1.addElemento(revista1);
biblioteca1.addElemento(revista2);
// Realizamos un prestamo.
biblioteca1.addPrestamos(cliente1, libro1);
biblioteca1.addPrestamos(cliente2, revista1);
//console.log("Historico",historico.getHistorico());
historico.mostrarHistorico();
//biblioteca1.addPrestamos(cliente1,libro1); // No se puede realizar ya que esta prestado el libro.
//console.log(biblioteca1.listadoPrestamos());
// Devolver el elemento.
var fechaDevolucion = new Date();
fechaDevolucion.setDate(fechaDevolucion.getDate() + 12); // A la fecha le sumamos 9 dias
biblioteca1.devolverElemento(libro1, cliente1, fechaDevolucion); // Suma 3 puntos
historico.mostrarHistorico();
//console.log(biblioteca1.listadoPrestamos()); //Lista de prestamos la cual muestra que se quito el prestamo que se devolvio
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
//Eliminamos un elemento de la biblioteca.
//biblioteca1.eliminarElementos(revista1);
//console.log(biblioteca1.listaElementos());
