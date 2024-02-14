import React, {useState, useEffect} from "react";
import Book from "./Book";
import { useParams, Link } from "react-router-dom";

function ShelfPage({handleDeleteShelf}){
    const [shelf, setShelf] = useState(null);
    const { id } = useParams()

    console.log("id:", id)

    useEffect(() => {
        fetch(`/bookshelves/${id}`) 
            .then(r => r.json())
            .then(data => setShelf(data))
    },[])

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
            {shelf ? <button onClick={onDeleteShelf}>Delete Shelf</button> : null}
            <Link className="link"to={`/browse-shelves`}>See more</Link>
            </div>
        </div>
    )
}

export default ShelfPage;