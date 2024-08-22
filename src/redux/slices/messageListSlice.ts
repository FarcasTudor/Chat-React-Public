import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageInterface } from "../../interfaces/MessageInterface";

export interface InitialState {
    messages: MessageInterface[];
};

const initialState: InitialState = {
    messages: []
};

const messageListSlice = createSlice({
    name: 'messageList',
    initialState: initialState as InitialState,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageInterface>) => {
            console.log('Current state before sending message: ' + JSON.stringify(state));
            console.log('Adding message to state: ' + action.payload.message);
            state.messages.push(action.payload);

        },
        resetMessages: (state, _) => {
            console.log('Resetting messages');
            state.messages = [];
        }
    }
});

export const { addMessage, resetMessages } = messageListSlice.actions;
export default messageListSlice.reducer;