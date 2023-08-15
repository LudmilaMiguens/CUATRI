class calculadora{
 public sumar(a: number, b: number): number{
   return  a + b;
 }
 public restar (a: number, b: number): number{
    return a - b;
 }
 public multiplicar (a: number, b: number): number{
   return a * b;
}
public dividir (a: number, b: number): number{
   return a / b;
}
}

let cal1 = new calculadora();
console.log(cal1.restar(10,5));
console.log(cal1.sumar(10,5));
console.log(cal1.dividir(10,5));
console.log(cal1.multiplicar(10,5));