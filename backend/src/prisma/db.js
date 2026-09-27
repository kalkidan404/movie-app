import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

import postgres from "@prisma/orm-postgres/runtime";

import contractJson from "./contract.json" with { type: "json" };

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing");
}

export const db = postgres({
    contractJson,
    url: databaseUrl
});