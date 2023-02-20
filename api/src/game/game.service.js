import { Game, squareValues, winnerStatus } from "./game.model.js";

const getBoardState = async (gameId) => {
  const game = await Game.findById(gameId, { gameBoard: 1 });
  return game.gameBoard;
};

const newMove = async (gameId, index) => {
  const game = await Game.findById({ _id: gameId });
  game.computerChoice === 1
    ? (game.gameBoard[index] = squareValues.cross)
    : (game.gameBoard[index] = squareValues.nought);
  await game.save();
  const presentState = checkState(game.gameBoard);
  if (presentState === "undecided") await computerMove(game);
  else {
    return returnResult(presentState, game);
  }
};

const computerMove = async (game) => {
  let unfilledSpaces = [];
  let gameBoard = game.gameBoard;
  for (let x = 0; x < gameBoard.length; x++) {
    if (gameBoard[x] === squareValues.unfilled) unfilledSpaces.push(x);
  }
  const randomIndex = Math.floor(Math.random() * unfilledSpaces.length);

  game.computerChoice === 1
    ? (game.gameBoard[unfilledSpaces[randomIndex]] = squareValues.nought)
    : (game.gameBoard[unfilledSpaces[randomIndex]] = squareValues.cross);

  await game.save();
  const presentState = checkState(game.gameBoard);
  return returnResult(presentState, game);
};

const checkState = (board) => {
  // Check horizontal rows
  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] !== squareValues.unfilled &&
      board[i] === board[i + 1] &&
      board[i + 1] === board[i + 2]
    ) {
      return board[i];
    }
  }

  // Check vertical columns
  for (let i = 0; i < 3; i++) {
    if (
      board[i] !== squareValues.unfilled &&
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6]
    ) {
      return board[i];
    }
  }

  // Check diagonal lines
  if (
    board[0] !== squareValues.unfilled &&
    board[0] === board[4] &&
    board[4] === board[8]
  ) {
    return board[0];
  }

  if (
    board[2] !== squareValues.unfilled &&
    board[2] === board[4] &&
    board[4] === board[6]
  ) {
    return board[2];
  }

  // If all squares are filled, return draw
  if (!board.includes(squareValues.unfilled)) {
    return winnerStatus.draw;
  }

  // If no winner or draw, return undecided
  return winnerStatus.undecided;
};

const returnResult = (checkWinner, game) => {
  if (checkWinner === "draw") {
    return "draw";
  } else if (checkWinner === "X") {
    if (game.computerChoice === 1) {
      return "player";
    } else return "computer";
  } else if (checkWinner === "O") {
    if (game.computerChoice === 1) {
      return "computer";
    } else return "player";
  } else {
    return "undecided";
  }
};

export default { getBoardState, newMove, computerMove };
