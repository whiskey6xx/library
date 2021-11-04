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

class UI {
    static displayBooks() {
        const books = Store.grabBooks();
        books.forEach((book) => UI.addBook(book));
    }

    static addBook(book) {
    //need to create element
    //selects element from the dom with the ID of book-list
    const list = document.querySelector('#book-list');
    //creates an element in the dom as a table row
    const entry = document.createElement('div');
    entry.className = "grid-container";
    //sets the inner html of the table row with table data elements, each that have our pieces of info
    entry.innerHTML = `
        <div class="grid-item">${book.title}</div>
        <div class="grid-item">${book.author}</div>
        <div class="grid-item">${book.year}</div>
        <a href="#" class="delete-button">x</a>
        `;
    //calls the appendChild method of list to add the row
    list.appendChild(entry);
    }

    static removeBook(element) {
        if (element.classList.contains('delete-button')) {
            console.log(element);
            element.parentElement.remove();
        }
    }

    static clear() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#year").value = '';
    }
    
}

class Store {
    static grabBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        console.log(books);
        return books;
        
    }

    static addBook(book) {        
        const books = Store.grabBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.grabBooks();
        books.forEach((book, index) => {
            if (book.title === title) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

class alerts {
    static bookAdded() {
        alert("Book added successfully!")
    }
    static bookRemoved() {
        alert("Book removed successfully!")
    }
    static invalidEntry() {
        alert("Invalid Entry! Please input valid entries!")
    }
}

//function that checks if the variable is a integer
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };

//listens for page load up and displays the books
document.addEventListener('DOMContentLoaded', (UI.displayBooks(), console.log(Store.grabBooks)))


//listen for form submission
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    
    //form values
    titleInput = document.querySelector("#title").value;
    authorInput = document.querySelector("#author").value;
    yearInput = document.querySelector("#year").value;

    //form validation
    if(titleInput === '' || authorInput === '' || yearInput === '') {
        alerts.invalidEntry();
    } else if (isNumber(yearInput) === false) {
        alerts.invalidEntry();
    } else {
        //create book object based on the input
        newBook = new book(titleInput, authorInput, yearInput);
        Store.addBook(newBook);
        UI.addBook(newBook);
        UI.clear();
        alerts.bookAdded();
    }

})

//listen for delete 
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.removeBook(e.target);
    Store.removeBook(e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
})