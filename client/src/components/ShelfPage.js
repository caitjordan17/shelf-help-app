import React from "react";
import BookCard from "./BookCard";

function ShelfPage({bookshelf}){
    
    
    return(
        <div className="bookshelfCard">
            <h2>{bookshelf.name}</h2>
            <h5>created by {bookshelf.user.username}</h5>
            {bookshelf.books.map((book) => (
                <BookCard book={book} key={book.id} />
            ))}
        </div>
    )
}

export default ShelfPage;