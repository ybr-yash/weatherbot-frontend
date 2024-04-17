import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Feature/AuthSlice"

export const Store = configureStore({
    reducer : {
        auth: authReducer,
    }
})