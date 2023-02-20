import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startGame, playerMove, getState } from "../redux/games.js";
import "../App.css";

const TicTacToeBoard = ({ firstMoveMadeByComputer }) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("http://localhost:4000/api/v1/games/");
  const [board, setBoard] = useState([
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
  ]);

  const state = useSelector((state) => state.games); // Get board from Redux
  const reduxBoard = state.board;
  const choice = state.playerSymbol;
  const locationUrl = state.locationUrl;
  const winner = state.winner;
  const symbol = state.playerSymbol;
  const [firstMoveMade, setFirstMoveMade] = useState(false);
  useEffect(() => {
    if (winner !== "undecided") {
      if (winner !== "draw") alert(`${winner} is the winner`);
      else alert(`it's a draw`);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [winner]);

  useEffect(() => {
    setUrl(locationUrl);
  }, [locationUrl]);

  useEffect(() => {
    setBoard(reduxBoard); // Update local board state whenever the Redux board changes
  }, [reduxBoard]);

  const handleClickCell = (index) => {
    if (!firstMoveMade && !firstMoveMadeByComputer) {
      const newBoard = [...board]; // Create a copy of the board array
      newBoard[index] = symbol; // Update the specific index with the new value
      setBoard(newBoard);
      if (choice === "X") dispatch(startGame({ board: newBoard, choice: 2 }));
      else if (choice === "O") {
        dispatch(startGame({ board: newBoard, choice: 1 })).then((response) => {
          const locationUrl = response.payload.locationUrl;
          dispatch(getState(locationUrl));
          setUrl(locationUrl);
        });
      }
      setFirstMoveMade(true);
    } else {
      // const shortenedUrl = url.substring(0, url.lastIndexOf("/"));
      dispatch(playerMove({ url: url, index: index })).then(() => {
        dispatch(getState(url));
      });
    }
  };

  return (
    <div className="board">
      {board.map((cell, index) => (
        <div
          className="cell"
          key={index}
          onClick={() => handleClickCell(index)}
        >
          {cell === "-" ? "-" : cell}
        </div>
      ))}
    </div>
  );
};

export default TicTacToeBoard;
