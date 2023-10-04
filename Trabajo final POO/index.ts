import { Prestamos } from "./prestamo";
import * as fs from "node:fs";
import * as rs from "readline-sync";
import { Cliente } from "./cliente";
import { Biblioteca } from "./biblioteca";
import { strict } from "node:assert";
import { Libreria } from "./libreria";



//sistema de archivos.
export class AdministradorDeArchivos{ //clase autilitaria, tiene solo metodos, no genera objetos.
    static leerArchivos(){ //Lee los prestamos que estan cargados en el Json y los muestra como un arreglo
        try {
            const prestamos = fs.readFileSync("./listaDePrestamos.json",{encoding: "utf-8"});  
            console.log(("Lectura de datos perfecta"));  
            return JSON.parse(prestamos) as Prestamos[]; // JSON.parse devuelve los datos al estado original
        } catch (error) {
            console.log("Sucedio un error: ", error);
        } rs.keyInPause("\n")
    }
    static agregarPrestamo(data: Prestamos[]){
        try {
            fs.writeFileSync("./listaDePrestamos.json",JSON.stringify(data),{encoding: "utf-8"});
            console.log("Operacion exitosa!\n");
            rs.keyInPause("\n");
        } catch (error) {
            console.log("Sucedio un error", error);
            rs.keyInPause("\n");         
        }
    }
}


 /*export class AdministradorDePrestamos {
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
    public crearPrestamo(){
        console.log("**** Crear Prestamo ****");
        const leerPrestamo = AdministradorDeArchivos.leerArchivos();
        if(leerPrestamo){
            this.prestamos = leerPrestamo;
        }
        const cliente = rs.question ("Ingrese su nombre: ");
        const elemento = rs.question("Ingrese el nombre del elemento: ");
        rs.keyInPause();
        const newPrestamo = new Prestamos(clientes, elemento);
        this.prestamos.push(newPrestamo);
        rs.keyInPause();
        AdministradorDeArchivos.agregarPrestamo(this.prestamos);
        console.log(this.prestamos);
        rs.keyInPause("");       
    }
    
    public borrarPrestamo(){
        console.log("**** Borrar Prestamo ****");
        const leerPrestamo = AdministradorDeArchivos.leerArchivos();
        if(leerPrestamo){
            this.prestamos = leerPrestamo;
        }
        rs.keyInPause("");
        const idParaModificar = rs.question("Ingrese el id del prestamo a modificar: ");
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
        const registro = this.prestamos.findIndex((prestamos) => prestamos.getId() === idParaModificar);
        if (registro !== -1){
            const grabarActualizacion = this.prestamos[registro];
            const confirmacion = rs.keyInYN("Quieres actualizar?")
            if (confirmacion){
                //const cliente = rs.question ("Ingrese su nombre: ");
                const newElemento = rs.question("Ingrese el nombre del elemento: ");
                grabarActualizacion.getElementos() = newElemento;
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
}*/
//const menu1 = new AdministradorDePrestamos();
//menu1.menu();

