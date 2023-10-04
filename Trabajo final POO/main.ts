import * as fs from "node:fs";
import * as rs from "readline-sync";
import { Biblioteca } from "./biblioteca";
import { Cliente } from "./cliente";
import { Libreria } from "./libreria";
import { Libro } from "./libro";
import { Revista } from "./revista";
import { Prestamos } from "./prestamo";
import { AdministradorDeArchivos } from ".";


// Creacion de biblioteca
let biblioteca1 = new Biblioteca("AS", "25 de mayo");

// Crearcion de elementos
let libro1 = new Libro("Casita", "Cosito", 1896,);
let revista1 = new Revista ("Gente", "Mimina", 2023);

// Creacion de clientes
let cliente1 = new Cliente("Ludmila", "Miguens", "uriburu", 289355);
let cliente2 = new Cliente("Ludmilaaaaa", "Miguens", "uriburu", 289355);

// Creacion del prestamo
let prestamo1 = new Prestamos(cliente1, libro1);

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

let fechaDevolucion = new Date(); 
fechaDevolucion.setDate(fechaDevolucion.getDate() +12); // A la fecha le sumamos 9 dias
biblioteca1.devolverElemento(libro1,cliente1, fechaDevolucion); // Suma 3 puntos

//console.log(biblioteca1.listadoPrestamos());

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
//biblioteca1.eliminarElementos(revista1);

//Eliminamos un elemento de la biblioteca.

//console.log(biblioteca1.listaElementos());


export class AdministradorDePrestamos {
    private prestamos: Prestamos[];
    public constructor(){
        this.prestamos = []
    }
    public leerPrestamos(){
        const resultado = AdministradorDeArchivos.leerArchivos();
        if (resultado){
            this.prestamos = resultado;
            console.log("*** Prestamos ***");
            if(this.prestamos.length === 0){
                console.log("No hay prestamos."); 
            }else{
              this.prestamos.forEach(prestamo =>{
                console.log(
                   "ID: ", prestamo.getId(),
                   "Ciente: ", prestamo.getCliente(),
                   "Elemento prestado: ", prestamo.getElementos(),
                   "Fecha de inicio: ", prestamo.getFechaInicio(),
                   "Fecha de devolucion: ", prestamo.getVencimiento(),

                   "*********************"

                );
              }); 
            }
        }
        rs.keyInPause("\n")
    }
    public crearPrestamo(){
        console.log("**** Crear Prestamo ****");
        const leerPrestamo = AdministradorDeArchivos.leerArchivos();
        if(leerPrestamo){
            this.prestamos = leerPrestamo;
        }
        const nombre = rs.question ("Ingrese su nombre: ");
        const apellido = rs.question ("Ingrese su apellido: ");
        const direccion = rs.question ("Ingrese su direccion: ");
        const cel = rs.questionInt ("Ingrese su celular: ");
        let newCliente = new Cliente(nombre, apellido,direccion, cel)
        const consulta = rs.keyInYN("Retira un libro??");
        rs.keyInPause();
        if (consulta){
            const titulo = rs.question("Ingrese el titulo: ");
        const autor = rs.question("Ingrese el autor: ");
        const año = rs.questionInt("Ingrese el año: ");
        let newLibro = new Libro (titulo, autor, año);
        let newPrestamo = new Prestamos(newCliente, newLibro);
        this.prestamos.push(newPrestamo);
        rs.keyInPause();
        AdministradorDeArchivos.agregarPrestamo(this.prestamos);
        rs.keyInPause(""); 
        } else{
            const titulo = rs.question("Ingrese el titulo: ");
        const editorial = rs.question("Ingrese la editorial: ");
        const año = rs.questionInt("Ingrese el año: ");
        let newRevista = new Revista (titulo, editorial, año);
        let newPrestamo = new Prestamos(newCliente, newRevista);
        this.prestamos.push(newPrestamo);
        rs.keyInPause();
        AdministradorDeArchivos.agregarPrestamo(this.prestamos);
        rs.keyInPause(""); 
        }     
    }
    
    public borrarPrestamo(){
        console.log("**** Borrar Prestamo ****");
        const leerPrestamo = AdministradorDeArchivos.leerArchivos();
        if(leerPrestamo){
            this.prestamos = leerPrestamo;
        }
        rs.keyInPause("");
        const idParaModificar = rs.question("Ingrese el id del prestamo a modificar: ");
        console.log("Prestamos ",this.prestamos);
        
        const registro = this.prestamos.findIndex((prestamos) => prestamos.getId() === idParaModificar);
        if (registro !== -1){
            const grabarActualizacion = this.prestamos[registro];
            const confirmacion = rs.keyInYN("Quieres eliminar este prestamo?") // que muestre el prestamo que encontro
            if (confirmacion){
                this.prestamos.splice(registro,1);
                AdministradorDeArchivos.agregarPrestamo(this.prestamos);
            }else{
                console.log("Se cancelo la eliminacion del prestamo ");
            }
        } else{
                console.log("Prestamo no existente ");
            }
            rs.keyInPause();    
    }

    public modificarPrestamo(){
        console.log("**** Modificar Prestamo ****");
        const leerPrestamo = AdministradorDeArchivos.leerArchivos();
        if(leerPrestamo){
            this.prestamos = leerPrestamo;
        }
        rs.keyInPause("");
        const idParaModificar = rs.question("Ingrese el id del prestamo a modificar: ");
        const registro = this.prestamos.findIndex((prestamo) => prestamo.getId() === idParaModificar);
        if (registro !== -1){
            const grabarActualizacion = this.prestamos[registro];
            const confirmacion = rs.keyInYN("Quieres actualizar?")
            if (confirmacion){
                const newCliente = rs.question ("Ingrese su nombre: ");
                const newElemento = rs.question("Ingrese el nombre del elemento: ");
                grabarActualizacion.getCliente().setNombre(newCliente);
                grabarActualizacion.getElementos().setTitulo(newElemento);
                AdministradorDeArchivos.agregarPrestamo(this.prestamos); 
            }else{
                console.log("Actualizacion cancelada ");
            }
        } else {
            console.log("El prestami no existe ");
        }
        rs.keyInPause();
    } 

    public menu(){
        while(true){
            console.clear() // Limpia la consola
            const eleccion = rs.keyInSelect(this.opcionesMenu) // Con keyInSelect seleccionamos la opcion que elege el cliente
            switch(eleccion){
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
    }
    opcionesMenu = [
    "Crear un prestamo",
   "Modificar un prestamo",
   "Borrar un prestamo",
   "Lista de prestamos activos"
]
}

const menu1 = new AdministradorDePrestamos();
menu1.menu();