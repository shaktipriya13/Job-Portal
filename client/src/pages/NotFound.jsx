import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <h1>404 | Page Not found</h1>
            <Link className='btn btn-success' to={'/'}>Go back to Dashboard</Link>
        </div>
    );
}

export default NotFound;
<h1>Page Not found</h1>