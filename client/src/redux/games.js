import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:4000/api/v1/games";

export const initialState = {
  locationUrl: url,
  board: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  winner: "undecided",
  status: "",
  playerSymbol: "-",
  computerChoice: "-",
  steps: 0,
};

export const startGame = createAsyncThunk(
  "games/startGame",
  async ({ board, choice }) => {
    return axios
      .post(url, { gameBoard: board, choice })
      .then((response) => response.data);
  }
);

export const getState = createAsyncThunk("games/getState", async (location) => {
  return axios.get(`${location}`).then((response) => response.data);
});

export const playerMove = createAsyncThunk(
  "games/playerMove",
  async ({ url, index }) => {
    return axios.put(`${url}`, { index }).then((response) => response.data);
  }
);

const slice = createSlice({
  name: "games",
  initialState,
  reducers: {
    reduxInitialState: (state) => {
      state.locationUrl = `http://localhost:4000/api/v1/games/`;
      state.board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
      state.winner = "undecided";
      state.status = "";
      state.steps = 0;
    },
    setPlayerSymbol: (state, action) => {
      state.playerSymbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startGame.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(startGame.fulfilled, (state, action) => {
      state.locationUrl = action.payload.locationUrl;
      state.board = action.payload.board;
      state.computerChoice = action.payload.computerChoice;
      state.status = "success";
      state.steps = 100;

      if (action.payload.computerChoice === 1) {
        state.playerSymbol = "X";
      } else if (action.payload.computerChoice === 2) {
        state.playerSymbol = "O";
      }
    });
    builder.addCase(startGame.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(getState.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getState.fulfilled, (state, action) => {
      state.board = action.payload.state;
      state.status = "success";
    });
    builder.addCase(getState.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(playerMove.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(playerMove.fulfilled, (state, action) => {
      state.board = action.payload.state;
      state.winner = action.payload.result;
      state.status = "success";
    });
    builder.addCase(playerMove.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
  },
});

export default slice.reducer;

export const { reduxInitialState, setPlayerSymbol } = slice.actions;
