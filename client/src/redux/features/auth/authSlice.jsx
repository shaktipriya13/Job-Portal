import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null//initially we don't want any user, when the user logs in first we will compare the toekns from the client and server, if they matches then only the user is approved 
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { setUser } = authSlice.actions;