var Universidad = /** @class */ (function () {
    function Universidad(nombre, direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.facultad = [];
    }
    Universidad.prototype.addFacultad = function (facultad) {
        this.facultad.push(facultad);
        console.log("Facultad agregada, ".concat(facultad.getFacultad()));
    };
    return Universidad;
}());
var Facultad = /** @class */ (function () {
    function Facultad(nombre) {
        this.nombre = nombre;
        this.alumnos = [];
        this.profesor = [];
    }
    Facultad.prototype.addAlumno = function (alumno) {
        this.alumnos.push(alumno);
        console.log("Alumno agregado, ".concat(alumno.getNombre()));
    };
    Facultad.prototype.addProfesor = function (profesor) {
        this.profesor.push(profesor);
        console.log("profesor agregado, ".concat(profesor.getApellido()));
    };
    Facultad.prototype.getFacultad = function () {
        return this.nombre;
    };
    return Facultad;
}());
var Alumno = /** @class */ (function () {
    function Alumno(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    Alumno.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Alumno.prototype.getNombre = function () {
        return this.nombre;
    };
    Alumno.prototype.setApellido = function (apellido) {
        this.apellido = apellido;
    };
    Alumno.prototype.getApellido = function () {
        return this.apellido;
    };
    Alumno.prototype.setEdad = function (edad) {
        this.edad = edad;
    };
    Alumno.prototype.getEdad = function () {
        return this.edad;
    };
    return Alumno;
}());
var Profesor = /** @class */ (function () {
    function Profesor(nombre, apellido, materia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.materia = materia;
    }
    Profesor.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Profesor.prototype.getNombre = function () {
        return this.nombre;
    };
    Profesor.prototype.setApellido = function (apellido) {
        this.apellido = apellido;
    };
    Profesor.prototype.getApellido = function () {
        return this.apellido;
    };
    Profesor.prototype.setMateria = function (materia) {
        this.materia = materia;
    };
    Profesor.prototype.getMateria = function () {
        return this.materia;
    };
    return Profesor;
}());
var universidad = new Universidad("Pepita", "9 de Julio");
var facultad1 = new Facultad("Medicina");
var alumno1 = new Alumno("Juan", "Martino", 33);
var profesor1 = new Profesor("Lucas", "Miguens", "Fisica");
facultad1.addAlumno(alumno1);
facultad1.addProfesor(profesor1);
universidad.addFacultad(facultad1);
