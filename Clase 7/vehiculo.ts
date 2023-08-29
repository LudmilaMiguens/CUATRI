abstract class Vehiculo {
    private marca: string;
    private modelo: string;
    private año: number;
    private estadoPrendido: boolean;
    protected velocidadActual: number

    public constructor(marca: string, modelo: string, año: number){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.estadoPrendido = true;
        this.velocidadActual = 0;
    }
    public prender(): void{
        this.estadoPrendido = true;
        console.log("Auto en marcha");
    }
    public apagar(): void {
        this.estadoPrendido = false;
        console.log("Auto apagado");
    }

    public obtenerInfo(): void{
        console.log(`marca: ${this.marca}, modelo: ${this.modelo}, año: ${this.año}, estado: ${this.estadoPrendido}, velocidad actual: ${this.velocidadActual}`);
    }
    abstract acelerar(): void;
    abstract frenar(): void;
}

export class Autodeportivo extends Vehiculo{
    public accesorios: string[];
    public constructor(marca: string, modelo: string, año: number, accesorios: string[]){
        super(marca, modelo, año);
        this.accesorios = accesorios;

    }
    acelerar(): void {
        this.velocidadActual += 50;
    }
    frenar(): void {
        this.velocidadActual -=10;
    }

}