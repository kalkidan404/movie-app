
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

const Movie = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/movies/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Movie not found");
                }

                setMovie(data);
            } catch (error) {
                console.error(error);
            }
        };

        getMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const releaseYear = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : "Unknown";

    return (
        <div className="movie-page">

            <Header />

            <section
                className="movie-hero"
                style={{
                    backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`
                }}
            >
                <div className="movie-overlay">

                    <button
                        className="back-button"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Movies
                    </button>

                    <div className="movie-hero-info">

                        <h1>{movie.title}</h1>

                        <div className="movie-meta">
                            <span>{releaseYear}</span>
                            <span>⭐ {movie.rating ?? "N/A"}</span>
                            <span>{movie.genre}</span>
                            <span>{movie.duration} min</span>
                        </div>

                        <p className="movie-description">
                            {movie.description}
                        </p>

                        <button className="download-movie">
                            ↓ Download Movie
                        </button>

                    </div>

                </div>
            </section>

            <section className="movie-details">

                <div>
                    <span>Language</span>
                    <strong>{movie.language || "Unknown"}</strong>
                </div>

                <div>
                    <span>Release Date</span>
                    <strong>
                        {movie.releaseDate
                            ? new Date(movie.releaseDate).toLocaleDateString()
                            : "Unknown"}
                    </strong>
                </div>

                <div>
                    <span>Duration</span>
                    <strong>
                        {movie.duration ? `${movie.duration} min` : "Unknown"}
                    </strong>
                </div>

                <div>
                    <span>Rating</span>
                    <strong>
                        ⭐ {movie.rating ?? "N/A"}
                    </strong>
                </div>

            </section>

            <section className="about-film">

                <h2>About the Film</h2>

                <p>
                    {movie.description || "No description available."}
                </p>

            </section>

            <Footer />

        </div>
    );
};

export { Movie };
