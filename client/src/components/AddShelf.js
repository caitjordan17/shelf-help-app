import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';

function AddShelf({handleAddShelf, user}){
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Name required for bookshelves").max(50, "Bookshelf name cannot exceed 50 characters"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            username: user
        },

        validationSchema: formSchema,

        onSubmit: (values, {resetForm}) => {
            fetch('/bookshelves', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/JSON",
                },
                body: JSON.stringify(values),
            }).then((r) => r.json())
            .then((newBookshelf) => {
                handleAddShelf(newBookshelf)
                resetForm()
            })
        }
    });

    
    return(
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
                <button type="new-bkshelf-submit">Add New Bookshelf</button>
            </form>
            <p className="errors">{formik.errors.name}</p>
        </div>
    )
}

export default AddShelf;