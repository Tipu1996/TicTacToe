import { Game } from "./game.model.js";
import gameServices from "./game.service.js";

export const startGame = async (req, res) => {
  const gameBoard = req.body.gameBoard;
  const playerChoice = req.body.choice;
  const isGameBoardEmpty = gameBoard.every((value) => value === "-");
  const newGame = new Game();
  if (isGameBoardEmpty) {
    const choice = Math.round(Math.random()) + 1;
    newGame.computerChoice = choice;
    await gameServices.computerMove(newGame);
  } else {
    playerChoice === 1
      ? (newGame.computerChoice = 2)
      : (newGame.computerChoice = 1);
    newGame.gameBoard = gameBoard;
    await gameServices.computerMove(newGame);
  }

  return res.json({
    locationUrl: `http://localhost:4000/api/v1/games/${newGame._id}`,
    board: newGame.gameBoard,
    computerChoice: newGame.computerChoice,
  });
};

export const getBoardState = async (req, res) => {
  const gameId = req.params.gameId;
  return res.json({ state: await gameServices.getBoardState(gameId) });
};

export const newMove = async (req, res) => {
  const gameId = req.params.gameId;
  const index = req.body.index;
  const result = await gameServices.newMove(gameId, index);
  return res.json({
    state: await gameServices.getBoardState(gameId),
    result: result === undefined ? "undecided" : result,
  });
};
