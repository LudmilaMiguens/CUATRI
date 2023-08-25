import { Forma } from "./forma";
export class Rectangulo extends Forma{
   public constructor(ancho: number, alto: number){
    super(ancho, alto);
   }
   public calcurarArea(): void{
    let area = this.ancho * this.alto;
    console.log(area);
   }
}