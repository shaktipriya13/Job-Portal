import React from 'react';

const Spinner = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <div
                className="spinner-border text-success"
                role="status"
                style={{ width: '5rem', height: '5rem' }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
// import React from 'react';
// import './Spinner.css'; // Import the CSS styling

// const Spinner = () => {
//     return (
//         <div className="spinner-container">
//             <span className="loader"></span>
//         </div>
//     );
// };

// export default Spinner;
