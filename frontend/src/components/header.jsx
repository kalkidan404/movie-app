import { useState } from "react";

const Header = () => {
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    return (
        <header>
            <button className="Reafresh" onClick={()=>window.location.reload()}></button>
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
                    👤
                </button>

                {showAccountMenu && (
                    <div className="account-menu">
                        <h3>Welcome to RoyalView</h3>

                        <p>
                            Log in to sync your downloads across devices.
                        </p>

                        <button className="login-button">
                            Login
                        </button>

                        <button className="register-button">
                            Create Account
                        </button>
                    </div>
                )}
            </div>
            
        </header>
        
    );
};

export { Header };