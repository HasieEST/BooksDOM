const authorInput = document.querySelector('#author')
const bookInput = document.querySelector('#title')
const isbnInput = document.querySelector('#isbn')
const form = document.querySelector('form')

form.addEventListener('submit', addBook)

function addBook(e){
    // input values
    const author = authorInput.value
    const book = bookInput.value
    const isbn = isbnInput.value
    // creating <li> elements
    const li = document.createElement('li')
    // defining <li> CSS class
    li.className = 'list-group-item'
    const textBook = document.createTextNode(book)
    const textAuthor = document.createTextNode(isbn)
    const textIsbn = document.createTextNode(isbn)


    e.preventDefault()
}