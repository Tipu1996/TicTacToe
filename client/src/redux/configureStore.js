import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./games.js";

const store = configureStore({
  reducer: { games: gameReducer },
});

export default store;
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
