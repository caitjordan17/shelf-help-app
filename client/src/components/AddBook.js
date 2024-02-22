import React, {useState} from "react";
import { useFormik } from 'formik'
import * as yup from 'yup'

function AddBook({onAddBook}){

    const formSchema = yup.object().shape({
        // title: yup.string().required("Book must have title"),
        bookCover: yup.string().url().required("Book must have book cover url"),
        author: yup.string().required("Book must have author")
    });

    const formik = useFormik({
        initialValues: {
          title:"",
          bookCover:"",
          author:""
        },

        validationSchema: formSchema,

        onSubmit: (values, {resetForm}) => {
            fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(values),
            }).then((r) => r.json())
            .then((newBook) => {
                onAddBook(newBook)
                resetForm();
            })
        }
    });


    return(
        <div className="new-book-form">
            <form onSubmit={formik.handleSubmit}>
                <input 
                    id="title-input"
                    type="text"
                    name="title"
                    value={formik.values.title}
                    placeholder="Book title"
                    onChange={formik.handleChange}
                />
                <input 
                    id="cover-input"
                    type="text"
                    name="bookCover"
                    value={formik.values.bookCover}
                    placeholder="Book cover"
                    onChange={formik.handleChange}
                />
                <input 
                    id="author-input"
                    type="text"
                    name="author"
                    value={formik.values.author}
                    placeholder="Book author"
                    onChange={formik.handleChange}
                />
                <button type="submit">Add Book</button>
            </form>
            <p className="errors">{formik.errors.name}</p>
        </div>
    )
}

export default AddBook;

