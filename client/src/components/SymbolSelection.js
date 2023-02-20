import React from "react";
import { useDispatch } from "react-redux";
import { setPlayerSymbol } from "../redux/games.js";

const SymbolSelection = () => {
  const dispatch = useDispatch();

  const handleSymbolSelection = (symbol) => {
    dispatch(setPlayerSymbol(symbol));
  };

  return (
    <div>
      <h4>Which symbol do you want to use?</h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => handleSymbolSelection("X")}>X</button>
        <button onClick={() => handleSymbolSelection("O")}>O</button>
      </div>
    </div>
  );
};

export default SymbolSelection;
