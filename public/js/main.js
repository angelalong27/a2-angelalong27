// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const book = document.querySelector( '#book' ),
        author = document.querySelector( '#author' ),
        pagesRead = document.querySelector( '#pagesRead' ),
        totalPages = document.querySelector( '#totalPages' ),

        json = { book: book.value, author: author.value, pagesRead: pagesRead.value, totalPages: totalPages.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'text:', text )

  const data = JSON.parse( text )
  const readingList = document.querySelector( '#readingList' )
  
  readingList.innerHTML = ''
  
  data.forEach( function( book ) {
    readingList.innerHTML += 
    `<tr>
    <td>${book.book}</td>
    <td>${book.author}</td>
    <td>${book.pagesRead}</td>
    <td>${book.totalPages}</td>
    <td>${book.percentComplete}%</td>
    </tr>`
  })
}

const loadBooks = async function() {
  const response = await fetch( '/data' )
  const text = await response.text()

  console.log( 'data:', text )
}

window.onload = function() {
  const button = document.querySelector('button')
  button.onclick = submit

  loadBooks()
}