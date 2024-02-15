import React from "react";
import { useFormik } from 'formik';
import * as yup from "yup";

function AddShelf({onAddNewBookshelf, user}){
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Bookshelf must have a name").max(50, "Bookshelf name cannot exceed 50 characters"),
    });

    const formik = useFormik({
        initialValues: {
        name: "",
        username: user
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/bookshelves', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((r) => r.json())
            .then((newBookshelf) => onAddNewBookshelf(newBookshelf))
        }
    });

    
    return(
        <div className="new-bookshelf">
            <form>
                <input
                    type="text"
                    id="new-bkshelf-title"
                    placeholder="Bookshelf Name"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.name}/>
                <p className="errors">{formik.errors.name}</p>
                <button type="new-bkshelf-submit">Add New Bookshelf</button>
            </form>
        </div>
    )
}

export default AddShelf;