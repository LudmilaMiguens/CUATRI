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
exports.Revista = void 0;
var libreria_1 = require("./libreria");
var Revista = /** @class */ (function (_super) {
    __extends(Revista, _super);
    function Revista(titulo, editorial, año) {
        var _this = _super.call(this, titulo, año) || this;
        _this.editorial = editorial;
        return _this;
    }
    Revista.prototype.setEditorial = function (editorial) {
        this.editorial = editorial;
    };
    Revista.prototype.getEditorial = function () {
        return this.editorial;
    };
    return Revista;
}(libreria_1.Libreria));
exports.Revista = Revista;
