import { Libreria } from "./libreria";

//Clase para crear libros
export class Libro extends Libreria{
    private autor:string;
    public constructor(titulo: string, autor: string, año: number){
        super(titulo, año,);
        this.autor = autor;
    }
    public setAutor(autor:string): void{
        this.autor = autor;
    }
    public getAutor(): string{
        return this.autor;
    }
}
