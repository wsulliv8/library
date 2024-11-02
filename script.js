let log = console.log;
const myLibrary = [];
let tableBody = document.querySelector('tbody');
let form = document.querySelector('form');
let inputs = document.querySelectorAll('input');
form.addEventListener('submit',(event)=> {
  event.preventDefault();

  const formData = new FormData(form);
  let haveRead = formData.get('have_read')==='on' ? 'Yes' : 'No';
  let newBook = new Book(formData.get('title'), formData.get('author'), haveRead, formData.get('number_pages'))

  addBook(newBook);
  form.reset();
})

function Book (title, author, read, pages) {
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
  displayBooks(arguments.length)
  return;
}

function displayBooks(numbBooks = myLibrary.length) {

  for (let i = myLibrary.length-numbBooks; i < myLibrary.length; i++){

    let newRow = document.createElement('tr');
    let book = myLibrary[i];
    for (const bookData in book){
      if(typeof book[bookData] === 'function') continue;
      let tableData = document.createElement('td');
      tableData.innerText = book[bookData];
      newRow.appendChild(tableData);
    }
    //create actions buttons
    newRow.insertAdjacentHTML('beforeend', 
      `<td>
        <button type="button" class="action-button">
          <span class="material-icons edit" data-index="${i}">edit</span>
        </button>
      <button type="button" class="action-button"s>
        <span class="material-icons close" data-index="${i}">close</span>
      </button>
      </td>`
    );
    tableBody.appendChild(newRow);

    let deleteButton = document.querySelector(`.material-icons.close[data-index="${i}"`);
    deleteButton.addEventListener('click', (event) => {
      //update DOM data attribute and myLibrary
      let index = +event.target.dataset.index;
      let buttons = document.querySelectorAll('.material-icons.close');
      for (let j = index; j<buttons.length; j++) buttons[j].dataset.index--;
      myLibrary.splice(index++, 1);
      document.querySelector(`tbody tr:nth-child(${index})`).remove();
    })
  }
  return;
}


let book = new Book('The Hobbit', 'J.R.R. Tolkien','No', 198);
let bookTwo = new Book('The WoT', 'Old Guy','Yes', 600);
let bookThree = new Book('Narnia', 'C.S. Lewis','No', 450);

addBook(book, bookTwo, bookThree);

