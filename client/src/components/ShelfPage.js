import React from "react";
import Book from "./Book";
import { NavLink } from "react-router-dom";

function ShelfPage({bookshelf, handleBackClick}){
    
    
    return(
        <div className="bookshelfCard">
            <NavLink className="navButton" exact to="/">Back</NavLink>
            <h2>{bookshelf.name}</h2>
            <p>created by {bookshelf.user.username}</p>
            {bookshelf.books.map((book) => (
                <Book book={book} key={book.id} />
            ))}
        </div>
    )
}

export default ShelfPage;