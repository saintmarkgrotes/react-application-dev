import React, {useState, useEffect} from "react";
import "./Activity2.css";

const Activity2 = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const savedLogin = localStorage.getItem("isLoggedIn");

        if (savedLogin === "true") {
            setIsLoggedIn(true);
            setMessage("Welcome back!");
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogin = () => {
        if (username === "user" && password === "user123") {
            setIsLoggedIn(true);
            setMessage("Login successful!");

            localStorage.setItem("isLoggedIn", "true");
        } else {
            setIsLoggedIn(false);
            setMessage("Invalid username and password.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        setMessage("Logged out successfully!");
    };

    return (
    <main>
        <h2>Login Page</h2>

        <section>
        {isLoggedIn ? (


            <article>
                <h3>You are logged in</h3>
                <p>{message}</p>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </article>
        )   :   (
            
            <article>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />

                <button onClick={handleLogin}>
                    Login
                </button>
                <p>{message}</p>
            </article>
            )}
        </section>
    </main>
    );
}

export default Activity2;