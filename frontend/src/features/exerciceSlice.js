import { configureStore, createSlice } from "@reduxjs/toolkit"

const exerciceSlice = createSlice({
    name: "exercice",
    initialState: [{name:'test'}],
    reducers: {
        addExercice:(state, action) => {
            // {type: "exercice/addExercice", payload: "Ligne des nombres"}
            const newExercice = {
                id: Date.now(),
                text: action.payload
            }
            state.push(newExercice);
        }
        /*,
        deleteExercice:(state, action) => {

        }
        */
    }
});

export const store = configureStore({
    reducer: {
        exerciceStore: exerciceSlice.reducer
    }
})

export const selectExerckce = (state) => state.exercice;

export default exerciceSlice.reducer;