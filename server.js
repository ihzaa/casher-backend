import dotenv from "dotenv";
const env = dotenv.config().parsed;
import express, { json } from "express";
const app = express();
import cors from "cors";

app.use(json());

app.use(cors());

// ADD ROUTE START
const rootRoutePath = "./routes/api/";
import importRoute from "./routes/api/index.js"
importRoute(app, rootRoutePath);
// ADD ROUTE END

app.listen(env.SERVER_PORT, () => {
  console.log("Server running in port: " + env.SERVER_PORT);
});

