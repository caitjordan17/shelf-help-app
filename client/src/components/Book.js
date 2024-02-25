import React, { useState } from "react";

function Book({ book, handleClick, authorizedToEdit, shelfID, bkshelfbk }){
    const [readStatus, setReadStatus] = useState(bkshelfbk)

    function handleReadUpdate(){
        console.log(`${readStatus} updated on backend`)
        setReadStatus(!readStatus)
    }
    
    function changeBookStatus(e){
        setReadStatus(!readStatus)
        console.log("bk status:", e)
        fetch(`/check_read_status/${e}/${shelfID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                read_status: readStatus,
            })
        })
        .then((r) => r.json())
        .then(handleReadUpdate)
    }

    return(
        <div className="book">
            <img 
                onClick={(e) => {handleClick(e.target.alt)}} 
                src={book.book_cover} 
                alt={book.title} 
                width="90%"/>
            <p>{book.title}</p>
            <p>by {book.author.name}</p> 
            {authorizedToEdit ? <button id={book.id} onClick={(e) => {changeBookStatus(e.target.id)}}> {readStatus ? "📖 Read" : "📚 TBR"} </button> : null}
        </div>
    )
}

export default Book;