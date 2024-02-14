import React from "react";

function Book({book}){
    // console.log('book.book in book',book.book)
    // console.log("book in book", book)
    return(
        <div className="book">
            <img src={book.book_cover} alt={book.title} width="90%"/>
            <p>{book.title}</p>
            <p>by {book.author.name}</p>
        </div>
    )
}

export default Book;