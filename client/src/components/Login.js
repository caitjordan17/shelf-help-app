
import React, {useState} from "react";
import SignUp from "./SignUp";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { setUser as setReduxUser } from "./actions";


function Login(){
    const [errors, setErrors] = useState(false);
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const formSchema = yup.object().shape({
        username: yup.string().required("Username required"),
        password: yup.string().required("Password required"),
    })

    const formik = useFormik({
        initialValues: {
          username:'',
          password:''
        },

        validationSchema: formSchema,

        onSubmit: (values, {resetForm}) => {
            handleAfterFormik(values)
            resetForm()
        }
    });

    function handleAfterFormik(values){
        const username = values.username
        const password = values.password
        readyToPost({username, password})
    }

    function readyToPost(obj){
        fetch('/login', {
            method: "POST",
            headers: {
              "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(obj),
        })
        .then((r) => {
            if(r.ok){
                r.json().then((user) =>{
                    dispatch(setReduxUser(user))
                })
                .then(setErrors(false));
            } else {
                r.json().then((err) => setErrors(true))
            }
        });
    }
   
    function handleClick(){
        setClicked(!clicked)
    }

    return(
        <div id="login-div"> 
            {user ? (
            <h3 id="login-header">Logged In!</h3>
            ) : (
            <div>
                <h3 id="login-header">Login</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    <button type="submit">Login</button>
                </form>
                <div id="errors">
                    {errors ? <h3>Username & Password do not match.</h3> : null}
                </div>
                <div>
                {clicked ?
                    <SignUp />
                    : <div>
                        <h4 id="signin-question">Not already a user?</h4>
                        <button id="expand-signup" onClick={handleClick}>Sign Up Here!</button>
                    </div>}
                </div>
            </div>
            )}

        </div>
    );
}

export default Login;

