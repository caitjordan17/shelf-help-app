import React from "react";

function Book({book}){
    return(
        <div className="book">
            <img src={book.book_cover} alt={book.title} width="90%"/>
        </div>
    )
}

export default Book;