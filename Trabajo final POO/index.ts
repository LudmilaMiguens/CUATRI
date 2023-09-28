import { Prestamos } from "./prestamo";
import * as fs from "node:fs";
import * as rs from "readline-sync";
import { Cliente } from "./cliente";
import { Biblioteca } from "./biblioteca";
import { strict } from "node:assert";
import { Libreria } from "./libreria";



//sistema de archivos.
class AdministradorDeArchivos{ //clase autilitaria, tiene solo metodos, no gerera objetos.
    static leerArchivos(){ //Lee los prestamos que estan cargados en el Json y los muestra como un arreglo
        try {
            const prestamos = fs.readFileSync("./listaDePrestamos.json",{encoding: "utf-8"});  
            console.log(("Lectura de datos perfecta"));  
            return JSON.parse(prestamos) as Prestamos[]; // JSON.parse devuelve los datos al estado original
        } catch (error) {
            console.log("Sucedio un error: ", error);
        } rs.keyInPause("\n")
    }
}

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
                   "****"
                );
              }); 
            }
        }
        rs.keyInPause("\n")
    }
    public retirarElemento(cliente: Cliente, elemento: Libreria){
        const nuevoPrestamo = new Prestamos(cliente, elemento);
        
        console.log("Retiro excelente");        
    }
    public devolverElemento(cliente: Cliente, elemento: Libreria){
        const devolverPrestamo = new Prestamos(cliente, elemento);

        console.log("Devolucion excelente");
    } 
    public menu(){
        while(true){
            console.clear() // Limpia la consola
            const eleccion = rs.keyInSelect(this.opcionesMenu) // Con keyInSelect seleccionamos la opcion que elege el cliente
            switch(eleccion){
                case 0:
                case 1:
                   // this.retirarElemento();
                    break;
                case 2:
                    //this.devolverElemento();
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
    "Agregar un elemento",
   "Retirar un elemento",
   "Devolver un elemento",
   "Lista de prestamos activos"
]
}
const menu1 = new AdministradorDePrestamos();
menu1.menu();

