import { db } from "../src/prisma/db.js";

const downloads = async (req, res, next) => {
    try {
        const downloads = await db.orm.public.Download.all();

        if (downloads.length === 0) {
            return res.status(404).json({
                message: "Downloads is empty"
            });
        }

        res.status(200).json(downloads);
    } catch (error) {
        next(error);
    }
};

const download = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid download ID"
            });
        }

        const download = await db.orm.public.Download
            .where({ id })
            .first();

        if (!download) {
            return res.status(404).json({
                message: "Download not found"
            });
        }

        res.status(200).json(download);
    } catch (error) {
        next(error);
    }
};

const deleteDownload = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid download ID"
            });
        }

        const download = await db.orm.public.Download
            .where({ id })
            .first();

        if (!download) {
            return res.status(404).json({
                message: "Download not found"
            });
        }

        await db.orm.public.Download
            .where({ id })
            .delete();

        res.status(200).json({
            message: "Download deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
const addDownload = async (req, res, next) => {
    try {
        const movieId = Number(req.params.id);

        if (Number.isNaN(movieId)) {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }

        const movie = await db.orm.public.Movie
            .where({ id: movieId })
            .first();

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        const existingDownload = await db.orm.public.Download
            .where({
                userId: req.user.id,
                movieId
            })
            .first();

        if (existingDownload) {
            return res.status(409).json({
                message: "Movie already downloaded"
            });
        }

        const newDownload = await db.orm.public.Download.create({
            userId: req.user.id,
            movieId
        });

        res.status(201).json(newDownload);
    } catch (error) {
        next(error);
    }
};
export {
    downloads,
    download,
    deleteDownload,
    addDownload
};