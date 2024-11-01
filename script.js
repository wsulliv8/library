let tableBody = document.querySelector('tbody');
let form = document.querySelector('form');
let inputs = document.querySelectorAll('input');
let addButton = document.querySelector(".add-button");
let submitButton = document.querySelector(".submit");
addButton.addEventListener('click', () => {
  form.style.maxWidth = '100%';
  addButton.style.marginRight = '0';
})
submitButton.addEventListener('click', () => {
  console.log(inputs.values());
  let newBook = new Book(...inputs.values());
  addBook(newBook);
  form.reset();

  form.style.maxWidth = '0';
  addButton.style.transition = 'margin-right 0s 2.88s';
  addButton.style.marginRight = '392px';
})
let log = console.log;
const myLibrary = [];

function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.pages = pages;
}

Book.prototype.info = function () {
  let info = this.read 
  ? `${this.title} by ${this.author}, ${this.pages} pages, already read`
  : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
  return info;
}

function addBook() {
  for (let i = 0; i < arguments.length; i++) {
    myLibrary.push(arguments[i]);
  }
  displayBooks();
  return;
}

function displayBooks() {
  myLibrary.forEach((book) => {
    let newRow = document.createElement('tr');
    for (const prop in book){
      if(typeof book[prop] === 'function') continue;
      let data = document.createElement('td');
      data.innerText = book[prop];
      newRow.appendChild(data);
    }
    tableBody.appendChild(newRow);
  })
  return;
}


let book = new Book('The Hobbit', 'J.R.R. Tolkien',198, 0);
let bookTwo = new Book('The WoT', 'Old Guy',600, 1);
let bookThree = new Book('Narnia', 'C.S. Lewis',450, 0);

addBook(book, bookTwo, bookThree);

