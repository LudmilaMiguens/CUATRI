import { Prestamos } from "./prestamo";
import * as fs from "node:fs";
import * as rs from "readline-sync";

//sistema de archivos.
//clase autilitaria, tiene solo metodos, no genera objetos.
export class AdministradorDeArchivos{ 

    //Metodo para agregar los prestamos al archivo Json
    static agregarPrestamo(data: Prestamos[]){
        try {
            fs.writeFileSync("./listaDePrestamos.json",JSON.stringify(data),{encoding: "utf-8"});
        } catch (error) {
            console.log("Sucedio un error", error);
            rs.keyInPause("\n");         
        }
    }
}
