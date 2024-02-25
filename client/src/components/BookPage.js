import React, { useState, useEffect } from "react";
import Book from "./Book";
import AddBook from "./AddBook";

function BookPage(){
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch("/books")
          .then((r) => r.json())
          .then((data) =>setBooks(data));
    }, []);

    function onAddBook(bookObj){
        setBooks([...books, bookObj]);
    }
    function handleImgClick(){
        console.log("clicked")
    }
    let shelfID=null
    let authorizedToEdit = false

    return(
        <div id="bookshelfCard">
            <h2 className="bk-h2"> All Books </h2>
            <AddBook onAddBook={onAddBook}/>
            <div id="book-list">
                {books ? books.map((book) => (
                    <Book bkshelfbk={shelfID} shelfID={shelfID} authorizedToEdit={authorizedToEdit} book={book} key={book.id} handleClick={handleImgClick}/>
                )) : <p>Loading...</p>}
            </div>
        </div>
    )
}

export default BookPage;