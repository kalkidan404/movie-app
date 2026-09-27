
import { DownloadMovie } from "./downloads";

const SearchResults = ({ searchTerm, movies }) => {

    const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="search-results">

            {results.length === 0 ? (

                <div className="search-message">
                    <h2>We don't have that movie yet.</h2>
                </div>

            ) : (

                <div className="search-movie-list">

                    {results.map((movie) => {

                        const releaseYear = movie.releaseDate
                            ? new Date(movie.releaseDate).getFullYear()
                            : "Unknown";

                        return (
                            <div
                                key={movie.id}
                                className="search-movie-card"
                            >

                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="search-movie-poster"
                                />

                                <h2>{movie.title}</h2>

                                <div className="search-movie-meta">

                                    <span>
                                        {movie.genre || "Unknown"}
                                    </span>

                                    <span>
                                        {releaseYear}
                                    </span>

                                </div>

                                <button
                                    className="search-download-button"
                                    onClick={() => DownloadMovie(movie.id)}
                                >
                                    ↓ Download Movie
                                </button>

                            </div>
                        );
                    })}

                </div>

            )}

        </section>
    );
};

export { SearchResults };
