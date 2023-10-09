import { randomUUID } from 'node:crypto';

//Interface para crear la Libreria
export interface Libreriaa{
    getTitulo(): string;
    getAño(): number;
}

//Clase madre para la creacion de los elementos
export class Libreria implements Libreriaa{
    private id: string = randomUUID();
    private titulo: string;
    private año: number;
    private disponibilidad: boolean = true;
    public constructor(titulo: string, año: number){
        this.titulo =  titulo;
        this.año = año;
    }

//Metodo para modificar datos
    public setTitulo(titulo:string): void{
        this.titulo = titulo;
    }
    public setAño(año:number): void{
        this.año = año;
    }
    public getTitulo(): string {
        return this.titulo;
    }
    public getAño(): number {
        return this.año;
    }

//Muestra el estado del elemento
    public estaDisponible(): boolean{
        return this.disponibilidad;
    }
    public marcarNoDisponible(){
        this.disponibilidad = false;
    }
    public marcarDisponible(){
        this.disponibilidad = true;
        
    }
}