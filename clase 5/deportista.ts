export class Deportistas {
    private nombre: string;
    private edad: number;
    protected disciplina: string;

    public constructor(){
        this.nombre = "";
        this.edad = 0;
        this.disciplina = "";
    }

    public nombreDeportista(nombre: string): void{
        this.nombre = nombre;
        console.log(`Nombre: ${this.nombre}`);
        
    }
    public añosDeportista(edad: number): void {
        this.edad= edad;
        console.log(`Edad: ${this.edad}`);
    }
}







