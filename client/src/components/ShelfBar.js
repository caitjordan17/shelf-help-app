import React, {useState} from "react";
import MoreButton from "./MoreButton";
import Book from "./Book";

function ShelfBar({bshelf, handleClick}){
    const [bookIndex, setBookIndex] = useState(0)

    const bookList = bshelf.books
        .slice(bookIndex, bookIndex + 4)
        .map((book) => (
            <Book key={book.id} book={book} />
        ))

    function handleClickMore(){
        setBookIndex((bookIndex) => (bookIndex + 4) % bshelf.books.length);
    }

    return(
        <div className="bar">
            <div className="belt">
                {bookList}
                <MoreButton onClickMore={handleClickMore} />
            </div>
            <h2>{bshelf.name}</h2>
            <p>created by {bshelf.user.username}</p>
        </div>
    )
}

export default ShelfBar;