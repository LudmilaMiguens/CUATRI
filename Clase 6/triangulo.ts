import { Forma } from "./forma";
export class Triangulo extends Forma{
   public constructor(ancho: number, alto: number){
    super(ancho, alto);
   }
   public calcurarArea(): void{
    let area: number;
    area = this.ancho * this.alto / 2;
    console.log(area);
   }
}
