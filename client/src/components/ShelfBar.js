import React, {useState} from "react";
import MoreButton from "./MoreButton";
import Book from "./Book";
import {Link} from "react-router-dom";

function ShelfBar({bshelf}){
    const [bookIndex, setBookIndex] = useState(0)
    console.log("bshelf",bshelf)
    console.log("bshelf.bookshelf_book", bshelf.bookshelf_book)
    console.log("bshelf.name", bshelf.name)

    const bookList = bshelf.bookshelf_book
        .slice(bookIndex, bookIndex + 4)
        .map((book) => (
            <Book className="bk-shelf-bar" key={book.id} book={book} />
        ))

    function handleClickMore(){
        setBookIndex((bookIndex) => (bookIndex + 4) % bshelf.books.length);
    }


    return(
        <div className="bar">
            <div className="background-box">
                <div className="belt">
                    {bookList}
                    <MoreButton onClickMore={handleClickMore} />
                </div>
                <h2 id={bshelf.id}>{bshelf.name}</h2>
                <p>created by {bshelf.user.username}</p>
                <Link className="link"to={`/browse/${bshelf.id}`}>See more</Link>
            </div>
        </div>
    )
}

export default ShelfBar;