"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Autodeportivo = void 0;
var Vehiculo = /** @class */ (function () {
    function Vehiculo(marca, modelo, año) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.estadoPrendido = true;
        this.velocidadActual = 0;
    }
    Vehiculo.prototype.prender = function () {
        this.estadoPrendido = true;
        console.log("Auto en marcha");
    };
    Vehiculo.prototype.apagar = function () {
        this.estadoPrendido = false;
        console.log("Auto apagado");
    };
    Vehiculo.prototype.obtenerInfo = function () {
        console.log("marca: ".concat(this.marca, ", modelo: ").concat(this.modelo, ", a\u00F1o: ").concat(this.año, ", estado: ").concat(this.estadoPrendido, ", velocidad actual: ").concat(this.velocidadActual));
    };
    return Vehiculo;
}());
var Autodeportivo = /** @class */ (function (_super) {
    __extends(Autodeportivo, _super);
    function Autodeportivo(marca, modelo, año, accesorios) {
        var _this = _super.call(this, marca, modelo, año) || this;
        _this.accesorios = accesorios;
        return _this;
    }
    Autodeportivo.prototype.acelerar = function () {
        this.velocidadActual += 50;
    };
    Autodeportivo.prototype.frenar = function () {
        this.velocidadActual -= 10;
    };
    return Autodeportivo;
}(Vehiculo));
exports.Autodeportivo = Autodeportivo;
