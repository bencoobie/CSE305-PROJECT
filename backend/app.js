import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { mongoDBConnection } from "./config/db.connection.js";
import { router } from "./routes/index.js";
import cookikeParser from "cookie-parser";
mongoDBConnection();
app.use(express.urlencoded());
app.use(express.json());
app.use(cookikeParser());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
