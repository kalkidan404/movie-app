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

export {
    downloads,
    download,
    deleteDownload
};