import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    lecturers: [],
    status: 'idle',
    currentLecturerOfPodcast: {},
    statusCurrentLecturerOfPodcast: 'idle',
    podcastsOfLecturer: [],
    statusPodcastsOfLecturer: 'idle',
    statusAddLecturer: 'idle',
    statusUpdate: 'idle',
    maxViewsLecturers: [],
    statusMaxViewsLecturers: 'idle'

}

export const updateNumberViews = createAsyncThunk(
    'lecturers/updateNumberViews',
    async (lecturerId) => {
        try {
            console.log(lecturerId, "updateNumberViews");
            const formData = new FormData();
            formData.append('Id', 2);
            formData.append('FirstName', 'aa');
            formData.append('LastName', 'bb');
            formData.append('NumberViews', 0);
            const response = await axios.put(`https://localhost:7051/api/Lecturer/${lecturerId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;
        }
        catch (error) {
            console.log(error);
            // return isRejectedWithValue(error);
        }

    },
)
export const fetchLecturers = createAsyncThunk(
    'lecturers/fetchLecturers',
    async (thunkAPI) => {
        try {
            console.log('in fetchPosts');
            const response = await axios.get('https://localhost:7051/api/Lecturer')
            console.log(response);
            return response.data
        } catch (error) {
            console.log("errorfetchLecturers", error);
        }

    }
)

export const lecturerById = createAsyncThunk(
    'lecturers/lecturerById',
    async (id) => {
        try {
            console.log('in lecturerById', id);
            const response = await axios.get(`https://localhost:7051/api/Lecturer/${id}`)
            console.log("lecture name", response.data);
            return response.data
        } catch (error) {
            console.log("errorLecturerById", error);
        }

    }
)

export const fetchPodcastsOfLecturer = createAsyncThunk(
    'lecturers/fetchPodcastsOfLecturer',
    async (id) => {
        try {

            console.log('in fetchPodcastsOfLecturer');
            const response = await axios.get(`https://localhost:7051/api/Lecture/GetPodcastsOfLecturer/${id}`)
            console.log(response.data.data);
            return response.data.data
        } catch (error) {
            console.log("errorfetchPodcastsOfCategory", error);
        }

    }
)
export const fetchMaxViewsLecturers = createAsyncThunk(
    'lecturers/fetchMaxViewsLecturers',
    async () => {
        try {

            console.log('in fetchMaxViewsLecturers');
            const response = await axios.get('https://localhost:7051/api/Lecturer/MaxViews')
            console.log("log",response.data.data);

            return response.data.data
        } catch (error) {
            console.log("errorfetchPodcastsOfCategory", error);
        }

    }
)
export const addLecturer = createAsyncThunk(
    'lecturers/addLecturer',
    async (allLecturer) => {
        try {
            const response = await axios.post('https://localhost:7051/api/Lecturer', {
                FirstName: allLecturer.firstName1,
                LastName: allLecturer.lastName1,
                NumberViews: 0,
            })
            console.log("adddddd");
            return response.data
        } catch (error) {
            console.log("errorAddCategory", error);
            // return isRejectedWithValue(error)

        }
    }
)

export const lecturerSlice = createSlice({
    name: 'lecturer',
    initialState,
    reducers: {
        updateAddLecturerStatus: (state, action) => {
            state.statusAddLecturer = action.payload;
            console.log("updateAddCategoryStatus", state.statusAddLecturer);

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLecturers.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.lecturers = action.payload
        })
        builder.addCase(lecturerById.fulfilled, (state, action) => {
            state.statusCurrentLecturerOfPodcast = 'fulfilled'
            state.currentLecturerOfPodcast = action.payload
            console.log("case lecture", state.currentLecturerOfPodcast);
        })
        builder.addCase(fetchPodcastsOfLecturer.fulfilled, (state, action) => {
            state.podcastsOfLecturer = action.payload
            console.log("case8", state.podcastsOfLecturer);
            state.statusPodcastsOfLecturer = 'fulfilled'

        })
        builder.addCase(fetchMaxViewsLecturers.fulfilled, (state, action) => {
            state.maxViewsLecturers = action.payload
            state.statusMaxViewsLecturers = 'fulfilled'

        })
        builder.addCase(addLecturer.fulfilled, (state, action) => {
            state.lecturers.push(action.payload)
            state.statusAddLecturer = 'fulfilled'
            console.log("addLecturer.fulfilled", state.statusAddLecturer);

        })
        builder.addCase(addLecturer.pending, (state, action) => {
            state.statusAddLecturer = 'pending'
            console.log("addLecturer.pending", state.statusAddLecturer);

        })
        builder.addCase(updateNumberViews.fulfilled, (state, action) => {
            state.statusUpdate = 'fulfilled'
            // state.lecturers = action.payload
        })
    },
})
export const { updateAddLecturerStatus } = lecturerSlice.actions
export default lecturerSlice.reducer