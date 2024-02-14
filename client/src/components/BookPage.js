import React, {useState, useEffect} from "react";
import Book from "./Book";
import {Link} from "react-router-dom";
import AddBook from "./AddBook";

function BookPage(){
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch("/books")
          .then((r) => r.json())
          .then((data) =>setBooks(data));
    }, []);

    function onAddBook(bookObj){
        setBooks(books.push(bookObj))
        console.log("books after push", books)
    }

    return(
        <div id="bookshelfCard">
            <h2 className="bk-h2"> All Books </h2>
            <Link className="link" id="add-books-btn" to={`/browse-books/add`}> Add a book </Link>
            <AddBook onAddBook={onAddBook}/>
            <div id="book-list">
                {books ? books.map((book) => (
                    <Book book={book} key={book.id} />
                )) : <p>Loading...</p>}
            </div>
        </div>
    )
}

export default BookPage;