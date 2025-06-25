//our goal is ki code size bache and logic badhe
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
// onChange is triggered whenever the value of the input field changes.
// onChange and onSubmit are not default functions, but they are standard event handler props provided by React to handle DOM events.
const Register = () => {
    const [name, setname] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [location, setlocation] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, lastName, email, password, location });
    };
    return (
        <>
            <div className='form-container'>
                <br />
                <form className='card p-2' onSubmit={handleSubmit}>
                    <img src="./src/assets/images/logo.png" alt="logo" height={250} width={400} />

                    <InputForm htmlFor='name' name="name" labelText={'Name'} type={"text"} value={name} require={true} handleChange={(e) => setname(e.target.value)} />
                    <InputForm htmlFor='lastname' name="lastname" labelText={'lastName'} type={"text"} value={lastName} handleChange={(e) => setlastName(e.target.value)} />
                    <InputForm htmlFor='email' name="email" require={true} labelText={'Email'} type={"text"} value={email} handleChange={(e) => setemail(e.target.value)} />
                    <InputForm htmlFor='password' name="password" require={true} labelText={'Password'} type={"text"} value={password} handleChange={(e) => setpassword(e.target.value)} />
                    <InputForm htmlFor='location' name="location" labelText={'Location'} type={"text"} value={location} handleChange={(e) => setlocation(e.target.value)} />

                    <div className="d-flex justify-content-between"><p>Already Registered? <Link className='text-primary' to={'/login'}>Login Here</Link></p>
                        <button type="submit" className="btn btn-success">Register</button>
                    </div>
                </form>
            </div>

        </>
    );
}
//we can save the values provided in form and sent them to the database

export default Register;
