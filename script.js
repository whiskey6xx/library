//with this web app we need to take input from the user, fill out information in a class constructor that creates a book object, the book object will contain
//the book title 

let library = [];
 
class book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

titleInput = document.querySelector("#title");
authorInput = document.querySelector("#author");
yearInput = document.querySelector("#year");




document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    console.log(titleInput.value);
    console.log(authorInput.value);
    console.log(yearInput.value);
    //create book object based on the input
    newBook = new book(titleInput.value, authorInput.value, yearInput.value);
    console.log(newBook.title);
    console.log(newBook.author);
    console.log(newBook.year);

    //need to create element
    //selects element from the dom with the ID of book-list
    const list = document.querySelector('#book-list');
    //creates an element in the dom as a table row
    const row = document.createElement('div');
    row.className = "grid-container";
    //sets the inner html of the table row with table data elements, each that have our pieces of info
    row.innerHTML = `
        <div class="grid-item">${newBook.title}</div>
        <div class="grid-item">${newBook.author}</div>
        <div class="grid-item">${newBook.year}</div>
        `;
    //calls the appendChild method of list to add the row
    list.appendChild(row);
    })