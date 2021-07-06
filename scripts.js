
document.querySelector('#bookInputForm').addEventListener('submit', saveBook);

let myLibrary = [];

function Book(id, title, author, pages, readStatus) {
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${ readStatus ? 'read' : 'not read yet'}`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function saveBook(e) {
    const id = chance.guid();
    const title = document.querySelector('#bookTitleInput').value;
    const author = document.querySelector('#bookAuthorNameInput').value;
    const pages = document.querySelector('#bookPagesInput').value;
    const readStatus = document.querySelector('#readStatusInput').checked; // true or false
    console.log(readStatus);

    const bookToAdd = new Book(id, title, author, pages, readStatus);

    const listOfBooks = JSON.parse(localStorage.getItem('books')) || [];

    listOfBooks.push(bookToAdd);

    localStorage.setItem('books', JSON.stringify(listOfBooks));
    
    document.querySelector('#bookInputForm').reset();

    fetchBooks();
    e.preventDefault();
}

function bookList() {
    let bookList = JSON.parse(localStorage.getItem('books'));
    if (!bookList) {
        bookList = [];
    }
    return bookList;
}

function createBookDivTemplate(book) {
    if (book.readStatus) {
        return (
            `<div class="well">
                    <h3>${book.title} <span class="badge badge-pill badge-success">Read</span></h3>
                    <h4>Author: ${book.author}</h4>
                    <h4>Number of pages: ${book.pages} </h4>
                    <a href="#" class="btn btn-danger" onclick="deleteBook('${book.id}')">Delete Book</a>
                    <a href="#" class="btn btn-info" onclick="openGoodReads('${book.title}')">View it in Goodreads</a>
            </div>`
        );
    } else {
        return (
            `<div class="well">
                <h3>${book.title} <span class="badge badge-pill badge-success">Not Read</span></h3>
                <h4>Author: ${book.author}</h4>
                <h4>Number of pages: ${book.pages} </h4>
                <a href="#" class="btn btn-success" onclick="markBookAsRead('${book.id}')">Mark book as read</a>
                <a href="#" class="btn btn-danger" onclick="deleteBook('${book.id}')">Delete Book</a>
                <a href="#" class="btn btn-info" onclick="openGoodReads('${book.title}')">View it in Goodreads</a>
            </div>`
        );
    }
}
/* ESTA NO FUNCA PORQUE QUIERO QUE EL MARKBOOKASREAD SOLO APAREZCA CUANDO NO LO LEYO
function createBookDivTemplate(book) {
    return (
           `<div class="well">
                <h3>${book.title} <span class="badge badge-pill badge-success">${ (book.readStatus ? "Read" : "Not Read")}</span></h3>
                <h4>Author: ${book.author}</h4>
                <h4>Number of pages: ${book.pages} </h4>
                ${(!book.readStatus ? "<a href='#' class='btn btn-success' onclick='markBookAsRead('"+book+"')'>Mark book as read</a>" : "")}
                <a href="#" class="btn btn-danger" onclick="deleteBook('${book.id}')">Delete Book</a>
                <a href="#" class="btn btn-info" onclick="openGoodReads('${book.title}')">View it in Goodreads</a>
            </div>`
    );
}
*/

function markBookAsRead(id) {

    const books = this.bookList(); 

    for(let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
              books[i].readStatus = true;
        }
    }

    localStorage.setItem('books', JSON.stringify(books));

    fetchBooks();
}


function openGoodReads(title) {
    window.open(`https://www.goodreads.com/search?utf8=%E2%9C%93&query=${title}`, '_blank');
}


function deleteBook(id) {
    const books = this.bookList(); 

    for(let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
              books.splice(i, 1);
        }
    }

    localStorage.setItem('books', JSON.stringify(books));

    fetchBooks();
}


function fetchBooks() {
    const books = this.bookList();
    const bookListDiv = document.querySelector('#bookListDiv');
    let bookListDivHtml = '';

    
    books.forEach((element) => {
        bookListDivHtml += createBookDivTemplate(element);
        console.log(element.readStatus)
    });
    
    /*
    for( let j = 0; j < books.length; j++) {

        bookListDivHtml += createBookDivTemplate(books[j]);
        console.log(books[j]);
    }
    */

    bookListDiv.innerHTML = bookListDivHtml;
}