import React, { useState } from "react";
import MoreButton from "./MoreButton";
import Book from "./Book";
import { Link } from "react-router-dom";

function ShelfBar({ bshelf }){
    const [bookIndex, setBookIndex] = useState(0)

    function handleClickMore(){
        setBookIndex((bookIndex) => (bookIndex + 4) % bshelf.bookshelf_book.length);
    }

    let authorizedToEdit = false
    let shelfID=null
  
    const bookList = bshelf.bookshelf_book
        .slice(bookIndex, bookIndex + 4)
        .map((book) => (
            <Book clsName="bk-shelf-bar" bkshelfbk={shelfID} shelfID={shelfID} authorizedToEdit={authorizedToEdit} key={book.book.id} book={book.book} handleClick={handleImgClick}/>
        ))

    function handleImgClick(){
        console.log("clicked")
    }

    return(
        <div className="bar">   
            {bshelf && bshelf.user ? 
            <div className="background-box" >
                <div className="belt">
                    {bookList}
                    <MoreButton onClickMore={handleClickMore} />

                </div>
                <h2 id={bshelf.id}>{bshelf.name}</h2>
                <h4>created by {bshelf.user.username}</h4>
                <Link className="link-to-btn-small"to={`/browse-shelves/${bshelf.id}`}>See more</Link>
            </div>
            : <div>  {null} </div>}
        </div>
    )
}

export default ShelfBar;