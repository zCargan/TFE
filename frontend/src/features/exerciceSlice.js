import { configureStore, createSlice } from "@reduxjs/toolkit"

const exerciceSlice = createSlice({
    name: "exercice",
    initialState: [],
    reducers: {
        addExercice:(state, action) => {
            // {type: "ADD_EXERCICE", payload: "Ligne du temps"}
            const newExercice = {
                text: action.payload
            }

            state.push(newExercice);
        },
        deleteExercice: (state, action) => {

        }

        /*
        login:(state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
        */

    }
});

export const store = configureStore({
    reducer: {
        exercice: exerciceSlice.reducer
    }
})

export const { addExercice } = exerciceSlice.actions;

export const selectExercice = (state) => state.exercice.exercice;

export default exerciceSlice.reducer;