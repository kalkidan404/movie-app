
import { useEffect, useState } from "react";

import { RecommendedMovieCard } from "../components/recommendedMovie";
import { MovieCard } from "../components/moviecard";
import { AddMovieForm } from "../components/addMovieForm";
import { Footer } from "../components/footer";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [Allmovies, setAllmovies] = useState([]);

    const [user, setUser] = useState(null);
    const [showAddMovie, setShowAddMovie] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        const getRecommendations = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/movies/recommendations`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                const data = await response.json();

                setMovies(data.recommendations || []);
            } catch (error) {
                console.error(error);
            }
        };

        const getmovies = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/movies`
                );

                const data = await response.json();

                setAllmovies(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (localStorage.getItem("token")) {
    getRecommendations();
}
        getmovies();
    }, []);

    return (
        <div className="home-page">

            <section className="recommended-section">
                <h2>Recommended for You</h2>

                <div className="recommended-list">
                    {movies.map((movie) => (
                        <RecommendedMovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            </section>

            <section className="AllMovies">
                <div className="breaker">
                <h4>Fresh And Noteworthy</h4>

                <h2>All Movies</h2>

            {user && user.role === "ADMIN" && (
                <button
                    className="add-movie"
                    onClick={() => setShowAddMovie(true)}
                >
                    + Add Movie
                </button>
            )}

            {showAddMovie && (
                <AddMovieForm
                    onClose={() => setShowAddMovie(false)}
                />
            )}
            </div>
                <div className="Movies">
                    {Allmovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            </section>


            <Footer />

        </div>
    );
};

export { HomePage };
