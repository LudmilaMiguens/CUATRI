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
var node_crypto_1 = require("node:crypto");
//clase base de los items en stock (revistas o libros)
var LibraryItem = /** @class */ (function () {
    function LibraryItem(title, year) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.isAvailable = true;
        this.title = title;
        this.year = year;
    }
    LibraryItem.prototype.setTitle = function (title) {
        this.title = title;
    };
    LibraryItem.prototype.setYear = function (year) {
        this.year = year;
    };
    LibraryItem.prototype.getTitle = function () {
        return this.title;
    };
    LibraryItem.prototype.getYear = function () {
        return this.year;
    };
    LibraryItem.prototype.isItemAvailable = function () {
        return this.isAvailable;
    };
    LibraryItem.prototype.markAsUnavailable = function () {
        this.isAvailable = false;
    };
    LibraryItem.prototype.markAsAvailable = function () {
        this.isAvailable = true;
    };
    return LibraryItem;
}());
//libros
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(title, year, author) {
        var _this = _super.call(this, title, year) || this;
        _this.author = author;
        return _this;
    }
    Book.prototype.setAuthor = function (author) {
        this.author = author;
    };
    Book.prototype.getAuthor = function () {
        return this.author;
    };
    return Book;
}(LibraryItem));
//revistas
var Magazine = /** @class */ (function (_super) {
    __extends(Magazine, _super);
    function Magazine(title, year, editor) {
        var _this = _super.call(this, title, year) || this;
        _this.editor = editor;
        return _this;
    }
    Magazine.prototype.setEditor = function (editor) {
        this.editor = editor;
    };
    Magazine.prototype.getEditor = function () {
        return this.editor;
    };
    return Magazine;
}(LibraryItem));
//los lectores
var User = /** @class */ (function () {
    function User(name, address, phoneNumber) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.setAddress = function (address) {
        this.address = address;
    };
    User.prototype.getAddress = function () {
        return this.address;
    };
    User.prototype.setPhoneNumber = function (phoneNumber) {
        this.phoneNumber = phoneNumber;
    };
    User.prototype.getPhoneNumber = function () {
        return this.phoneNumber;
    };
    return User;
}());
//Préstamos
var Loan = /** @class */ (function () {
    function Loan(item, user) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.item = item;
        this.user = user;
        this.loanDate = new Date();
        this.dueDate = new Date();
        this.dueDate.setDate(this.loanDate.getDate() + 7);
    }
    Loan.prototype.getId = function () {
        return this.id;
    };
    Loan.prototype.getItem = function () {
        return this.item;
    };
    Loan.prototype.getUser = function () {
        return this.user;
    };
    Loan.prototype.getLoanDate = function () {
        return this.loanDate;
    };
    Loan.prototype.getDueDate = function () {
        return this.dueDate;
    };
    return Loan;
}());
//clase gestora
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
        this.users = [];
        this.loans = [];
    }
    Library.prototype.addItem = function (item) {
        this.items.push(item);
    };
    Library.prototype.addUser = function (user) {
        this.users.push(user);
    };
    Library.prototype.loanItem = function (item, user) {
        if (!this.isUserValid(user)) {
            console.log("Usuario no registrado");
            return;
        }
        var existingItem = this.findItem(item);
        if (!existingItem || !existingItem.isItemAvailable()) {
            console.log("Item no está disponible.");
            return;
        }
        existingItem.markAsUnavailable();
        var loan = new Loan(existingItem, user);
        this.loans.push(loan);
        console.log("".concat(user.getName(), " retira \"").concat(item.getTitle(), "\" con fecha de devoluci\u00F3n ").concat(loan
            .getDueDate()
            .toLocaleDateString()));
    };
    Library.prototype.returnItem = function (item, user) {
        var loan = this.findActiveLoan(item, user);
        if (!loan) {
            console.log("Préstamo no registrado. Revise Título y Usuario");
            return;
        }
        var existingItem = this.findItem(item);
        if (existingItem) {
            existingItem.markAsAvailable();
        }
        this.loans = this.loans.filter(function (l) { return l !== loan; });
        console.log("".concat(user.getName(), " devolvi\u00F3 \"").concat(item.getTitle(), "\""));
    };
    Library.prototype.findActiveLoan = function (item, user) {
        return this.loans.find(function (loan) { return loan.getItem() === item && loan.getUser() === user; });
    };
    Library.prototype.isUserValid = function (user) {
        return this.users.includes(user);
    };
    Library.prototype.findItem = function (item) {
        return this.items.find(function (i) { return i === item; });
    };
    return Library;
}());
var library = new Library();
var book01 = new Book("A sangre fía", 1977, "Rodolfo Walsh");
var magazine01 = new Magazine("Pronto", 2011, "Random House Penguin sarasa");
var user01 = new User("Marcelo Bettini", { street: "Humberto Primo", number: 602, apartment: "1C" }, "123-444-555");
var user02 = new User("Sergio Fino", {
    street: "Av. Alicia Moreau de Justo",
    number: 1050,
    apartment: "2B"
}, "555-555-555");
library.addItem(book01);
library.addItem(magazine01);
library.addUser(user01);
library.loanItem(book01, user01);
library.loanItem(book01, user02); //usuario no registrado
library.addUser(user02); //agrega usuario
library.loanItem(book01, user02); //item no disponible
library.returnItem(book01, user01); //ahora vuelve a estar disponible
library.loanItem(book01, user02); //OK
