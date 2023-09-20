import { Libreria } from "./libreria";
export class Revista extends Libreria{
    private editorial: string;
    public constructor(titulo: string, editorial: string, año: number){
        super(titulo, año);
        this.editorial = editorial;
    }
    public setEditorial(editorial: string): void{
        this.editorial = editorial;
    }
    public getEditorial(): string {
        return this.editorial;
    }
}