import express from "express";
import dotenv from "dotenv";
import gameRouter from "./game/game.router.js";
import cors from "cors";

const app = express();

dotenv.config();

app.set("port", process.env["PORT"]);

app.use(express.json());
app.use(cors());

app.use("/api/v1/games", gameRouter);
// app.use("/api/v1/users", userRouter);

export default app;
