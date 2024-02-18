import React, {useState} from "react";
import { useFormik } from 'formik'
import * as yup from 'yup'

function SignUp({setAppUser, setLoggedIn, loggedIn}){

    const formSchema = yup.object().shape({
        username: yup.string().required("Username required").max(50, "Username cannot exceed 50 characters"),
        password: yup.string().required("Password required"),
    })

    const formik = useFormik({
        initialValues: {
          username:'',
          password:''
        },

        validationSchema: formSchema,

        onSubmit: (values, {resetForm}) => {
            setLoggedIn(true)
            resetForm()
            handleAfterFormik(values)
        }
    });

    function handleAfterFormik(values){
        const username = values.username
        const password = values.password
        readyToPost({username, password})
    }

    function readyToPost(obj){
        fetch('/signup', {
            method: "POST",
            headers: {
              "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(obj),
        })
        .then((r) => r.json())
        .then((user) => {
            setAppUser(user)
        })
    }


    return(
        <div>
            {loggedIn ? 
            <div>
                <h2>Submitted!</h2>
            </div>
            : <div>
                 <h2 id="signup-header">Sign Up!</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        id="new-username"
                        placeholder="Username"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <input
                        type="password"
                        name="password"
                        id="new-password"
                        placeholder="Password"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <button type="submit">Sign Up!</button>
                </form>
            </div>}
        </div>
    )
}

export default SignUp;