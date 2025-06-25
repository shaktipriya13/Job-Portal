// // store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { alertReducer } from "./features/alertSlice.jsx";

// const store = configureStore({
//     reducer: {
//         alerts: alertReducer,
//     },
// });

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./features/alertSlice"; // no `.jsx` needed

const store = configureStore({
    reducer: {
        alerts: alertReducer,
    },
});

export default store;
