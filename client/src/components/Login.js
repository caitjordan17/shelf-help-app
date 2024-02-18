
import React, {useState} from "react";
import SignUp from "./SignUp";

function Login({setAppUser, loggedIn, setLoggedIn, user}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [clicked, setClicked] = useState(false);

    
    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => {
                    setAppUser(user);
                    setLoggedIn(true);
                    setUsername("");
                    setPassword("");
                })
                .then(setErrors(false));
            } else {
                r.json().then((err) => setErrors(true));
            }
        });
    }

    function handleClick(){
        setClicked(!clicked)
    }

    return(
        <div id="login-div"> 
            {loggedIn ? (
            <h3 id="login-header">Logged In!</h3>
            ) : (
            <div>
                <h3 id="login-header">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div id="username-input">
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div id="password-input">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div id="submit-button">
                        <button variant="fill" type="submit">
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </div>
                    <div id="errors">
                        {errors ? <h3>Username & Password do not match.</h3> : null}
                    </div>
                </form> 
                <div>
                    {clicked ?
                        <SignUp 
                            setAppUser={setAppUser} user={user} 
                            loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
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


