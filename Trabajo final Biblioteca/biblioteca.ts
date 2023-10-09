import { Cliente } from './cliente';
import { Libreria } from './libreria';
import { Prestamos } from './prestamo';
import * as rs from "readline-sync";
import { AdministradorDeArchivos } from '.';
import { Historico } from './historico';


export class Biblioteca{
    private nombre: string;
    private domicilio: string;
    private clientes: Cliente[];
    private elementos: Libreria[];
    private prestamos: Prestamos[];
    private historico: Historico;
    public constructor(nombre: string, domicilio: string, historico: Historico){
        this.nombre = nombre;
        this. domicilio = domicilio;
        this.clientes = [];
        this.elementos = [];
        this.prestamos = [];
        this.historico = historico;
    }
    public getNombre(): string{
        return this.nombre;
    }
    public getDomicilio(): string{
        return this.domicilio;
    }

//Agregamos un nuevo cliente a la biblioteca
    public addCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

//Eliminamos un cliente
    public eliminarCliente(cliente:Cliente): void{
        const eliminarCliente = this.clientes.indexOf(cliente);
        if (eliminarCliente !== -1){
            this.clientes.splice(eliminarCliente, 1);
            console.log("Cliente eliminado correctamente");
            rs.keyInPause("\n");
        }
    }

//Mostramos la lista de clientes activos
    public listaClientes(): void{
        console.log(this.clientes);
        rs.keyInPause("\n");
    }

//Agregamos un elemento
    public addElemento(elemento: Libreria): void{
        this.elementos.push(elemento);
    }

//Se elimina un elemento de la biblioteca
    public eliminarElementos(elemento:Libreria): void{
        const eliminarElementos = this.elementos.indexOf(elemento);
        if (eliminarElementos !== -1){
            this.elementos.splice(eliminarElementos, 1);
            console.log("Elemento eliminado correctamente");
            rs.keyInPause("\n");
        }
    }

//Mostramo la lista de elementos de la biblioteca
    public listaElementos(): Libreria[]{
        return this.elementos
    }

// Metodo para realizar el prestamo
    public addPrestamos(cliente:Cliente, elemento:Libreria): void{
         if(!this.validarCliente(cliente)){ // Valida si existe el usuario
            console.log("El usuario no existe");
            rs.keyInPause("\n");
            return;
        }
        const elementoExistente: Libreria | undefined = this.buscarElemento(elemento);
        if(!elementoExistente || !elementoExistente.estaDisponible()){ //Validar si existe el elemento
            console.log("No esta disponible");
            rs.keyInPause("\n");
            return;
        } 
        const penalizado = cliente.setPenalizado();
          if(!cliente === penalizado){ // Validacion para ver si el usuario esta penalizado
            console.log(cliente.getNombre(),"No puede retirar ", elemento.getTitulo(),"Usted esta penalizado");
            rs.keyInPause("\n");
            return;
        } 
        elementoExistente.marcarNoDisponible();
        const nuevoPrestamo = new Prestamos(cliente,elementoExistente); //Tanto el cliente como el elemento existe y se puede realizar el prestamo
        this.prestamos.push(nuevoPrestamo); // Se agrega el prestamo al arreglo de prestamos
        AdministradorDeArchivos.agregarPrestamo(this.prestamos); // Guarda el prestamo en memoria ("listaDePrestamos.json")
      
        console.log(cliente.getNombre(), "retira ", elemento.getTitulo(), nuevoPrestamo.getFechaInicio().toLocaleDateString(), "con fecha de devolucion", nuevoPrestamo.getVencimiento().toLocaleDateString());
        rs.keyInPause("\n");  
        this.historico.addRegistro("Elemento prestado", elemento.getTitulo());//Agrega al historial de prestamos que se presto el elemento

    }  

// Metodo para devolver un prestamo
    public devolverElemento(elemento : Libreria, cliente : Cliente, fechaDevolucion: Date): void{
        const prestamo = this.encontarPrestamosActivos(elemento, cliente);
    
        if (!prestamo){
            console.log("Prestamo no registrado."); //No se encontro ningun prestamo
            rs.keyInPause("\n");
            return;
        }

        const elementoExistente = this.buscarElemento(elemento); //Devuelve el prestamo y marca como disponible al elemento
        if(elementoExistente){
            elementoExistente.marcarDisponible();
        }

//Penalizacion del usuario por devolver tarde el prestamo
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
                    rs.keyInPause("\n");
                    break;
                    default:
                    }
                    cliente.addPuntos(cargaPorDemora); // Se le agregan los puntos al cliente.
                    console.log(`${cliente.getNombre()} devolvio ${elemento.getTitulo()} tarde. Usteded tiene una penalizacion de ${cargaPorDemora} puntos.`);
                    rs.keyInPause("\n");
                    cliente.setPenalizado();
                } else { // Resta puntos o Despenaliza al usuario.
                    if (cliente.getPuntos() > 1){
                        cliente.removePuntos();
                    }else if (cliente.getPuntos() === 1){
                        cliente.removePuntos();
                        cliente.setDespenalizar();                
                    }
                    console.log(`${cliente.getNombre()} devolvio ${elemento.getTitulo()} en tiempo y forma. Usted tiene ${cliente.getPuntos()} puntos.`);
                    rs.keyInPause("\n");
                }
                this.prestamos = this.prestamos.filter((buscarPrestamo) => buscarPrestamo !== prestamo);
                AdministradorDeArchivos.agregarPrestamo(this.prestamos);  // Quita el prestamo de la lista de prestamos Activos ("listadePrestamos.json")
                this.historico.addRegistro("Elemento Devuelto", elemento.getTitulo()); //Agrega al historial de prestamos que se devolvio el elemento

    }

// Buscamos el prestamo activo
    public encontarPrestamosActivos(elemento: Libreria, cliente: Cliente): Prestamos | undefined{
        return this.prestamos.find((prestamo)=> prestamo.getElementos() === elemento && prestamo.getCliente()=== cliente)
    }

// Mostrar lista de Prestamo
    public listadoPrestamos(): Prestamos[] {         
        return this.prestamos;
    }

// Validamos si el cliente esta ingresado en la biblioteca
    private validarCliente(cliente:Cliente): boolean{  
        return this.clientes.includes(cliente);
    }

//Buscamos si el elemento deseado existe   
    private buscarElemento(elemento: Libreria): Libreria | undefined { 
        return this.elementos.find((i) => i === elemento);
    }
}

