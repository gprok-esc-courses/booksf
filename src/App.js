import React, { useState } from "react"
import BookPages from "./components/BookPages"
import BookTitle from "./components/BookTitle"
import FrontPage from "./components/FrontPage"

function App() {

  const [title, setTitle] = useState('')
  const [pages, setPages] = useState('N/A')
  const [image, setImage] = useState('')

  function getBook() {
    let isbn = document.getElementById('isbn').value 
    console.log("searching ... " + isbn)
    fetch('https://openlibrary.org/isbn/'+isbn+'.json')
    .then(response => {
      if(response.ok) {
        response.json().then(data => {
          console.log(data)
          updateBook(data, isbn)
        })
      }
      else {
        clearState()
      }
    })
  }


  function updateBook(data, isbn) {
    setTitle(data['title'])
    if(typeof data['number_of_pages'] === 'undefined') {
      setPages('N/A')
    }
    else {
      setPages(data['number_of_pages'])
    }
    setImage('https://covers.openlibrary.org/b/isbn/'+isbn+'-M.jpg')
  }


  function clearState() {
    setTitle('ERROR: Not Found')
    setPages('N/A')
    setImage('')
  }
  

  return (
    <div>
      <h1>Book search</h1>
      <div>
        ISBN: <input type='text' id='isbn' /> <button onClick={getBook}>FIND</button>
      </div>
      <BookTitle title={title} />
      <BookPages pages={pages} />
      <FrontPage image={image} />
      
    </div>
  );
}

export default App;
