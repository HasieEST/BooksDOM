// Raamatu konstruktor
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

// Klass, mis tegeleb veebilehitsejaga
class UI {
    static displayBooks() {
        const books = Storage.bookStorage()
        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')

        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-outline-danger delete">X</a></td>
        `
        list.appendChild(row)
    }

    static deleteBookFromList(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static alertUser(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)

        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }
}

//Local Storage
class Storage {
    static bookStorage() {
        let books
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book) {
        const books = Storage.bookStorage()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static deleteBook(isbn) {
        const books = Storage.bookStorage()

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}


//Event: Raamatute ekraanile lisamine
document.addEventListener('DOMContentLoaded', UI.displayBooks)
//Event: Raamatu lisamine listi
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    // Kontrollime, et väljad on täidetud
    let book;
    if (title === '' || author === '' || isbn === '') {
        UI.alertUser('Täida kõik väljad ära', 'danger')
    } else {
        book = new Book(title, author, isbn)
        UI.addBookToList(book)
        Storage.addBook(book)
        UI.alertUser('Raamat on edukalt lisatud', 'success')
        UI.clearFields()
    }
})

//Event: Raamtu kustutamine listist

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBookFromList(e.target)
    Storage.deleteBook(e.target.parentElement.previousElementSibling.textContent)
    UI.alertUser('Raamat on edukalt lisatud', 'success')
})