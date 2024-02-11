
import React, {useState} from "react";

function Login({onLogin}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);
        fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => setErrors(err.erros));
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
                    {errors.error}
                </div>
            </form>
        </div>
    );
}

export default Login;