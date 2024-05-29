import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './Categories/categorySlice'
import lecturersReducer from "./Lecturers/lecturerSlice";
import usersReducer from './Users/userSlice'
import lecturesReducer from './Podcasts/podcastSlice'
import responsesReducer from './Response/responseSlice'
export const store=configureStore({
    reducer:{
        categories:categoriesReducer,
        lecturers:lecturersReducer,
        users:usersReducer,
        lecturers:lecturersReducer,
        podcasts:lecturesReducer,
        responses:responsesReducer
    },
})