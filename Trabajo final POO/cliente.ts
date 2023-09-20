import { randomUUID } from 'node:crypto';
import { Prestamos } from './prestamo';

export class Cliente{
    private id: string = randomUUID();
    private nombre: string;
    private apellido: string;
    private direccion: string;
    private cel: number;
    private puntos: number = 0;
    private penalizacion: boolean = false;
    public constructor(nombre: string, apellido: string, direccion: string, cel: number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.cel = cel;
    }
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
    public setApellido(apellido: string): void{
        this.apellido = apellido;
    }
    public setDireccion(direccion:string): void{
        this.direccion = direccion;
    }
    public setCel(cel:number): void{
        this.cel = cel;
    }
    public getId(): string{
        return this.id;
    }
    public getNombre(): string{
        return this.nombre;
    }
    public getApellido(): string{
        return this.apellido;
    }
    public getDireccion(): string{
        return this.direccion;
    }
    public getCel(): number{
        return this.cel;
    }
    public getPuntos(): number{
        return this.puntos;
    }
    public addPuntos(puntos: number):void{
        this.puntos += puntos;
    }
    public removePuntos(puntos: number): void{
        this.puntos -= puntos;
    }
    
}