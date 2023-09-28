import { randomUUID } from 'node:crypto';
import { Cliente } from './cliente';
import { Libreria } from './libreria';
import { Prestamos } from './prestamo';
import { Libro } from './libro';
import { Revista } from './revista';
import { administradorDePrestamos } from './convertirPrestamosTX';
import * as fs from "file-system"


export class Biblioteca{
    private nombre: string;
    private domicilio: string;
    private clientes: Cliente[];
    private elementos: Libreria[];
    private prestamos: Prestamos[];
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
    // Metodo para realizar el prestamo
    public addPrestamos(cliente:Cliente, elemento:Libreria): void{
         if(!this.validarCliente(cliente)){ // Valida si existe el usuario
            console.log("El usuario no existe");
            return;
        }
        const elementoExistente: Libreria | undefined = this.buscarElemento(elemento);
        if(!elementoExistente || !elementoExistente.estaDisponible()){ //Validar si existe el elemento
            console.log("No esta disponible");
            return;
        } /*const penalizado = cliente.setPenalizado();
          if(penalizado){ // Validacion para ver si el usuario esta penalizado
            console.log(cliente.getNombre(),"No puede retirar ", elemento.getTitulo(),"Usted esta penalizado");
            return;
        } */
        elementoExistente.marcarNoDisponible();
        const nuevoPrestamo = new Prestamos(cliente,elementoExistente); //Tanto el cliente como el elemento existe y se puede realizar el prestamo
        this.prestamos.push(nuevoPrestamo); // Se agrega el prestamo al arreglo de prestamos

        console.log(cliente.getNombre(), "retira ", elemento.getTitulo(), nuevoPrestamo.getFechaInicio().toLocaleDateString(), "con fecha de devolucion", nuevoPrestamo.getVencimiento().toLocaleDateString());
    }   
    public devolverElemento(elemento : Libreria, cliente : Cliente, fechaDevolucion: Date): void{
        const prestamo = this.encontarPrestamosActivos(elemento, cliente);
    
        if (!prestamo){
            console.log("Prestamo no registrado.");
            return;
        }
        const elementoExistente = this.buscarElemento(elemento);
        if(elementoExistente){
            elementoExistente.marcarDisponible();
        }
        let fechaVencimiento = prestamo.getVencimiento();
        
        if (fechaDevolucion > fechaVencimiento){
            const diasDemora = Math.ceil(((fechaDevolucion.getTime()) - (fechaVencimiento.getTime())) / (1000 * 3600 * 24));
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
                case diasDemora > 10: //Se elimina al cliente de la biblioteca por exceder el limite
                    this.eliminarCliente(cliente);
                    console.log(`${cliente.getNombre()} excedio el limite de dias de devolucion y fue eliminado`);
                    break;
                    default:
            }
            cliente.addPuntos(cargaPorDemora); // Se le agregan los puntos al cliente.
            console.log(`${cliente.getNombre()} devolvio ${elemento.getTitulo()} tarde. Usteded tiene una penalizacion de ${cargaPorDemora} puntos.`);
            cliente.setPenalizado();
        } else { // Resta puntos o Despenaliza al usuario.
            if (cliente.getPuntos() > 1){
                cliente.removePuntos();
            }else if (cliente.getPuntos() === 1){
                cliente.removePuntos();
                cliente.setDespenalizar();                
            }
            console.log(`${cliente.getNombre()} devolvio ${elemento.getTitulo()} en tiempo y forma. Usted tien ${cliente.getPuntos()} puntos.`);
        }
        this.prestamos = this.prestamos.filter((buscarPrestamo) => buscarPrestamo !== prestamo);
    }
    public encontarPrestamosActivos(elemento: Libreria, cliente: Cliente): Prestamos | undefined{
        return this.prestamos.find((prestamo)=> prestamo.getElementos() === elemento && prestamo.getCliente()=== cliente)
    }
    public listadoPrestamos(): Prestamos[] { // Mostrar lista de Prestamo        
        return this.prestamos;
    }
    private validarCliente(cliente:Cliente): boolean{  // Validamos si el cliente esta ingresado en la biblioteca
        return this.clientes.includes(cliente);
    }
    private buscarElemento(elemento: Libreria): Libreria | undefined { //Buscamos si el elemento deseado existe
        return this.elementos.find((i) => i === elemento);
    }
}

