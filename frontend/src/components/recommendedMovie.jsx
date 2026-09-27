const RecommendedMovieCard = ({ movie }) => {
    return (
        <div className="recommended-card">
            
            <img
                src={movie.backdropUrl || movie.posterUrl}
                alt={movie.title}
            />

            <div className="movie-info">
                <h3>{movie.title}</h3>

                <p>{movie.genre}</p>

                <p>
                    {movie.releaseDate
                        ? new Date(movie.releaseDate).getFullYear()
                        : "Unknown"}
                </p>

                <div className="movie-bottom">
                    <span>⭐ {movie.rating ?? "N/A"}</span>

                    <button>Download</button>
                </div>
            </div>
        </div>
    );
};

export { RecommendedMovieCard };