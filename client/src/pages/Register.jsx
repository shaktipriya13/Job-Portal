//our goal is ki code size bache and logic badhe
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// onChange is triggered whenever the value of the input field changes.
// onChange and onSubmit are not default functions, but they are standard event handler props provided by React to handle DOM events.
const Register = () => {
    // const [name, setname] = useState("");
    // const [lastname, setlastname] = useState("");
    // const [email, setemail] = useState("");
    // const [password, setpassword] = useState("");

    const [values, setvalues] = useState({
        //we are passing an object in useState which can be accessed through dot '.' operator
        name: "",
        lastname: "",
        email: "",
        password: ""
    });

    //handle inputs function
    const handleChange = (e) => {
        const value = e.target.value
        setvalues({
            ...values,
            [e.target.name]: value
        })
    };
    const handleSubmit = (event) => {
        // we do this to prevent reloading the page on submission as it will cause the loss of our data. reload on submission is the default behaviour of js
        try {
            event.preventDefault();
            console.log(values);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='form-container'>
                <br />
                <form className='card p-2' onSubmit={handleSubmit}>
                    <img src="./src/assets/images/logo.png" alt="logo" height={250} width={400} />
                    {/* <h1>Register Here</h1> */}
                    <div className="mb-1">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={values.name} onChange={handleChange} />
                    </div>

                    <div className="mb-1">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={values.lastname} onChange={handleChange} />
                    </div>

                    <div className="mb-1">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={values.email} onChange={handleChange} />
                    </div>

                    <div className="mb-1">
                        <label htmlFor="email" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={values.password} onChange={handleChange} />
                    </div>

                    <div className="d-flex justify-content-between"><p>Already Registered? <Link className='text-primary' to={'/login'}>Login Here</Link></p>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>

        </>
    );
}
//we can save the values provided in form and sent them to the database

export default Register;
