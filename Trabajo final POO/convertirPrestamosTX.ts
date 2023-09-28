import * as fs from "file-system"
import * as rs from "readline-sync";
import { Biblioteca } from "./biblioteca"
import { Prestamos } from "./prestamo"

export class administradorDePrestamos{
    static convertirPrestamos(){
        try {
           const prestamo= fs.readFileSync("./listaDePrestamos.json", {encoding: "utf-8"});
        console.log("Lectura de datos sagtifatoria");
        rs.keyInPause("\n");
        return JSON.parse(prestamo) as Prestamos[];
        } catch (error) {
            console.log("Error inesperado", error);   
        }
    }
    static agregarPrestamo (prestamo: Prestamos[]){
        try {
            fs.writeFileSync("./listaDePrestamos.json", JSON.stringify(prestamo), {encoding: "utf8"});
            console.log("Operacion completa\n");
            rs.keyInPause("\n");
        } catch (error) {
            console.log("Sucedio un error:", error);
            rs.keyInPause("\n");
            
        }
    } 

}



