import { Deportistas } from "./deportista";

class SaltoEnAlto extends Deportistas{
    private salto: boolean;
    private alturaM: number;

    public constructor(){
        super()
        this.alturaM = 0;
    }
    public saltar(a: boolean): void{
        if (a){
            this.salto = true;
            console.log("Salto Perfecto!!!!");
        } else{
            console.log("Salto fallido");
        }
    }
    public alturaMaxima(alturaM: number): void{
        this.alturaM = alturaM;
        console.log(`Altura maxima ${this.alturaM} mts.`);
    }
    public disciplinaActual(disciplina: string): void{
        this.disciplina = disciplina;
        console.log(`Disciplina: ${this.disciplina}`);
    }

}
let deportista1: SaltoEnAlto = new SaltoEnAlto()
deportista1.disciplinaActual("Salto en alto");
deportista1.nombreDeportista("Luis");
deportista1.añosDeportista(22);
deportista1.alturaMaxima(5);
deportista1.saltar(true);