import React, {useState} from "react";

function Book({book, handleClick}){
    const [clicked, setClicked] = useState(false)
    
    return(
        <div className="book">
            <img 
                onClick={(e) => {handleClick(e.target.alt); setClicked(!clicked);}} 
                src={book.book_cover} 
                alt={book.title} 
                width="90%"/>
            <p>{book.title}</p>
            <p>by {book.author.name}</p> 
        </div>
    )
}

export default Book;