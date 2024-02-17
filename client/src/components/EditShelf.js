import React, {useState, useEffect} from "react";
import Book from "./Book";

function EditShelf({}){
    const [books, setBooks] = useState([])
    const [booksToAdd, setBooksToAdd] = useState([])
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        fetch("/books")
          .then((r) => r.json())
          .then((data) =>setBooks(data));
    }, []);

    function handleClick(bookInEvent){
        const bookObj = books.filter((book) => book.title == bookInEvent)
        console.log("checking...",(booksToAdd.find((book) => book.title == bookInEvent)))
        if (booksToAdd.find((book) => book.title == bookInEvent)){
            setClicked(false)
            console.log(clicked)
        } else {
            setBooksToAdd([...booksToAdd, bookObj[0]])
            setClicked(true)
            console.log(clicked)
        }
    }

    // something is wrong with line 17--when bk img is clicked
    // for the first time it should setClicked(true) but 
    // when you console.log(clicked) it just shows false
    // no matter how much you click it

    function handleSubmit(){
        console.log("submitted!")
    }

    return(
        <div id="bookshelfCard">
            <h2 className="bk-h2"> Books to Add </h2>
            <p>Select a few books by clicking on their covers & click submit when you're done</p>
            <button onClick={handleSubmit}>Submit</button>
            <div id="book-list">
                {books ? books.map((book) => (
                    <Book clicked={clicked} handleClick={handleClick} book={book} key={book.id} />
                )) : <p>Loading...</p>}
            </div>
        </div>
    )
}

export default EditShelf;