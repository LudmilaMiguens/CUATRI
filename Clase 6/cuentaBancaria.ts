/*Ejercicio 1: Encapsulamiento y Abstracción

Enunciado:
Crea una clase llamada BankAccount que represente una cuenta bancaria. Esta clase debe tener atributos privados para el titular de la cuenta (owner), el saldo actual (balance) y el tipo de cuenta (accountType). Implementa métodos públicos para depositar dinero (deposit), retirar dinero (withdraw) y obtener el saldo actual (getBalance). Además, utiliza la abstracción para ocultar los detalles internos del funcionamiento de la cuenta.*/

enum AccountTypesEnum{
    cuentaCorriente ="Cuenta corriente",
    cajaAhorro = "Caja ahorro",
    cuentaDolar = "cuenta dolar",
    cuentaPesos = " Cuenta pesos",
    cuentaSueldo = "Cuenta sueldo",
}
export class AccountTypes {
    private tipo : AccountTypesEnum
    
   public constructor(tipo: AccountTypesEnum){
    this.tipo = tipo;      
    }
}

class BankAccount {
    private owner;
    private balance;
    private accountTypes;
    
    public constructor(owner: string, accountTypes: AccountTypesEnum){
        this.owner = owner;
        this.balance = 0;
        this.accountTypes = accountTypes;
    }

    public deposit(a: number): void {
        if (a > 0){
         this.balance += a;   
         console.log("Usted deposito", a, "En la cuenta de",this.owner);
        }
    }

    public withdraw(b: number): void{
        if (b > 0 && b <= this.balance){
            this.balance -= b;
            console.log("usted retiro",b,);
        } else{
            console.log("Saldo isuficiente");
        }
    }
    public getBalance(): number{
        return this.balance;
    }
}
let cuenta1 = new BankAccount("Ludmila", AccountTypesEnum.cuentaDolar);
cuenta1.deposit(300);
cuenta1.withdraw(50);
console.log("saldo actual",cuenta1.getBalance(),);