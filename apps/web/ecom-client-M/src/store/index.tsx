import { configureStore } from "@reduxjs/toolkit";
import authanticationReducer from "./features/authanticationSlice"; // Use the correct reducer import


const store = configureStore({
  reducer: {
    Auth: authanticationReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; // Get the type of the entire state

export default store;
