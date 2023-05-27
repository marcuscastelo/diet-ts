import Surreal from "surrealdb.js";
import { config } from "dotenv";
config();

const {
    SURREAL_DB_URL: db_url,
    SURREAL_DB_USER: db_user,
    SURREAL_DB_PASSWORD: db_pass,
} = process.env;

let db: Surreal | null = null;

export async function initDB() {
    if (db) return db;

    db = new Surreal(db_url);
    try {
        console.log("Initializing database...");

        if (!db_user || !db_pass || !db_url) {
            throw new Error("DB_USERNAME or DB_PASSWORD not set")
        }

        db.connect(db_url);

        await db.signin({
            user: db_user,
            pass: db_pass,
        }).then((res) => {
            console.log("Signed in to database", res);
        }).catch((err) => {
            console.log("Error signing in to database", err);
        });

        await db.use('test', 'test');

    } catch (err) {
        console.error(err);
    }

    return db;
}