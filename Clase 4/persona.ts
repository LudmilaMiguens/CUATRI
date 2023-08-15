class Persona {
    private nombre : string;
    private años : number;

    public constructor(nombre: string, años: number) {
        this.nombre = nombre;
        this.años = años;
    }

public nombres(nombre: string) {
    this.nombre = nombre;
    return this.nombre;
}
public añoss(años:number){
    this.años = años;
    return this.años;
}
public info(){
   return this.nombre + this.años;
}
}
let ludmila =  new Persona("ludmila", 22);
ludmila.nombres("ludmila");
ludmila.añoss(22);
console.log(ludmila.info());
