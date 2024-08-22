import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EMPTY_STRING, GROUP_COMMAND, UPDATE_COMMAND } from "../../constants/Constants";

interface CommandState {
    commands: string[];
    activeCommand: string;
    loading: boolean;
    error: boolean;
    fulfilled: boolean;
};

const initialState: CommandState = {
    commands: [],
    activeCommand: EMPTY_STRING,
    loading: false,
    error: false,
    fulfilled: false
};

export const fetchAllCommands = createAsyncThunk<string[]>(
    'commands/fetchAllCommands',
    async () => {
        console.log('Fetching all commands');
        const response = await fetch('http://localhost:8080/api/getCommands');
        console.log('Response: ' + JSON.stringify(response));
        return response.json();
    }
);

export const commandSlice = createSlice({
    name: 'commands',
    initialState: initialState as CommandState,
    reducers: {
        setCommands: (state, action: PayloadAction<string[]>) => {
            console.log('Setting commands: ' + JSON.stringify(action.payload));
            state.commands = action.payload;
        },
        setActiveCommand: (state, action: PayloadAction<string>) => {
            console.log('Setting active command: ' + action.payload);
            state.activeCommand = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAllCommands.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.fulfilled = false;
        });
        builder.addCase(fetchAllCommands.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.fulfilled = true;
            state.commands = action.payload.filter(
                command => command !== GROUP_COMMAND && command !== UPDATE_COMMAND
            );        
        });
        builder.addCase(fetchAllCommands.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.fulfilled = false;
        });
    },
});

export const { setCommands, setActiveCommand } = commandSlice.actions;
export default commandSlice.reducer;