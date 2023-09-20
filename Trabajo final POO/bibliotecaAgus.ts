import { randomUUID as uid } from "node:crypto";
interface iAddress {
  street: string;
  number: number;
  apartment: string;
}
//clase base de los items en stock (revistas o libros)
class LibraryItem {
  private id: string = uid();
  private title: string;
  private year: number;
  private isAvailable: boolean = true;
  public constructor(title: string, year: number) {
    this.title = title;
    this.year = year;
  }
  public setTitle(title: string): void {
    this.title = title;
  }
  public setYear(year: number): void {
    this.year = year;
  }
  public getTitle(): string {
    return this.title;
  }
  public getYear(): number {
    return this.year;
  }
  public isItemAvailable(): boolean {
    return this.isAvailable;
  }
  public markAsUnavailable() {
    this.isAvailable = false;
  }
  public markAsAvailable() {
    this.isAvailable = true;
  }
}

//libros
class Book extends LibraryItem {
  private author: string;
  public constructor(title: string, year: number, author: string) {
    super(title, year);
    this.author = author;
  }
  public setAuthor(author: string): void {
    this.author = author;
  }
  getAuthor() {
    return this.author;
  }
}
//revistas
class Magazine extends LibraryItem {
  private editor: string;
  public constructor(title: string, year: number, editor: string) {
    super(title, year);
    this.editor = editor;
  }
  public setEditor(editor: string): void {
    this.editor = editor;
  }
  getEditor() {
    return this.editor;
  }
}

//los lectores
class User {
  private id: string = uid();
  private name: string;
  private address: iAddress;
  private phoneNumber: string;
  private scoring: number = 0;
  private isPenalized: boolean = false;
  public constructor(name: string, address: iAddress, phoneNumber: string) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  public getId(): string {
    return this.id;
  }
  public setName(name: string): void {
    this.name = name;
  }
  public getName(): string {
    return this.name;
  }
  public setAddress(address: iAddress): void {
    this.address = address;
  }
  public getAddress(): iAddress {
    return this.address;
  }
  public setPhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber;
  }
  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getScoring(): number {
    return this.scoring;
  }
  public increaseScoring(points: number): void {
    this.scoring += points;
  }

  public decreaseScoring(points: number): void {
    this.scoring -= points;
  }
}

//Préstamos
class Loan {
  private id: string = uid();
  private item: LibraryItem;
  private user: User;
  private loanDate: Date;
  private dueDate: Date;

  constructor(item: LibraryItem, user: User) {
    this.item = item;
    this.user = user;
    this.loanDate = new Date();
    this.dueDate = new Date();
    this.dueDate.setDate(this.loanDate.getDate() + 7);
  }

  getId(): string {
    return this.id;
  }
  getItem(): LibraryItem {
    return this.item;
  }
  getUser(): User {
    return this.user;
  }
  getLoanDate(): Date {
    return this.loanDate;
  }
  getDueDate(): Date {
    return this.dueDate;
  }
}
//clase gestora

class Library {
  private items: LibraryItem[];
  private users: User[];
  private loans: Loan[];
  public constructor() {
    this.items = [];
    this.users = [];
    this.loans = [];
  }
  addItem(item: LibraryItem): void {
    this.items.push(item);
  }
  addUser(user: User): void {
    this.users.push(user);
  }
  loanItem(item: LibraryItem, user: User): void {
    if (!this.isUserValid(user)) {
      console.log("Usuario no registrado");
      return;
    }
    const existingItem: LibraryItem | undefined = this.findItem(item);
    if (!existingItem || !existingItem.isItemAvailable()) {
      console.log("Item no está disponible.");
      return;
    }
    // paso todas las validaciones
    existingItem.markAsUnavailable();
    const loan = new Loan(existingItem, user);
    this.loans.push(loan);
    console.log(
      `${user.getName()} retira "${item.getTitle()}" con fecha de devolución ${loan
        .getDueDate()
        .toLocaleDateString()}`
    );
  }

  returnItem(item: LibraryItem, user: User, returnDate: Date): void {
    const loan = this.findActiveLoan(item, user);
    if (!loan) {
        throw new Error("Préstamo no registrado. Revise Título y Usuario");
       
      console.log("Préstamo no registrado. Revise Título y Usuario");
      return;
    }
    const existingItem = this.findItem(item);
    if (existingItem) {
      existingItem.markAsAvailable();
    }

    const dueDate = loan.getDueDate();
    if (returnDate > dueDate) {
      const lateDays = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
      const lateFee = lateDays * 1; // Assuming a penalty of 1 unit per day late
      // switch para calcular los puntos
      user.increaseScoring(lateFee);
      
      console.log(`${user.getName()} devolvió "${item.getTitle()}" tarde. Penalización: ${lateFee} puntos.`);
    } else {
      console.log(`${user.getName()} devolvió "${item.getTitle()}" a tiempo.`);
    }
    this.loans = this.loans.filter((resLoan) => resLoan !== loan);
    console.log(`${user.getName()} devolvió "${item.getTitle()}" en la fecha "${returnDate.toLocaleDateString()}"`);
  }
  private findActiveLoan(item: LibraryItem, user: User): Loan | undefined {
    return this.loans.find(
      (loan) => loan.getItem() === item && loan.getUser() === user
    );
  }
  private isUserValid(user: User): boolean {
    return this.users.includes(user);
  }
  private findItem(item: LibraryItem): LibraryItem | undefined {
    return this.items.find((i) => i === item);
  }
}


const library = new Library();
const book01 = new Book("A sangre fría", 1977, "Rodolfo Walsh");
const magazine01 = new Magazine("Pronto", 2011, "Random House Penguin sarasa");
const user01 = new User(
  "Marcelo Bettini",
  { street: "Humberto Primo", number: 602, apartment: "1C" },
  "123-444-555"
);
const user02 = new User(
  "Sergio Fino",
  {
    street: "Av. Alicia Moreau de Justo",
    number: 1050,
    apartment: "2B",
  },
  "555-555-555"
);



library.addItem(book01);
library.addItem(magazine01);
library.addUser(user01);
// library.addUser(user02); //agrega usuario
library.loanItem(book01, user01);
library.loanItem(book01, user02); //usuario no registrado

library.loanItem(book01, user02); //item no disponible
const returnDate = new Date();
console.log( returnDate);
library.returnItem(book01, user01, returnDate); //ahora vuelve a estar disponible
library.loanItem(book01, user02); //OK