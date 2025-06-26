// it is made so that is the user is logged in and has token then he cannot access the login page and is directed to dashboard only

import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({ children }) => {
    if (localStorage.getItem('token')) {
        return <Navigate to='/dashboard' />
    }
    else {
        return children;
    }
}

export default PublicRoutes;
