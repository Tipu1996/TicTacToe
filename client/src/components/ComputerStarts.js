import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React from "react";
import { startGame, getState, setPlayerSymbol } from "../redux/games.js";

const ComputerStarts = ({ handleComputerStarts }) => {
  const state = useSelector((state) => state.games);
  const computerChoice = state.computerChoice;
  const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  const dispatch = useDispatch();

  const ComputerStarts = () => {
    handleComputerStarts();
    dispatch(startGame({ board })).then((response) => {
      const locationUrl = response.payload.locationUrl;
      dispatch(getState(locationUrl));
      if (computerChoice === 1) setPlayerSymbol("X");
      else if (computerChoice === 2) setPlayerSymbol("O");
    });
  };

  return <button onClick={ComputerStarts}>Computer Move First</button>;
};

export default ComputerStarts;
