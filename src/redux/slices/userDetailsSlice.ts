import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EMPTY_STRING } from "../../constants/Constants";

interface InitialState {
    username: string;
};

const initialState: InitialState = {
    username: EMPTY_STRING
};

export const fetchUserName =  createAsyncThunk<string>(
    'teamName/fetchUserName',
    async () => {
        const response = await fetch('http://localhost:8080/api/me');
        const name = await response.text();
        return name;
    }
);

export const usernameSlice = createSlice({
    name: 'teamName',
    initialState: initialState as InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserName.fulfilled, (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        });
    }
});

export default usernameSlice.reducer;