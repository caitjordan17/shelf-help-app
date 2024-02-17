import React, {useState, useEffect} from "react";
import Book from "./Book";
import { useParams, Link } from "react-router-dom";

function ShelfPage({handleDeleteShelf, user}){
    const [shelf, setShelf] = useState(null);
    const { id } = useParams()


    useEffect(() => {
        fetch(`/bookshelves/${id}`) 
            .then(r => r.json())
            .then(data => setShelf(data))
    },[])

    let authorizedToEdit = false

    if (user != null && shelf && shelf.user != null){
        authorizedToEdit = shelf.user.username == user.username
    }

    function onDeleteShelf(){
        console.log("Deleting bookshelf with ID:", id)
        handleDeleteShelf(id)
        console.log("Deleted")
        setShelf(null)
    }

    return(
        <div id="bookshelfCard">
            <h2 className="bk-h2">{shelf ? shelf.name : 'Loading....'}</h2>
            <p>{shelf ? `created by ${shelf.user.username}` : 'Loading....'}</p>
            <div id="book-list">
                {shelf && shelf.bookshelf_book.map((book) => (
                    <Book book={book.book} key={book.id} />
                ))}
            {authorizedToEdit ? <button onClick={onDeleteShelf}>Delete Shelf</button> : null}
            <Link className="link"to={`/browse-shelves`}>See more</Link>
            {authorizedToEdit ? <Link className="link"to={`/bookshelves/${id}/edit-shelf`}>Add more books</Link> : null}
            </div>
        </div>
    )
}

export default ShelfPage;