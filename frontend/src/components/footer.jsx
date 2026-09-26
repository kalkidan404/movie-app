const Footer = ({ downloadCount }) => {
    return (
        <footer>
            <button className="browser">
                Browse
            </button>

            <button className="downloads">
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