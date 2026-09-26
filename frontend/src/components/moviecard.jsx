const MovieCard = ({ movie }) => {
    return (
        <div className="moviecard">

            <img
                src={movie.backdropUrl || movie.posterUrl}
                alt={movie.title}
            />

            <div className="rate">
                ⭐ {movie.rating ?? "N/A"}
            </div>

            <div>
                <h3>{movie.title}</h3>

                <h6>{movie.genre}</h6>

                <button className="download">
                    ⬇ Download
                </button>
            </div>

        </div>
    );
};

export { MovieCard };