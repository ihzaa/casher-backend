import mongoose from "mongoose";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

const connection = async () => {
    return new Promise((resolve, reject) => {
        mongoose.set("strictQuery", false);
        mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
            dbName: env.MONGODB_DB_NAME,
        });
        const db = mongoose.connection;
        db.on("error", function () {
            console.error.bind(console, "connection error");
            reject();
        });
        db.once("open", function () {
            console.log("connected to mongodb");
            resolve();
        });
    })
}

export { connection };