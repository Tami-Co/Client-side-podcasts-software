import { createAsyncThunk, createSlice, current, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    users: [],
    currentUser: null,
    status: 'idle',
    idUserLogin:'',
    isUserExist:{}

}

// export const fetchUsers = createAsyncThunk(
//     'users/fetchUsers',
//     async (thunkAPI) => {
//         try {
//             console.log('in fetchUsers');
//             // console.log(initialState.currentUser);
//             // console.log(initialState.users);
//             const response = await axios.get('https://localhost:7051/api/User')
//             console.log(response.data);
//             return response.data
//         } catch (error) {
//             console.log("errorFetchUsers", error);
//         }

//     }
// )

export const userLogin = createAsyncThunk(
    'users/userLogin',
    async (user) => {
        try {
            console.log("userLogin",user);
            const response = await axios.post('https://localhost:7051/api/User/Login', {
                FirstName: 'aaa',
                LastName: 'aaa',
                Email: user.em,
                Password: user.pa
            })
            console.log("adddddd");
            return response.data
        } catch (error) {
            console.log("errorAddCategory", error);
            // return isRejectedWithValue(error)

        }
    }
)

export const userById = createAsyncThunk(
    'users/userById',
    async (id) => {
        try {
            console.log('in userById');
            const response = await axios.get(`https://localhost:7051/api/User/${id}`)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log("errorUserById", error);
        }

    }
)
export const checkUserIsExist = createAsyncThunk(
    'users/checkUserIsExist',
    async (email) => {
        try {
            console.log('in checkUserIsExist');
            const response = await axios.get(`https://localhost:7051/api/User/CheckUserIsExist/${email}`)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log("errorUserById", error);
        }

    }
)

export const addUser = (firstName, lastName, email, password) =>
    async (thunkAPI) => {
        console.log('in addUsers');
        try {
            const response = await axios.post('https://localhost:7051/api/User', {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: password
            })
            console.log("response", response.data);
            return response.data
        }
        catch (error) {
            console.log("errorAddUser", error);
            return isRejectedWithValue(error);

        }
    }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.currentUser = action.payload
            console.log("updateUser", state.currentUser);
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchUsers.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //     state.users = action.payload
        // })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            // state.lecturers.push(action.payload)
            state.idUserLogin = action.payload;
            console.log("idUserLogin", state.idUserLogin);

        })
        builder.addCase(checkUserIsExist.fulfilled, (state, action) => {
            state.isUserExist = action.payload;
            console.log("isUserExist", state.isUserExist);
        })
        // builder.addCase(userLogin.pending, (state, action) => {
        //     state.statusAddLecturer = 'pending'
        //     console.log("addLecturer.pending", state.statusAddLecturer);

        // })
        //    builder.addCase(addUser.fulfilled, (state,action) => {
        //     console.log();
        //       state.users = action.payload   
        //       state.status = 'fulfilled'
        //     })
        // builder.addCase(userById.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //     state.users = action.payload
        // })
    },
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer
