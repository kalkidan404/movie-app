
import { useState } from "react";

const Login = () => {
     
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            console.log("Logged in:", data.user);

            // temporary: go back to home after login
            window.location.href = "/";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login">

            <div>
                <h3 className="head">RoyalView</h3>

                <h4>Watch on your terms</h4>

                <h1>Great Stories Ready When You Are</h1>

                <h3>
                    Build your personal offline movie library in just a few clicks
                </h3>
            </div>

            <div className="loginS">

                <h4>Welcome back</h4>

                <h2>Log in to your account</h2>

                <h4>Continue building your movie library</h4>

                <form onSubmit={handleLogin}>

                    <label>Username</label>

                    <input
                        className="username"
                        type="text"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        className="password"
                        type="password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                              Login
                      </button>

                </form>

                <h4>New to RoyalView?</h4>

                <button className="acc">
                    Create an account
                </button>

            </div>

        </div>
    );
};

export { Login };
