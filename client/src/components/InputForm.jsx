//this is a reusable component
import React from 'react';

const InputForm = ({ htmlFor, labelText, type, name, value, handleChange, require }) => {
    return (
        <>
            <div className="mb-3">
                {/* <label htmlFor={htmlFor} className="form-label">{labelText}</label> */}
                <label htmlFor={htmlFor} className="form-label">
                    {labelText}
                    {require && <span style={{ color: 'red' }}>*</span>}
                </label>
                <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={handleChange} />
            </div>

        </>
    );
}

export default InputForm;
