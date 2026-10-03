import { db } from "../src/prisma/db.js";

const getMovies = async (req, res, next) => {
    try {
        const movies = await db.orm.public.Movie.all();

        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};

const getMovie = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }

        const movie = await db.orm.public.Movie
            .where({ id })
            .first();

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

const addMovie = async (req, res, next) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const {
            title,
            description,
            releaseDate,
            genre,
            duration,
            posterUrl,
            backdropUrl,
            language,
            rating,
            tmdbId
        } = req.body;

        const movie = await db.orm.public.Movie.create({
            title,
            description,
            releaseDate,
            genre,
            duration: Number(duration),
            posterUrl,
            backdropUrl,
            language,
            rating: Number(rating),
            tmdbId: tmdbId !== undefined
                ? Number(tmdbId)
                : null
        });

        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
};

const updateMovie = async (req, res, next) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }

        const {
            title,
            description,
            releaseDate,
            genre,
            duration,
            posterUrl,
            backdropUrl,
            language,
            rating,
            tmdbId
        } = req.body;

        const movie = await db.orm.public.Movie
            .where({ id })
            .update({
                title,
                description,
                releaseDate,
                genre,
                duration: duration !== undefined
                    ? Number(duration)
                    : undefined,
                posterUrl,
                backdropUrl,
                language,
                rating: rating !== undefined
                    ? Number(rating)
                    : undefined,
                tmdbId: tmdbId !== undefined
                    ? (tmdbId === null ? null : Number(tmdbId))
                    : undefined
            });

        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }

        await db.orm.public.Movie
            .where({ id })
            .delete();

        res.status(200).json({
            message: "Movie deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

const getRecommendations = async (req, res, next) => {

    try {

        const userId = req.user.id;

        // Get all downloads
        const allDownloads = await db.orm.public.Download.all();

        // Keep only this user's downloads
        const downloads = allDownloads.filter(
            (download) => download.userId === userId
        );

        // We need at least 10 downloads
        if (downloads.length < 10) {
            return res.status(200).json({
                message: "You need at least 10 downloads to get recommendations",
                recommendations: []
            });
        }

        const genreCount = {};
        const languageCount = {};

        // Get the movies belonging to the user's downloads
        for (const download of downloads) {

            const movie = await db.orm.public.Movie
                .where({ id: download.movieId })
                .first();

            if (!movie) {
                continue;
            }

            if (movie.genre) {

                const genres = movie.genre
                    .split(",")
                    .map((genre) => genre.trim());

                for (const genre of genres) {

                    genreCount[genre] =
                        (genreCount[genre] || 0) + 1;

                }
            }

            if (movie.language) {

                languageCount[movie.language] =
                    (languageCount[movie.language] || 0) + 1;

            }
        }

        // Get the top 2 genres
        const topGenres = Object.entries(genreCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(([genre]) => genre);

        // Get the most common language
        const topLanguage = Object.entries(languageCount)
            .sort((a, b) => b[1] - a[1])[0]?.[0];

        // IDs of movies the user already downloaded
        const downloadedMovieIds = downloads.map(
            (download) => download.movieId
        );

        // Get all movies
        const movies = await db.orm.public.Movie.all();

        // Remove already downloaded movies
        const availableMovies = movies.filter(
            (movie) => !downloadedMovieIds.includes(movie.id)
        );

        // Score each movie
        const recommendations = availableMovies.map((movie) => {

            let score = 0;

            if (movie.genre) {

                const movieGenres = movie.genre
                    .split(",")
                    .map((genre) => genre.trim());

                for (const genre of movieGenres) {

                    if (topGenres.includes(genre)) {
                        score += 2;
                    }

                }
            }

            if (movie.language === topLanguage) {
                score += 1;
            }

            return {
                ...movie,
                score
            };

        });

        // Only return movies that match at least one preference
        const filteredRecommendations = recommendations
            .filter((movie) => movie.score > 0)
            .sort((a, b) => b.score - a.score);

        res.status(200).json({
            preferences: {
                genres: topGenres,
                language: topLanguage
            },
            recommendations: filteredRecommendations
        });

    } catch (error) {

         next(error)
    res.status(200).json({
        preferences: {},
        recommendations: []
    });


    }

};

export {
    getMovies,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie,
    getRecommendations
};