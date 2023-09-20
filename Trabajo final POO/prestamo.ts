import { randomUUID } from 'node:crypto';
import { Cliente } from './cliente';
import { Libreria } from './libreria';

export class Prestamos{
    private id: string = randomUUID();
    private cliente: Cliente;
    private elementos: Libreria;
    private fechaInicio: Date;
    private fechaVencimiento: Date;
    
    public constructor( cliente: Cliente, elementos: Libreria){
        this.cliente = cliente;
        this.elementos = elementos;
        this.fechaInicio = new Date();
        this.fechaVencimiento = new Date();
        this.fechaVencimiento.setDate(this.fechaInicio.getDate()+7);
    }
    public getId(): string{
        return this.id;
    }
    public getCliente(): Cliente{
       return this.cliente;
    }
    public getElementos(): Libreria{
        return this.elementos;
    }
    public getFechaInicio(): Date{
        return this.fechaInicio;
    }
    public getVencimiento(): Date{
        return this.fechaVencimiento;
    }
}