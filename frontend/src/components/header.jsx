
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setShowAccountMenu(false);

        navigate("/");
    };

    return (
        <header>
            <button
                className="Reafresh"
                onClick={() => window.location.reload()}
            ></button>

            <h2>RoyalView</h2>

            <input
                className="search"
                placeholder="Search"
            />

            <div className="account">
                <button
                    className="profile-button"
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                >
                    {token && user
                        ? user.username.charAt(0).toUpperCase()
                        : "👤"}
                </button>

                {showAccountMenu && (
                    <div className="account-menu">
                        {token && user ? (
                            <>
                                <h3>Welcome, {user.username}</h3>

                                <button
                                    className="login-button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>Welcome to RoyalView</h3>

                                <p>
                                    Log in to sync your downloads across devices.
                                </p>

                                <button
                                    className="login-button"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>

                                <button
                                    className="register-button"
                                    onClick={() => navigate("/register")}
                                >
                                    Create Account
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export { Header };
