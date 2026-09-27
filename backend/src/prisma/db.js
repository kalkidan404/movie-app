import "dotenv/config";

import postgres from "@prisma/orm-postgres/runtime";

import contractJson from "./contract.json" with { type: "json" };

console.log(
    "USER DOMAIN:",
    JSON.stringify(
        contractJson.domain?.namespaces?.public?.models?.User,
        null,
        2
    )
);

console.log(
    "USER STORAGE:",
    JSON.stringify(
        contractJson.storage?.namespaces?.public,
        null,
        2
    )
);

export const db = postgres({
    contractJson,
    url: process.env["DATABASE_URL"],
});