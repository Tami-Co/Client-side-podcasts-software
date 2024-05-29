import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'
import { useSelector } from "react-redux";

const initialState = {
    responses: [],
    status: 'idle',
    statusAdd: 'idle',
}

export const addResponse = createAsyncThunk(
    'responses/addResponse',
    async (all_response) => {
        // const myUser = useSelector(state => state.users.currentUser)
        // const podcast = useSelector(state => state.podcasts.currentPodcast)
        console.log("addResponse", all_response);

        try {
            const formData = new FormData();
            formData.append('ContentOfResponse', all_response.contentResponse1)
            formData.append('LectureId', all_response.lecture1)
            formData.append('UserID', all_response.user1)
            formData.append('Date', all_response.date1)

            const response = await axios.post('https://localhost:7051/api/Response',
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;
        }
        catch (error) {
            console.log("errorAddResponse", error);
            return isRejectedWithValue(error);

        }
    }
)

export const responseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {
        updateAddResponseStatus: (state, action) => {
            state.statusAdd = action.payload;
            console.log("updateAddResponseStatus", state.statusAdd);

        }
    },
    extraReducers: (builder) => {
        builder.addCase(addResponse.fulfilled, (state, action) => {
            state.statusAdd = 'fulfilled'
            state.responses.push(action.payload)
            console.log("case response", state.responses);
        })
    },
})
export const {updateAddResponseStatus } = responseSlice.actions
export default responseSlice.reducer