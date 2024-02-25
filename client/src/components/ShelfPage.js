import React, { useState, useEffect } from "react";
import Book from "./Book";
import { useParams, Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { 
    deleteBookshelf as removeBookshelfFromRedux,
    renameBookshelf as renameBookshelfInRedux,
  } from "./actions";


function ShelfPage(){
    const [shelf, setShelf] = useState(null);
    const { id } = useParams();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`/bookshelves/${id}`) 
            .then(r => r.json())
            .then(data => setShelf(data))
    },[])

    let authorizedToEdit = false
    if (user != null && shelf && shelf.user != null){
        authorizedToEdit = shelf.user.username === user.username
    }
    let shelfID=null
    if (shelf != null){
        shelfID=shelf.id
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
        .then((bookshelf) => {
            console.log("obj", bookshelf)
            dispatch(renameBookshelfInRedux(bookshelf))
            setShelf((prevShelf) => {
                return { ...prevShelf, name: updatedName.name };
              })
        })
    }

    function handleDeleteShelf(){
        fetch(`/bookshelves/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        dispatch(removeBookshelfFromRedux(id))
        setShelf(null)  
    }

    return(
        <div id="bookshelfCard">
            {shelf && shelf.user 
            ?
            <div>
                <h2 className="bk-h2">{shelf.name}</h2>
                <p>created by {shelf.user.username}</p>
            </div>
            : null
            }           
            {authorizedToEdit ? 
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            id="new-bkshelf-name"
                            placeholder="New Bookshelf Name"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        <button type="submit">Update Name</button>
                    </form>
                    <p className="errors">{formik.errors.name}</p>
                </div>
                : null
            }
            <div id="book-list">
                {shelf && shelf.bookshelf_book && shelf.bookshelf_book.map((book) => (
                    <Book 
                        shelfID={shelfID} 
                        authorizedToEdit={authorizedToEdit} 
                        bkshelfbk={book.read_status} 
                        book={book.book} key={book.book.id} />
                ))}
            </div>
            {authorizedToEdit ? 
                <div>
                    <button id="delete-btn"onClick={handleDeleteShelf}>Delete Shelf</button> 
                    <Link className="link-to-btn"to={`/my-shelves`}>Browse My Shelves</Link>
                </div>    
                :<Link className="link-to-btn"to={`/browse-shelves`}>Browse Shelves</Link>
                }
        </div>
    )
}

export default ShelfPage;