import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    categories: [],
    status: 'idle',
    currentCategory: {},
    statusCurrentCategory: 'idle',
    statusAddCategory: 'idle',
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (thunkAPI) => {
        try {
            console.log('in fetchPosts');
            const response = await axios.get('https://localhost:7051/api/Category')
            console.log(response.data);
            return response.data
        }
        catch (error) {
            console.log("errorFetchCategories", error);
        }

    }
)

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (allCategory) => {
        console.log("addCategory", allCategory);
        try {
            const formData = new FormData()
            formData.append('NameOfCategory', allCategory.name1)
            formData.append('FileImage', allCategory.selectedFile1)
            const response = await axios.post("https://localhost:7051/api/Category",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;
        }
        catch (error) {
            console.log("errorAddCategory", error);
            // return isRejectedWithValue(error)

        }
    }
)
export const categoryById = createAsyncThunk(
    'categories/categoryById',
    async (id) => {
        try {
            console.log('in categoryById', id);
            const response = await axios.get(`https://localhost:7051/api/Category/${id}`)
            return response.data
        } catch (error) {
            console.log("errorCategoryById", error);
        }

    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        updateAddCategoryStatus: (state, action) => {
            state.statusAddCategory = action.payload;
            console.log("updateAddCategoryStatus", state.statusAddCategory);

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.categories = action.payload
        })
        builder.addCase(categoryById.fulfilled, (state, action) => {
            state.statusCurrentCategory = 'fulfilled'
            state.currentCategory = action.payload
        })
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload)
            state.statusAddCategory = 'fulfilled'
        })
        builder.addCase(addCategory.pending, (state, action) => {
            state.statusAddCategory = 'pending'
        })
    },
})
export const { updateCurrentCategory, updateAddCategoryStatus } = categorySlice.actions
export default categorySlice.reducer