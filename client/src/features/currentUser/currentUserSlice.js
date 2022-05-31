
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// user register
export const register = createAsyncThunk("currentUser/register", async (user, thunkAPI) => {
    try {
        const response = await axios.post("/users/register", user)
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// user login
export const login = createAsyncThunk("currentUser/login", async (user, thunkAPI) => {
    try {
        const response = await axios.post("/users/login", user)
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update user
export const updateUser = createAsyncThunk("currentUser/updateUser", async (updatedUser, thunkAPI) => {
    try {
        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put("/users/updateUser", updatedUser, config)
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete user
export const deleteUser = createAsyncThunk("currentUser/deleteUser", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.delete("/users", config)
        if (response.data) {
            localStorage.removeItem('user')
        }
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("currentUser/logout", async () => {
    localStorage.removeItem('user')
})


const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder

            // register
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // login
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // update user
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // delete user
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = null
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            
            // logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { resetAuth } = currentUserSlice.actions
export default currentUserSlice.reducer