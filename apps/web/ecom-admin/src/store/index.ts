import { configureStore } from "@reduxjs/toolkit";
import authanticationReducer from "./auth-store"; // Use the correct reducer import
import nodeReducer from "./node-store";

const store = configureStore({
    reducer: {
        Auth: authanticationReducer,
        Node: nodeReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; // Get the type of the entire state

export default store;

