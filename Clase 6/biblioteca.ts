/*Ejercicio para practicar. Enunciado:
Imagina que estás desarrollando un sistema de gestión de una biblioteca que mantiene un registro de libros. Cada libro tiene un título, un autor y un estado (disponible o prestado). Diseña una clase Book que encapsule esta información y proporcione métodos para gestionar el estado del libro. Libro y autor se integran por el mecanismo de composición. */
 
class Libro{
    private titulo: string;

    public constructor( tilulo: string){
        this.titulo = tilulo
    }
}

class Autor{
    private nombre: string;
    private apellido: string;

    public constructor(nombre: string, apellido: string){
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

class Book{
    private titulo: Libro;
    private autor: Autor;
    private estado: boolean;

    public constructor(titulo: Libro, autor: Autor){
        this.titulo = titulo;
        this.autor = autor;
        this.estado = true;
    }

    public devolverlibro():void {
        if (this.estado === false){
            this.estado = true;
            console.log("Libro devuelto.");
        } else{
            console.log("Libro disponible.");
        }
    }

    public pestarLibro(): void{
        if (this.estado = true){
            this.estado = false;
            console.log("Libro prestado.");
        } else{
            console.log("Libro no disponible.");
        }
    }

     public estadoDelLibro(): void{
        if (this.estado === true){
            console.log("Libro disponible.")
        } else{
            console.log("Libro prestado.")
        }
     }
}

let autor1 = new Autor("Ludmila", "Miguens");
let titulo = new Libro("La casa de papel");
let book1 = new Book(titulo, autor1);
book1.estadoDelLibro();
book1.devolverlibro();
book1.pestarLibro();
book1.estadoDelLibro();
book1.devolverlibro();
book1.estadoDelLibro();


