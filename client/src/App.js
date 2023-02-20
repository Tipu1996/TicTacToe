import React, { useState } from "react";
import TicTacToeBoard from "./components/Board.js";
import ComputerStarts from "./components/ComputerStarts.js";
import SymbolSelection from "./components/SymbolSelection.js";
import "./App.css";

const App = () => {
  const [firstMoveMadeByComputer, setFirstMoveMadeByComputer] = useState(false);
  const handleComputerStarts = () => {
    setFirstMoveMadeByComputer(true);
  };
  return (
    <div className="App">
      <div className="game-container">
        <SymbolSelection />
        <TicTacToeBoard firstMoveMadeByComputer={firstMoveMadeByComputer} />
        <ComputerStarts handleComputerStarts={handleComputerStarts} />
      </div>
    </div>
  );
};

export default App;
