import { configureStore, createSlice } from "@reduxjs/toolkit"

const exerciceSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        addExercice:(state, action) => {
            // {type: "exercice/addExercice", payload: "Ligne des nombres"}
            const newExercice = {
                id: Date.now(),
                text: action.payload,
            }
            state.push(newExercice);
        }
    }
});

export const store = configureStore({
    reducer: {
        exercice: exerciceSlice.reducer
    }
})

export const {addExercice} = exerciceSlice.actions

export const selectUser = (state) => state.user.user;

export default exerciceSlice.reducer;
