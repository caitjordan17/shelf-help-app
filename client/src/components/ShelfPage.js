import React, {useState, useEffect} from "react";
import Book from "./Book";
import { useParams, Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

function ShelfPage({handleDeleteShelf, user}){
    const [shelf, setShelf] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const { id } = useParams();



    useEffect(() => {
        fetch(`/bookshelves/${id}`) 
            .then(r => r.json())
            .then(data => setShelf(data))
    },[])

    let authorizedToEdit = false

    if (user != null && shelf && shelf.user != null){
        authorizedToEdit = shelf.user.username == user.username
    }
        
    function handleEdit(){
        setClicked(!clicked)
    }

    const formSchema = yup.object().shape({
        name: yup.string().required("Name required for bookshelves").max(50, "Bookshelf name cannot exceed 50 characters"),
    });

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
        const name = values.name
        console.log("bookshelfName:", name)
        readyToPost({name})
    }

    function readyToPost(updatedName){
        fetch(`/bookshelves/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(updatedName),
        })
        .then((r) => r.json())
        .then((r) => console.log("obj", updatedName))
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
            {clicked ? 
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            id="new-bkshelf-name"
                            placeholder="New Name"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        <button type="submit">Update Name</button>
                    </form>
                    <p className="errors">{formik.errors.name}</p>
                </div>
                : <button onClick={handleEdit}>Edit name</button>
            }
            <div id="book-list">
                {shelf && shelf.bookshelf_book.map((book) => (
                    <Book book={book.book} key={book.id} />
                ))}
            {authorizedToEdit ? <button onClick={onDeleteShelf}>Delete Shelf</button> : null}
            <Link className="link"to={`/browse-shelves`}>See more</Link>
            </div>
        </div>
    )
}

export default ShelfPage;