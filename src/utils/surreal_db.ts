import Surreal from "surrealdb.js";
import { config } from "dotenv";
config();

const {
    SURREAL_DB_URL: db_url,
    SURREAL_DB_USER: db_user,
    SURREAL_DB_PASSWORD: db_pass,
} = process.env;

let db: Surreal | null = null;

