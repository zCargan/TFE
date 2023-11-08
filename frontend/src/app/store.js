import { configureStore } from "@reduxjs/toolkit";
import exerciceReducer from '../features/exerciceSlice'


export default configureStore({
    reducer: {
        exercices: exerciceReducer,
    },
})