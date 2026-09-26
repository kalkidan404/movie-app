import { useState } from "react";

const AddMovieForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        releaseDate: "",
        genre: "",
        duration: "",
        posterUrl: "",
        backdropUrl: "",
        language: "",
        rating: "",
        tmdbId: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/movies`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add movie");
            }

            console.log("Movie added:", data);

            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-movie-form">

            <button
                type="button"
                className="close-form"
                onClick={onClose}
            >
                ×
            </button>

            <h2>Add Movie</h2>

            <form onSubmit={handleSubmit}>

                <label>Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label>Release Date</label>
                <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                />

                <label>Genre</label>
                <input
                    name="genre"
                    placeholder="Action, Drama"
                    value={formData.genre}
                    onChange={handleChange}
                />

                <label>Duration</label>
                <input
                    type="number"
                    name="duration"
                    placeholder="120"
                    value={formData.duration}
                    onChange={handleChange}
                />

                <label>Poster URL</label>
                <input
                    name="posterUrl"
                    value={formData.posterUrl}
                    onChange={handleChange}
                />

                <label>Backdrop URL</label>
                <input
                    name="backdropUrl"
                    value={formData.backdropUrl}
                    onChange={handleChange}
                />

                <label>Language</label>
                <input
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                />

                <label>Rating</label>
                <input
                    type="number"
                    step="0.1"
                    name="rating"
                    placeholder="8.5"
                    value={formData.rating}
                    onChange={handleChange}
                />

                <label>TMDB ID</label>
                <input
                    type="number"
                    name="tmdbId"
                    value={formData.tmdbId}
                    onChange={handleChange}
                />

                <button type="submit">
                    Add Movie
                </button>

            </form>
        </div>
    );
};

export { AddMovieForm };