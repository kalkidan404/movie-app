import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

import { db } from "./db.js";

const TMDB_TOKEN = process.env.TMDB_TOKEN;

if (!TMDB_TOKEN) {
    throw new Error("TMDB_TOKEN is missing from .env");
}

const headers = {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: "application/json"
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getMoviesFromTMDB = async () => {

    const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&page=1",
        { headers }
    );

    if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
    }

    const data = await response.json();

    return data.results;
};

const getMovieDetails = async (tmdbId) => {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US`,
        { headers }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to get movie ${tmdbId}: ${response.status}`
        );
    }

    return response.json();
};

const fixMovieImages = async () => {

    const movieIds = [27205, 157336, 155];

    for (const tmdbId of movieIds) {

        const details = await getMovieDetails(tmdbId);

        await db.orm.public.Movie
            .where({ tmdbId })
            .update({
                posterUrl: details.poster_path
                    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                    : null,

                backdropUrl: details.backdrop_path
                    ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
                    : null
            });

        console.log(`Updated images: ${details.title}`);
    }
};

const seed = async () => {

    try {

        await fixMovieImages();

        console.log("Fetching movies from TMDB...");

        const movies = await getMoviesFromTMDB();

        console.log(`Found ${movies.length} movies.`);

        for (const movie of movies) {

            console.log(`Processing: ${movie.title}`);

            const details = await getMovieDetails(movie.id);

            const existingMovie = await db.orm.public.Movie
                .where({ tmdbId: details.id })
                .first();

            if (existingMovie) {

                console.log(`Already exists: ${details.title}`);

                continue;
            }

            await db.orm.public.Movie.create({

                tmdbId: details.id,

                title: details.title,

                description: details.overview || null,

                releaseDate: details.release_date
                    ? new Date(details.release_date)
                    : null,

                genre: details.genres
                    ?.map(genre => genre.name)
                    .join(", ") || null,

                duration: details.runtime || null,

                posterUrl: details.poster_path
                    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                    : null,

                backdropUrl: details.backdrop_path
                    ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
                    : null,

                language: details.original_language || null,

                rating: details.vote_average ?? null
            });

            console.log(`Added: ${details.title}`);

            await sleep(200);
        }

        console.log("Seed completed successfully!");

    } catch (error) {

        console.error("Seed failed:", error);

    } finally {

        process.exit();
    }
};

seed();