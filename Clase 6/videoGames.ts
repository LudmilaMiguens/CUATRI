class Personaje {
    private nombre;
    private vida;
    private energia;

    public constructor() {
        this.nombre = "";
        this.vida = 0;
        this.energia = 0;
    }

    public nombreDelPersonaje (nombre: string){
        this.nombre = nombre;
        console.log(this.nombre);
    }
    
    public vidaDelPersonaje (vida: number){
        this.vida = vida;
        console.log(this.vida);
    }

    public energiaDelPersonaje(energia: number){
        this.energia = energia
        console.log(this.energia);
    }
}

class Guerrero extends Personaje{
    private fuerza;

    public constructor(fuerza: number){
        super()
        this.fuerza = fuerza;
    }

    public usarEscudo(){
        console.log( "Usando Escudo");
    }

}

class Mago extends Personaje{
    private hechizo;

    public constructor(hechizo: string) {
        super();
        this.hechizo = hechizo;
    }
    
    public lanzarHechizo(){
        console.log("Lanzando hechizo", this.hechizo);
    }
}

let guerrero1 : Guerrero = new Guerrero(50);
guerrero1.nombreDelPersonaje("Mora");
guerrero1.energiaDelPersonaje(100);
guerrero1.vidaDelPersonaje(10);
guerrero1.usarEscudo();

let mago1 : Mago = new Mago("volar");
mago1.nombreDelPersonaje("Mario");
mago1.energiaDelPersonaje(100);
mago1.vidaDelPersonaje(10);
mago1.lanzarHechizo();