
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// get user
export const getUser = createAsyncThunk("user/getUser", async (userId, thunkAPI) => {
    try {
        const response = await axios.get(`/users/${userId}`)
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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.user = {}
        }
    },
    extraReducers: (builder) => {
        builder

            // get user
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { resetUser } = userSlice.actions
export default userSlice.reducer