import { Temporal } from "@js-temporal/polyfill";

globalThis.Temporal = Temporal;

import { db } from "./db.js";

async function seed() {
    await db.orm.public.User.create({
        username: "admin",
        role: "ADMIN"
    });

    await db.orm.public.Movie.createAll([
        {
            title: "Inception",
            description: "A thief who enters the dreams of others.",
            releaseDate: new Date("2010-07-16"),
            genre: "Sci-Fi",
            duration: 148,
            language: "English",
            rating: 8.8
        },
        {
            title: "Interstellar",
            description: "A journey through space and time.",
            releaseDate: new Date("2014-11-07"),
            genre: "Sci-Fi",
            duration: 169,
            language: "English",
            rating: 8.7
        },
        {
            title: "The Dark Knight",
            description: "Batman faces a dangerous criminal in Gotham.",
            releaseDate: new Date("2008-07-18"),
            genre: "Action",
            duration: 152,
            language: "English",
            rating: 9.0
        }
    ]);

    console.log("Database seeded successfully.");

    await db.close();
}

seed().catch((error) => {
    console.error(error);
    process.exit(1);
});