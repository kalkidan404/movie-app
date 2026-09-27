
import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Create account
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/register`,
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
                alert(data.message || "Registration failed");
                return;
            }

            // Automatically log in after registration
            const loginResponse = await fetch(
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

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                alert("Account created, but automatic login failed.");
                return;
            }

            // Save login information
            localStorage.setItem("token", loginData.token);
            localStorage.setItem("user", JSON.stringify(loginData.user));

            // Go to homepage
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
                <h4>Welcome to RoyalView</h4>
                <h2>Create your account</h2>
                <h4>Start building your personal movie library</h4>

                <form onSubmit={handleRegister}>
                    <label>Username</label>

                    <input
                        className="username"
                        type="text"
                        placeholder="Choose a username"
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
                        Create Account
                    </button>
                </form>

                <h4>Already have an account?</h4>

                <button
                    className="acc"
                    onClick={() => window.location.href = "/login"}
                >
                    Log in
                </button>
            </div>
        </div>
    );
};

export { Register };