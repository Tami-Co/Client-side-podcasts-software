import { createAction, createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    podcasts: [],
    statusAddPodcast: 'idle',
    podcastsOfUser: [],
    statusCategoryPodcasts: 'idle',
    podcastFile: '',
    statusPodcastFile: 'idle',
    currentImgPodcast: '',
    currentImgStatus: 'idle',
    statusUpdate:'idle',
    maxViewsLectures:[],
    statusMaxViewsLectures:'idle'
}

export const getPodcastsOfUser = createAsyncThunk(
    'podcasts/getPodcastsOfUser',
    async (id) => {
        try {

            console.log('in getPodcastsOfUser');
            const response = await axios.get(`https://localhost:7051/api/Lecture/GetPodcastsOfUser/${id}`)
            console.log(response.data.data);
            return response.data.data
        } catch (error) {
            console.log("errorfetchPodcastsOfCategory", error);
        }

    }
)

export const fetchFilePodcast = createAsyncThunk(
    'podcasts/fetchFilePodcast',
    async (podcast) => {
        try {
            console.log('in fetchFilePodcast', podcast);
            const response = await axios.get(`https://localhost:7051/api/Lecture/getPodcast/${podcast.urlLectureFile}`)
            // console.log("singlePodcastttttttt", response.data);
            return response.data
        } catch (error) {
            console.log("errorfetchSinglePodcast", error);
        }
    }
)


export const fetchImgPodcast = createAsyncThunk(
    'podcasts/fetchImgPodcast',
    async (podcastUrl) => {
        try {
            console.log('in fetchImgPodcast', podcastUrl);

            const response = await axios.get(`https://localhost:7051/api/Lecture/getImagePodcast/${podcastUrl}`);
            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(response)));
            return `data:image/jpeg;base64,${base64String}${response.data}`;
        } catch (error) {
            console.log("errorfetchImgPodcast", error);
        }


    }
)

export const addPodcast = createAsyncThunk(
    'podcasts/addPodcast',
    async (allPodcast) => {
        console.log("addpodcast", allPodcast);
        try {
            const formData = new FormData()
            formData.append('NameLecture', allPodcast.name1)
            formData.append('Content', allPodcast.content1)
            formData.append('LectureFile', allPodcast.selectedFile1)
            formData.append('isVideo', allPodcast.isVideoPodcast1)
            formData.append('LengthOfLecture', allPodcast.length1)
            formData.append('UploadingDate', allPodcast.uploadingDate1)
            formData.append('CategoryId', allPodcast.category1)
            formData.append('LecturerId', allPodcast.lecturer1)
            formData.append('UserId', allPodcast.user1)
            formData.append('NumberViews', 0)

            const response = await axios.post("https://localhost:7051/api/Lecture",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;
        }
        catch (error) {
            console.log("errorAddPodcast", error);
            // return isRejectedWithValue(error)

        }
        // return {}
    }
)
export const updateNumberViews = createAsyncThunk(
    'podcasts/updateNumberViews',
    async (lecture) => {
        try {
            console.log(lecture,"updateNumberViews");
            const formData = new FormData();
            formData.append('Id', 2);
            formData.append('NameLecture','aa' );
            formData.append('Content', 'bb');
            formData.append('LectureFile',lecture.lectureFile) ;
            formData.append('isVideo',true );
            formData.append('LengthOfLecture',0 );
            formData.append('UploadingDate', "2024-03-21T14:15:05.541Z");
            formData.append('CategoryId',1);
            formData.append('LecturerId', 10);
            formData.append('UserId', 6);
            formData.append('Responses',[] );
            formData.append('NumberViews',0 );
            const response = await axios.put(`https://localhost:7051/api/Lecture/${lecture.id}`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } )
            return response.data;
        }
        catch (error) {
            console.log(error);
            // return isRejectedWithValue(error);
        }

    },
)
export const fetchHandleDownloadNow = createAsyncThunk(
    'podcasts/fetchHandleDownloadNow',
    async (podcast) => {
        console.log(podcast.id, 'in fetchHandleDownloadNow');

        try {
            console.log('in try');
            const response = await axios.get(`https://localhost:7051/api/Lecture/download/${podcast.id}`, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', podcast.nameLecture)

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error("Error fetchHandleDownloadNow:", error);
            // return [];
        }
    }
)
export const fetchMaxViewsLectures = createAsyncThunk(
    'lecturers/fetchMaxViewsLectures',
    async () => {
        try {
            console.log('in fetchMaxViewsLectures');
            const response = await axios.get('https://localhost:7051/api/Lecture/MaxViews')
            console.log("log",response.data.data);
            return response.data.data
        } catch (error) {
            console.log("errorfetchPodcastsOfCategory", error);
        }
    }
)
export const podcastSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        updateAddPodcastStatus: (state, action) => {
            state.statusAddPodcast = action.payload;
            console.log("updateAddPodcastStatus", state.statusAddPodcast);

        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPodcastsOfUser.fulfilled, (state, action) => {
            // console.log("case", state.statusCategoryPodcasts);
            state.podcastsOfUser = action.payload
            // state.statusCategoryPodcasts = 'fulfilled'

        })
        builder.addCase(addPodcast.fulfilled, (state, action) => {
            state.podcasts.push(action.payload)
            state.statusAddPodcast = 'fulfilled'
            console.log("addPodcast.fulfilled", state.statusAddPodcast);

        })
        builder.addCase(addPodcast.pending, (state, action) => {
            state.statusAddPodcast = 'pending'
            console.log("addPodcast.pending", state.statusAddPodcast);

        })
        builder.addCase(fetchFilePodcast.fulfilled, (state, action) => {
            state.statusPodcastFile = 'fulfilled'
            state.podcastFile = action.payload
            console.log("caseee", state.podcastFile);

        })
        builder.addCase(fetchImgPodcast.fulfilled, (state, action) => {
            state.currentImgStatus = 'fulfilled'
            state.currentImgPodcast = action.payload

        })
        builder.addCase(updateNumberViews.fulfilled, (state, action) => {
            console.log("action",action);
            state.statusUpdate = 'fulfilled'
            // state.lecturers = action.payload
        })
        builder.addCase(fetchMaxViewsLectures.fulfilled, (state, action) => {
            state.maxViewsLectures = action.payload
            state.statusMaxViewsLectures = 'fulfilled'

        })
    },
})

export const {updateAddPodcastStatus } = podcastSlice.actions
export default podcastSlice.reducer
