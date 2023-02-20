import mongoose, { Document } from "mongoose";

export const winnerStatus = Object.freeze({
  computer: "computer",
  player: "player",
  draw: "draw",
  undecided: "undecided",
});

export const squareValues = Object.freeze({
  nought: "O",
  cross: "X",
  unfilled: "-",
});

export const computerChoice = Object.freeze({
  nought: 1,
  cross: 2,
});

const gameSchema = new mongoose.Schema({
  gameBoard: {
    type: [String],
    enum: Object.values(squareValues),
    default: [
      squareValues.unfilled,
      squareValues.unfilled,
      squareValues.unfilled,
      squareValues.unfilled,
      squareValues.unfilled,
      squareValues.unfilled,
      squareValues.unfilled,
      squareValues.unfilled,
      squareValues.unfilled,
    ],
  },
  winner: {
    type: String,
    enum: Object.values(winnerStatus),
    default: winnerStatus.undecided,
  },
  computerChoice: {
    type: Number,
    enum: Object.values(computerChoice),
  },
});

export const Game = mongoose.model("Game", gameSchema);
