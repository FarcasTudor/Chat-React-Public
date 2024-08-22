import { configureStore } from "@reduxjs/toolkit";
import messageListReducer from "../slices/messageListSlice";
import commandsReducer from "../slices/commandSlice";
import userDetailsReducer from "../slices/userDetailsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        messagesReducer: messageListReducer,
        commandsReducer: commandsReducer,
        userDetailsReducer: userDetailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

