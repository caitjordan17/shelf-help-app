import React from "react";

function Book({book}){
    console.log('book.book in book',book.book)
    return(
        <div className="book">
            <img src={book.book.book_cover} alt={book.book.title} width="90%"/>
            <p>{book.book.title}</p>
            <p>by {book.book.author.name}</p>
        </div>
    )
}

export default Book;