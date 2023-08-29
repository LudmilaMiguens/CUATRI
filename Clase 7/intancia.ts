import { Autodeportivo } from "./vehiculo";
const auto1 = new Autodeportivo("ford", "ka", 1999, ["Vuela", "va rapido"]);

auto1.prender();
auto1.acelerar();
auto1.acelerar();
auto1.frenar();
auto1.apagar();
auto1.obtenerInfo();
console.log(auto1.accesorios);
