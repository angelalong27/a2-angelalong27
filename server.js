const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // On Render, make sure `npm install` is your build command.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'book': 'The Hunger Games', 'author': 'Suzanne Collins', 'pagesRead': 150, 'totalPages': 374, 'percentComplete': 40 },
  { 'book': 'Catching Fire', 'author': 'Suzanne Collins', 'pagesRead': 200, 'totalPages': 391, 'percentComplete': 51 },
  { 'book': 'Mockingjay', 'author': 'Suzanne Collins', 'pagesRead': 100, 'totalPages': 390, 'percentComplete': 26 }, 
  { 'book': 'The Ballad of Songbirds and Snakes', 'author': 'Suzanne Collins', 'pagesRead': 250, 'totalPages': 528, 'percentComplete': 47 }, 
  { 'book': 'Sunrise on the Reaping', 'author': 'Suzanne Collins', 'pagesRead': 300, 'totalPages': 400, 'percentComplete': 75 }, 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/data' ) {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain'} )
    response.end( JSON.stringify( appdata ) )
  }else if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    if( request.url === '/delete' ) {
      const data = JSON.parse( dataString )
      appdata.splice( data.index, 1 )
    
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain'} )
      response.end( JSON.stringify( appdata ) )
      return
    }

    const newBook = JSON.parse( dataString ) 

    // ... do something with the data here!!!
    newBook.percentComplete = Math.round(( newBook.pagesRead / newBook.totalPages ) * 100 )

    if( newBook.index >= 0 ) {
      appdata[newBook.index] = newBook
    }else{
      appdata.push( newBook )
    }

    delete newBook.index

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })

    // change this to incorporate data
    response.end( JSON.stringify( appdata ) )
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHead( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHead( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )