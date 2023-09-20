import { randomUUID } from 'node:crypto';

export interface Libreriaa{
    getTitulo(): string;
    getAño(): number;
}
export class Libreria implements Libreriaa{
    private id: string = randomUUID();
    private titulo: string;
    private año: number;
    private disponibilidad: boolean = true;
    public constructor(titulo: string, año: number){
        this.titulo =  titulo;
        this.año = año;
    }
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