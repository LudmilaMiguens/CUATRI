import { randomUUID } from 'node:crypto';

//Metodo para el historial de prestamos
export class Historico{
    private historico: { id: string, estado: string, elemento:string} [];

    public constructor(){
        this.historico = []
    }
    //Creacion del objeto para el prestamo
    public addRegistro(estado: string, elemento:string){
        const registro = {
            id: randomUUID(),
            estado,
            elemento,
        };
        this.historico.push(registro); //Agrega el nuevo cambio al arreglo del historial
    }
    public getHistorico():{ id: string, estado: string, elemento: string}[]{
         return this.historico;
    }
    //Metodo para mostrar por consola todo el historial detallado
    public mostrarHistorico(): void{
        console.log("HISTORIAL DE PRESTAMOS");
        this.historico.forEach((registro, index) =>{
            console.log("Registro:", index + 1);
            console.log("ID:", registro.id);
            console.log("Estado:", registro.estado);
            console.log("Elemento:", registro.elemento);
        });
    }
}

