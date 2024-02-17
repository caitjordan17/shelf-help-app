import React from "react";

function Book({book, handleClick, clicked}){
    return(
        <div className="book">
            <div className={clicked ? "clicked" : "unclicked"}>
                <img 
                    onClick={(e) => handleClick(e.target.alt)} 
                    src={book.book_cover} 
                    alt={book.title} 
                    width="90%"/>
            </div>
            <p>{book.title}</p>
            <p>by {book.author.name}</p> 
        </div>
    )
}

export default Book;