import { Deportistas } from "./deportista";

class Fondo extends Deportistas{
    private correr: boolean;
    private velocidad: number;

    public constructor(){
        super();
        this.velocidad = 0;
        this.correr = true;
    }
    public AccionCorrer(a: boolean): void{
        if (a){
            this.correr = true;
            console.log(`Corriendo`);
        } else {
            console.log(`Quieto/Parado`);
        }
    }
    public velocidadMaxima(velocidad: number): void{
        this.velocidad = velocidad;
        console.log(`Velocidad maxima ${this.velocidad} km/h`);
    }
    public disciplinaActual(disciplina: string): void{
        this.disciplina = disciplina;
        console.log(`Disciplina: ${this.disciplina}`);
    }
}
let deportista2: Fondo = new Fondo();
deportista2.disciplinaActual("Fondo");
deportista2.nombreDeportista("Milagros");
deportista2.añosDeportista(19);
deportista2.velocidadMaxima(1.3);
deportista2.AccionCorrer(true);