import { configureStore, createSlice } from "@reduxjs/toolkit"

const connectionSlice = createSlice({
    name: "connected",
    initialState: false,
    reducers: {
        changeValueConnected: (state, action) => {
            // { type: "connected/changeValueConnected", payload:false }
            action.payload = !action.payload       
        }
    }
});

export const storeTest = configureStore({
    reducer: {
        connected: connectionSlice.reducer,
    },
});