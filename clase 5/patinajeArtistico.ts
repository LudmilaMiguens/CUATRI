import { Deportistas } from "./deportista";

class PatinajeArtistico extends Deportistas{
    private patinAjustado: boolean;
    private pirueta: string;

    public constructor(){
        super();
        this.pirueta = ""
    }
    public piruetaRealizada(pirueta: string): void{
        this.pirueta = pirueta;
        console.log(`Pirueta realizada: ${pirueta}`);
    }
    public ajustarPatin(patinAjustado : boolean): void{
        if(patinAjustado){
            this.patinAjustado = true;
            console.log("Patin Ajustado, sigue patinando");
        } else{
            console.log("Patin desajustado, ajustalos");
        }
    }
    public disciplinaActual(disciplina: string): void{
        this.disciplina = disciplina;
        console.log(`Disciplina: ${this.disciplina}`);
    }
}
let deportista3: PatinajeArtistico = new PatinajeArtistico();
deportista3.disciplinaActual("Patinaje artistico");
deportista3.nombreDeportista("Zoe");
deportista3.añosDeportista(6);
deportista3.ajustarPatin(true);
deportista3.piruetaRealizada("Vuelta doble");