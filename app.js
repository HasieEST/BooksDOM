const authorInput = document.querySelector('#author')
const bookInput = document.querySelector('#title')
const isbnInput = document.querySelector('#isbn')
const form = document.querySelector('form')

form.addEventListener('submit', addBook)

function addBook(e){
    // input values.
    const author = authorInput.value
    const book = bookInput.value
    const isbn = isbnInput.value
    console.log(author)
    console.log(book)
    console.log(isbn)
    e.preventDefault()
}