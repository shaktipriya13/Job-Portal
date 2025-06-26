// // // this is a functional componnet

// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { hideLoading, showLoading } from '../../redux/features/alertSlice';
// // import axios from 'axios'; // used to make HTTP requests
// // import { setUser } from '../../redux/features/auth/authSlice';
// // import { Navigate } from 'react-router-dom';
// // import { useEffect } from 'react';

// // const PrivateRoute = ({ children }) => {
// //     const {user}=useSelector(state=>state.auth)
// //     const dispatch = useDispatch();
// //     const getUser = async () => {
// //         try {

// //             dispatch(showLoading());
// //             const { data } = await axios.post('/api/v1/user/getUser',
// //                 {
// //                     token: localStorage.getItem('token')
// //                 }, {
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem('token')}`
// //                 }
// //             }
// //             )//axios is sending a request to this route which in turn gives a response
// //             dispatch(hideLoading());
// //             if (data.success) {
// //                 dispatch(setUser(data.data));
// //             }
// //             else {
// //                 localStorage.clear();
// //                 <Navigate to='/login' />
// //             }
// //         } catch (err) {
// //             localStorage.clear();//if we get any issues in fetching private route then we clear local storage
// //             dispatch(hideLoading());
// //             console.log(err);

// //         }
// //     }

// //     useEffect(()=>{

// //     })
// // }

// // export default PrivateRoute;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { hideLoading, showLoading } from '../../redux/features/alertSlice';
// import { setUser } from '../../redux/features/auth/authSlice';
// import axios from 'axios';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const dispatch = useDispatch();
//     const { user } = useSelector(state => state.auth);

//     const getUser = async () => {
//         try {
//             dispatch(showLoading());
//             const { data } = await axios.post('/api/v1/user/getUser',
//                 {
//                     token: localStorage.getItem('token'),
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 }
//             );
//             dispatch(hideLoading());
//             if (data.success) {
//                 dispatch(setUser(data.data));
//             } else {
//                 localStorage.clear();
//             }
//         } catch (err) {
//             localStorage.clear();
//             dispatch(hideLoading());
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         if (!user) {
//             getUser();
//         }
//     });

//     // 🔒 If no token, redirect to login
//     if (localStorage.getItem('token')) {
//         return children;
//     }
//     else {
//         return <Navigate to='/login' />
//     }

//     // ✅ If user is present, render children
// };

// export default PrivateRoute;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setUser } from '../../redux/features/auth/authSlice';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const getUser = async () => {
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/user/getUser',
                { token: localStorage.getItem('token') },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(hideLoading());
            if (data.success) {
                dispatch(setUser(data.data));
            } else {
                localStorage.clear();
            }
        } catch (err) {
            localStorage.clear();
            dispatch(hideLoading());
            console.log(err);
        }
    };

    useEffect(() => {
        if (!user && localStorage.getItem('token')) {
            getUser();
        }
    }, [user]);

    // ❗ Block only if token is missing
    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />;
    }

    // ✅ If token exists and user info is being fetched, return loading
    if (localStorage.getItem('token') && !user) {
        return <div>Loading...</div>; // you can also show <Spinner />
    }

    // ✅ All okay, render the protected component
    return children;
};

export default PrivateRoute;
