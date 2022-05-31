
import { configureStore } from "@reduxjs/toolkit"

import currentUserReducer from "../features/currentUser/currentUserSlice"
import userReducer from "../features/user/userSlice"
import postReducer from "../features/post/postSlice"

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        user: userReducer,
        post: postReducer
    }
})

export default store