import React, {useState, useEffect} from "react";
import Book from "./Book";
import { useParams, Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

function AddShelf({handleAddShelf}){
    const [books, setBooks] = useState([])
    const [booksToAdd, setBooksToAdd] = useState([])
    const { id } = useParams()
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        fetch("/books")
          .then((r) => r.json())
          .then((data) =>setBooks(data));
    }, []);
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Name required for bookshelves").max(50, "Bookshelf name cannot exceed 50 characters"),
    });

    function handleClick(bookInEvent){
        const bookObj = books.filter((book) => book.title == bookInEvent)
        // console.log("checking...",(booksToAdd.find((book) => book.title == bookInEvent)))
        if (booksToAdd.find((book) => book.title == bookInEvent)){
        } else {
            setBooksToAdd([...booksToAdd, bookObj[0]])
        }
    }

    // console.log("booksToAdd:",booksToAdd)

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: formSchema,

        onSubmit: (values, {resetForm}) => {
            setSubmitted(true)
            resetForm()
            handleAfterFormik(values)
        }
    });

    function handleAfterFormik(values){
        const bookshelfName = values.name
        // console.log("bookshelfName:", bookshelfName)
        readyToPost({bookshelfName, booksToAdd})
    }

    function readyToPost(obj){
        fetch('/bookshelves', {
            method: "POST",
            headers: {
              "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(obj),
        })
        .then((r) => r.json())
        .then((bkshelf) => {
            console.log("obj", obj)
            handleAddShelf(bkshelf)
        })
    }
    let shelfID=null

    let authorizedToEdit = false

    return(
        <div>
            { submitted ?
            <div>
                <h2>Submitted!</h2>
                <Link className="link-to-btn"to={`/my-shelves`}>Back to my shelves</Link>
            </div>
            : 
            <div>
                <div className="selected-container">
                    <h2>Selected Books: </h2>
                    <p>Select a few books by clicking on their covers & click "Add New Bookshelf" when you're done!</p>
                    <div className="selected-books">
                        {booksToAdd ? booksToAdd.map((book) =>(
                            <Book authorizedToEdit={authorizedToEdit} handleClick={handleClick} book={book} key={book.id}/>
                        )): <p>Nothing added yet</p>}
                    </div>
                    <div id="new-bookshelf">
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            id="new-bkshelf-name"
                            placeholder="Bookshelf Name"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        
                        <button type="submit">Add New Bookshelf</button>
                    </form>
                    <p className="errors">{formik.errors.name}</p>
                </div>
                </div>
                <div id="book-list">
                    {books ? books.map((book) => (
                        <Book bkshelfbk={shelfID} shelfID={shelfID} authorizedToEdit={authorizedToEdit} handleClick={handleClick} book={book} key={book.id} />
                    )) : <p>Loading...</p>}
                </div>
            </div>}
        </div>
    )
}

export default AddShelf;