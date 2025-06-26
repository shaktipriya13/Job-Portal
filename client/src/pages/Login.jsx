//our goal is ki code size bache and logic badhe
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../components/shared/InputForm';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';


// onChange is triggered whenever the value of the input field changes.
// onChange and onSubmit are not default functions, but they are standard event handler props provided by React to handle DOM events.
const Register = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    //variable for hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();


    //redux
    const { loading } = useSelector(state => state.alerts);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/auth/login', { email, password });
            if (data.success) {
                //we are getting tokens during login to ensure security in private routes
                dispatch(hideLoading());
                localStorage.setItem('token', data.token);
                toast.success('Login successfully.');
                navigate('/dashboard')
            }
            dispatch(hideLoading());
        } catch (err) {
            dispatch(hideLoading());
            toast.error("Invalid credentials. please try again.")
            console.log(err);
        }
    };
    return (
        <>
            {loading ? (<Spinner />) : (

                <div className='form-container'>
                    <br />
                    <form className='card p-2' onSubmit={handleSubmit}>
                        <img src="./src/assets/images/logo.png" alt="logo" height={250} width={400} />

                        <InputForm htmlFor='email' name="email" require={true} labelText={'Email'} type={"text"} value={email} handleChange={(e) => setemail(e.target.value)} />
                        <InputForm htmlFor='password' name="password" require={true} labelText={'Password'} type={"text"} value={password} handleChange={(e) => setpassword(e.target.value)} />

                        <div className="d-flex justify-content-between"><p>New Here? <Link className='text-primary' to={'/register'}>Register Now</Link></p>
                            <button type="submit" className="btn btn-success">Login</button>
                        </div>
                    </form>
                </div>
            )}

        </>
    );
}
//we can save the values provided in form and sent them to the database

export default Register;
