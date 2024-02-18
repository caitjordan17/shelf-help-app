import React from "react";

function Book({book, handleClick}){
    // console.log("book obj in Book",book)
    return(
        <div className="book">
            <img 
                onClick={(e) => {handleClick(e.target.alt)}} 
                src={book.book_cover} 
                alt={book.title} 
                width="90%"/>
            <p>{book.title}</p>
            <p>by {book.author.name}</p> 
        </div>
    )
}

export default Book;