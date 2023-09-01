interface Electronica{
    getMarca(): string;
    getModelo(): string;
    getAño(): number;
}

class Telefono implements Electronica{
    private marca: string;
    private modelo: string;
    private año: number;
    private color: string;
    public constructor(marca: string, modelo: string, año: number, color: string){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
         this.color = color;
    }  
    public hacerLlamada(num: number): void{
        console.log(num);
    }
    public colorCelu(): string{
        return this.color
    }
    public getMarca(): string {
        return this.marca;
    }
    public getModelo(): string {
        return this.modelo;
    }
    public getAño(): number {
        return this.año;
    }
}
class Televisor implements Electronica{
    private marca: string;
    private modelo: string;
    private año: number;
    private canal: number
    public constructor(marca: string, modelo: string, año: number){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.canal = 1;
    }
    public cambiarCanal(canal: number): number{
        this. canal= canal
        return this.canal;
    }
    public canalActual(): number{
        return this.canal;
    }
    public getMarca(): string {
        return this.marca;
    }
    public getModelo(): string {
        return this.modelo;
    }
    public getAño(): number {
        return this.año;
    }
}

const xiaomi = new Telefono("Xiaomi", "2023", 2009, "azul");
console.log(xiaomi.getAño());
console.log(xiaomi.getMarca());
console.log(xiaomi.getModelo());
console.log(xiaomi.colorCelu());
xiaomi.hacerLlamada(2983387455);

const philco = new Televisor("Philco", "led", 2006);
console.log(philco.getAño());
console.log(philco.getMarca());
console.log(philco.getModelo());
console.log(philco.cambiarCanal(26));
console.log(philco.canalActual());