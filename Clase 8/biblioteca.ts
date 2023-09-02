interface Libreria{
    getTitulo(): string;
    getAño(): number;
}

class Libreria implements Libreria{
    private titulo: string;
    private año: number;
    public constructor(titulo: string, año: number){
        this.titulo =  titulo;
        this.año = año;
    }
    getTitulo(): string {
        return this.titulo;
    }
    getAño(): number {
        return this.año;
    }
}

class Libro extends Libreria{
    private autor:string;
    public constructor(titulo: string, autor: string, año: number){
        super(titulo, año,);
        this.autor = autor;
    }
    getAutor(): string{
        return this.autor;
    }
}

class Revista extends Libreria{
    private editorial: string;
    public constructor(titulo: string, editorial: string, año: number){
        super(titulo, año);
        this.editorial = editorial;
    }
    getEditorial(): string{
        return this.editorial;
    }
}

class Cliente{
    private nombre: string;
    private apellido: string;
    private direccion: string;
    private cel: number;
    public constructor(nombre: string, apellido: string, direccion: string, cel: number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.cel = cel;
    }
    getNombre(): string{
        return this.nombre;
    }
    getApellido(): string{
        return this.apellido;
    }
    getDireccion(): string{
        return this.direccion;
    }
    getCel(): number{
        return this.cel;
    }
}
class Prestamos{
    private cliente: Cliente;
    private elementos: Libreria;
    public constructor( cliente: Cliente, elementos: Libreria){
        this.cliente = cliente;
        this.elementos = elementos;
    }
    public getCliente(): void{
        console.log(this.cliente);
    }
    public getElementos(): void{
        console.log(this.elementos);
    }
}
class Biblioteca{
    private nombre: string;
    private domicilio: string;
    private clientes: Cliente[];
    private elementos: Libreria[];
    private prestamos: Prestamos[]
    public constructor(nombre: string, domicilio: string){
        this.nombre = nombre;
        this. domicilio = domicilio;
        this.clientes = [];
        this.elementos = [];
        this.prestamos = [];
    }
    public getNombre(): string{
        return this.nombre;
    }
    public getDomicilio(): string{
        return this.domicilio;
    }
    public addCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }
    public listaClientes(): void{
        console.log(this.clientes);
    }
    public addElemento(elemento: Libreria): void{
        this.elementos.push(elemento);
    }
    public listaElementos(): Libreria[]{
        return this.elementos
    }
    public addPrestamos(cliente:Cliente, elemento:Libreria): void{
        const nuevoPrestamo = new Prestamos(cliente,elemento);
        this.prestamos.push(nuevoPrestamo);
        console.log(this.prestamos);
    }   

    public listadoPrestamos(): Prestamos[]{
        return this.prestamos;
    }

}
let biblioteca1 = new Biblioteca("AS", "25 de mayo");
let libro1 = new Libro("Casita", "Cosito", 1896,);
let libro2 = new Libro("Casitassss", "Cositosss", 18966,);
let revista1 = new Revista("Moda", "Pindonga", 2013);
let cliente1 = new Cliente("Ludmila", "Miguens", "uriburu", 289355);
let cliente2 =new Cliente ("Toque", "Ruiz","pepito 22", 25892);
let cliente3 = new Cliente ("pepita", "Lopez", "Peron 55", 558542);
let prestamo1 = new Prestamos(cliente1, libro1);
let prestamo2 = new Prestamos (cliente2, libro1);
let prestamo3 = new Prestamos (cliente3, revista1);

biblioteca1.addPrestamos(cliente1,libro1);
biblioteca1.addPrestamos(cliente2,libro2);
biblioteca1.addPrestamos(cliente3,revista1);

biblioteca1.addCliente(cliente1);
biblioteca1.addCliente(cliente2);
biblioteca1.addCliente(cliente3);

biblioteca1.addElemento(libro1);
biblioteca1.addElemento(libro2);
biblioteca1.addElemento(revista1);

biblioteca1.listaClientes();
console.log(biblioteca1.listaElementos());
console.log(biblioteca1.listadoPrestamos());