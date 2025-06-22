import React from 'react';

const Layout = ({ children }) => {
    return (
        <>
            <div className="row">
                <div className="col-md-3">Menu</div>
                <div className="col-md-9">{children}</div>
            </div>
        </>
    );
}

export default Layout;
