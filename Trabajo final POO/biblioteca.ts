import { randomUUID } from 'node:crypto';
import { Cliente } from './cliente';
import { Libreria } from './libreria';
import { Prestamos } from './prestamo';
import { Libro } from './libro';
import { Revista } from './revista';

export class Biblioteca{
    private nombre: string;
    private domicilio: string;
    private clientes: Cliente[];
    private elementos: Libreria[];
    private prestamos: Prestamos[]
    public constructor(nombre: string, domicilio: string){
        this.nombre = nombre;
        this. domicilio = domicilio;
        this.clientes = [];
        this.elementos = [];
        this.prestamos = [];
    }
    public getNombre(): string{
        return this.nombre;
    }
    public getDomicilio(): string{
        return this.domicilio;
    }
    public addCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }
    public eliminarCliente(cliente:Cliente): void{
        const eliminarCliente = this.clientes.indexOf(cliente);
        if (eliminarCliente !== -1){
            this.clientes.splice(eliminarCliente, 1);
            console.log("Cliente eliminado correctamente");
        }
    }
    public listaClientes(): void{
        console.log(this.clientes);
    }
    public addElemento(elemento: Libreria): void{
        this.elementos.push(elemento);
    }
    public eliminarElementos(elemento:Libreria): void{
        const eliminarElementos = this.elementos.indexOf(elemento);
        if (eliminarElementos !== -1){
            this.elementos.splice(eliminarElementos, 1);
            console.log("Elemento eliminado correctamente");
        }
    }
    public listaElementos(): Libreria[]{
        return this.elementos
    }
    public addPrestamos(cliente:Cliente, elemento:Libreria): void{
        if(!this.validarCliente(cliente)){
            console.log("El usuario no existe");
            return;
        }
        const elementoExistente: Libreria | undefined = this.buscarElemento(elemento);
        if(!elementoExistente || !elementoExistente.estaDisponible()){
            console.log("No esta disponible");
            return;
        }
        elementoExistente.marcarNoDisponible();

        const nuevoPrestamo = new Prestamos(cliente,elementoExistente);
        this.prestamos.push(nuevoPrestamo);

        console.log(cliente.getNombre(), "retira ", elemento.getTitulo(), nuevoPrestamo.getFechaInicio().toLocaleDateString(), "con fecha de devolucion", nuevoPrestamo.getVencimiento().toLocaleDateString());
    }   
    public devolverElemento(elemento : Libreria, cliente : Cliente, fechaDevolucion: Date): void{
        const prestamo = this.encontarPrestamosActivos(elemento, cliente);
        if (!prestamo){
            //  throw new Error
            console.log("Prestamo no registrado.");
            return;
        }
        const elementoExistente = this.buscarElemento(elemento);
        if(elementoExistente){
            elementoExistente.marcarDisponible();
        }
        const fechaVencimiento = prestamo.getVencimiento();
        if (fechaDevolucion > fechaVencimiento){
            const diasDemora = Math.ceil((fechaDevolucion.getTime()) - fechaVencimiento.getTime());
            let cargaPorDemora = 0;
            switch (true){
                case diasDemora >= 1 && diasDemora <2: 
                    cargaPorDemora = 2;
                    break;
                case diasDemora >= 2 && diasDemora <= 5:
                    cargaPorDemora = 3;
                    break;
                case diasDemora > 5 && diasDemora <= 10:
                    cargaPorDemora = 6;
                    break;
                case diasDemora > 10:
                    console.log(`${cliente.getNombre()} excedio el limite de dias de devolucion y fue eliminado`);
                    break;
                    default:
            }
            cliente.addPuntos(cargaPorDemora);
            console.log(`${cliente.getNombre()} devolvio ${elemento.getTitulo()} tarde. Usteded tiene una penalizacion de ${cargaPorDemora} puntos.`);
        } else {
            console.log(`${cliente.getNombre()} devolvio ${elemento.getTitulo()} en tiempo y forma`);
        }




        this.prestamos = this.prestamos.filter((buscarPrestamo) => buscarPrestamo !== prestamo);
        console.log(cliente.getNombre(), "devolvio", elemento.getTitulo(), "En la fecha");
    }
    public encontarPrestamosActivos(elemento: Libreria, cliente: Cliente): Prestamos | undefined{
        return this.prestamos.find((prestamo)=> prestamo.getElementos() === elemento && prestamo.getCliente()=== cliente)
    }

    public listadoPrestamos(): Prestamos[]{
        return this.prestamos;
    }
    private validarCliente(cliente:Cliente): boolean{
        return this.clientes.includes(cliente);
    }
    private buscarElemento(elemento: Libreria): Libreria | undefined {
        return this.elementos.find((i) => i === elemento);
    }
}

// Creacion de biblioteca
let biblioteca1 = new Biblioteca("AS", "25 de mayo");

// Crearcion de elementos
let libro1 = new Libro("Casita", "Cosito", 1896,);
//let revista1 = new Revista ("Gente", "Mimina", 2023);

// Creacion de clientes
let cliente1 = new Cliente("Ludmila", "Miguens", "uriburu", 289355);
//let cliente2 = new Cliente("Ludmilaaaaa", "Miguens", "uriburu", 289355);


let prestamo1 = new Prestamos(cliente1, libro1);

//Agregamos los clientes a la biblioteca.
biblioteca1.addCliente(cliente1);
//biblioteca1.addCliente(cliente2);

// Agregamos los elementos a la biblioteca.
biblioteca1.addElemento(libro1);
//biblioteca1.addElemento(revista1);

// Realizamos un prestamo.
biblioteca1.addPrestamos(cliente1,libro1);
//biblioteca1.addPrestamos(cliente2,revista1);
//biblioteca1.addPrestamos(cliente1,libro1); // No se puede realizar ya que esta prestado el libro.

// Devolver el elemento.
let fechaDevolucion = new Date();
fechaDevolucion.setDate(fechaDevolucion.getDate() +8);
biblioteca1.devolverElemento(libro1,cliente1, fechaDevolucion);

// Mostramos la lista de clientes.
//biblioteca1.listaClientes();
//biblioteca1.eliminarCliente(cliente1); // Eliminar cliente de la biblioteca.
//biblioteca1.listaClientes();

//Mostramos la lista de elementos.
//console.log(biblioteca1.listaElementos());
//biblioteca1.eliminarElementos(revista1); //Eliminamos un elemento de la biblioteca.
//console.log(biblioteca1.listaElementos());
