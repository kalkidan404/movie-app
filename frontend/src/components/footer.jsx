import { useNavigate } from "react-router-dom";

const Footer = ({ downloadCount }) => {

    const navigate = useNavigate();

    const handleBrowse = () => {
        if (window.location.pathname === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else {
            navigate("/");
        }
    };

    return (

        <footer>

            <button
                className="browser"
                onClick={handleBrowse}
            >
                Browse
            </button>

            <button
                className="downloads"
                onClick={() => navigate("/downloads")}
            >
                Downloads

                {downloadCount > 0 && (
                    <span className="download-count">
                        {downloadCount}
                    </span>
                )}

            </button>

        </footer>
    );
};

export { Footer };