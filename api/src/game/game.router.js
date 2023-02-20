import express from "express";
import { startGame, getBoardState, newMove } from "./game.controller.js";

const router = express.Router();

router.post("/", startGame);
router.get("/:gameId", getBoardState);
router.put("/:gameId", newMove);

export default router;
