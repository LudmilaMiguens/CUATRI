/*Vamos a centrarnos en el uso de interfaces para modelar diferentes tipos de dispositivos electrónicos y sus funciones. Cada dispositivo tendrá diferentes características y funcionalidades. Vamos a utilizar interfaces para asegurarnos de que los dispositivos cumplan con ciertos métodos específicos.

Definición del problema:
Desarrollar un sistema que modele diferentes tipos de dispositivos electrónicos como teléfonos y televisores. Cada dispositivo tendrá propiedades como marca, modelo, año de fabricación, asi como funciones especificas. (cambiar de canal o hacer una llamada)*/

interface Electronica{
    getMarca(): string;
    getModelo(): string;
    getAño(): number;
}

class Electronica implements Electronica{
    private marca: string;
    private modelo: string;
    private año: number;

    public constructor(marca: string, modelo: string, año: number){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
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

class Telefono extends Electronica{
    private color: string;
    public constructor(marca: string, modelo: string, año: number,color: string){
        super(marca, modelo, año);
        this.color = color;
    }
    public hacerLlamada(num: number): void{
        console.log(num);
    }
    public colorCelu(): string{
        return this.color
    }
}
class Televisor extends Electronica{
    private canal: number
    public constructor(marca: string, modelo: string, año: number){
        super(marca,modelo,año);
        this.canal = 1;
    }
    public cambiarCanal(canal: number): number{
        this. canal= canal
        return this.canal;
    }
    public canalActual(): number{
        return this.canal;
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