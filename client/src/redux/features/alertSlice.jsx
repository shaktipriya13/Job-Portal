// import { createSlice } from "@reduxjs/toolkit";

// export const alertSlice = createSlice({
//     name: "alerts",//write the name of slice
//     initialState: {
//         loading: false,
//     },
//     reducers: {
//         //defining fxns that we want regarding a particular state
//         // reducers ke inside fxns are called as actions
//         // we can use these actions anywhere in the whole project
//         showLoading: (state) => {
//             state.loading = true;
//         },
//         hideLoading: (state) => {
//             state.loading = false;
//         }
//     }
// })

// // we are exporting actions to use them in other files
// export const { showLoading, hideLoading } = alertSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { showLoading, hideLoading } = alertSlice.actions;

// ✅ Default export
export default alertSlice.reducer;
