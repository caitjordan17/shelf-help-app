
import React, {useState} from "react";

function Login({setAppUser}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

    
    function handleSubmit(e){
        e.preventDefault();
        console.log(username, password)
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
                r.json().then((user) => setAppUser(user))
                .then(setErrors(false));
            } else {
                r.json().then((err) => setErrors(true));
            }
        });
    }

    return(
        <div id="login-div">
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
        </div>
    );
}

export default Login;