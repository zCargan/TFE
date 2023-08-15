import { configureStore, createSlice } from "@reduxjs/toolkit"

const exerciceSlice = createSlice({
    name: "exercice",
    initialState: [
        { id: 1, text: 'ligne du temps', done: false}
    ],
    reducers: {
        addExercice:(state, action) => {
            // {type: "exercice/addExercice", payload: "Ligne du temps"}
            const newExercice = {
                id: Date.now(),
                text: action.payload,
                done: false
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

export const selectExerckce = (state) => state.exercice;

export default exerciceSlice.reducer;