import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";


const env = dotenv.config().parsed;
const app = express();

app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ADD ROUTE START
const rootRoutePath = "./routes/api/";
import importRoute from "./routes/api/index.js"
importRoute(app, rootRoutePath);
// ADD ROUTE END

mongoose.set("strictQuery", false);
mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
  dbName: env.MONGODB_DB_NAME,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("connected to mongodb");
  app.listen(env.SERVER_PORT, () => {
    console.log("Server running in port: " + env.SERVER_PORT);
  });
});
