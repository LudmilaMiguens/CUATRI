import { Biblioteca } from "./biblioteca";
import { Cliente } from "./cliente";
import { Libro } from "./libro";
import { Revista } from "./revista";
import { Historico } from "./historico";


// Creacion de biblioteca
const historico = new Historico();
const biblioteca1 = new Biblioteca("AS", "25 de mayo",historico);


// Crearcion de elementos
const libro1 = new Libro("Caos", "Magali Tajes", 2018,);
const libro2 = new Libro("Mariposa", "Felipe Perez", 2003,);
const revista1 = new Revista ("Gente", "Mimina", 2023);
const revista2 = new Revista ("Hola", "Miami", 2023);

// Creacion de clientes
const cliente1 = new Cliente("Ludmila", "Miguens", "Uriburu", 289355);
const cliente2 = new Cliente("Ambar", "Perez", "Avenida San Martin", 289355);
const cliente3 = new Cliente("Yael", "Lopez", "Bronw", 289355);
const cliente4 = new Cliente("Lujan", "Pereyra", "25 de Mayo", 289355);


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

biblioteca1.addPrestamos(cliente1,libro1);
biblioteca1.addPrestamos(cliente2,revista1);
//biblioteca1.addPrestamos(cliente1,libro1); // No se puede realizar ya que esta prestado el libro.
//console.log(biblioteca1.listadoPrestamos());

//Mostrar el historial de prestamos
historico.mostrarHistorico();

// Devolver el elemento.
let fechaDevolucion = new Date(); 
fechaDevolucion.setDate(fechaDevolucion.getDate() +12); // A la fecha le sumamos 9 dias
biblioteca1.devolverElemento(libro1,cliente1, fechaDevolucion); // Suma 3 puntos
//Mostrar el historial de prestamos
historico.mostrarHistorico(); 

//console.log(biblioteca1.listadoPrestamos()); //Lista de prestamos la cual muestra que se quito el prestamo que se devolvio

biblioteca1.addPrestamos(cliente1,libro1); // El usuario esta penalizado, no puede retirar un elemento

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