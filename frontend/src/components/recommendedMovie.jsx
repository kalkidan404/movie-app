
import { DownloadMovie } from "./downloads";

const RecommendedMovieCard = ({ movie }) => {
    const releaseYear = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : "Unknown";

    return (
        <div
            className="recommended-card"
            style={{
                backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`
            }}
        >
            <div className="recommended-overlay">

                <div className="movie-info">
                    <span className="movie-genre">
                        {movie.genre || "Unknown"}
                    </span>

                    <h3>{movie.title}</h3>

                    <div className="movie-meta">
                        <span>{movie.language || "Unknown"}</span>
                        <span>{releaseYear}</span>
                        <span>
                            {movie.duration
                                ? `${movie.duration} min`
                                : "Unknown"}
                        </span>
                    </div>
                </div>

                <div className="movie-bottom">
                    <span>
                        ⭐ {movie.rating ?? "N/A"}
                    </span>

                    <button
                        onClick={() => DownloadMovie(movie.id)}
                    >
                        ↓ Download
                    </button>
                </div>

            </div>
        </div>
    );
};

export { RecommendedMovieCard };
