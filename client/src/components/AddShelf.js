import React from "react";
import { useFormik } from 'formik';
import * as yup from "yup";

function AddShelf({onAddNewBookshelf}){
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Bookshelf must have a name").max(50, "Bookshelf name cannot exceed 50 characters"),
    });

    const formik = useFormik({
        initialValues: {
        name: "",
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
        <div>
            <form className="new-bookcase">
            <label htmlFor="name">New Bookshelf Name:</label>
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.name}/>
                <p className="errors">{formik.errors.name}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddShelf;