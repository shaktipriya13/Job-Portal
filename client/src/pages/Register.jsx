//our goal is ki code size bache and logic badhe
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../components/shared/InputForm.jsx';
// onChange is triggered whenever the value of the input field changes.
// onChange and onSubmit are not default functions, but they are standard event handler props provided by React to handle DOM events.
import { useDispatch, useSelector } from 'react-redux';
// to get something we will use useSelctor hook and to send a request we use useDispatcher hook
import { showLoading, hideLoading } from '../redux/features/alertSlice.jsx'
import axios from 'axios'
import Spinner from '../components/shared/Spinner.jsx';
import { toast } from 'react-toastify';


const Register = () => {
    //hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setname] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [password, setpassword] = useState("");
    const [location, setlocation] = useState("");

    //redux
    const { loading } = useSelector(state => state.alerts);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name || !email || !password) {
                return toast.error("Please provide the required fields.")
            }
            dispatch(showLoading())
            const { data } = await axios.post('/api/v1/auth/register', { name, lastName, email, phone, password, location });

            dispatch(hideLoading())

            if (data.success) {
                toast.success("Register successful.");
                //after registering we navigate the user to the dashboard, for this we use useNavigate hook
                navigate('/dashboard');
            }

            //now we send request to backend using axios after initial loading
        } catch (err) {
            dispatch(hideLoading());
            toast.error("Invalid Form details . Please try again.")
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

                        <InputForm htmlFor='name' name="name" labelText={'Name'} type={"text"} value={name} require={true} handleChange={(e) => setname(e.target.value)} />
                        <InputForm htmlFor='lastname' name="lastname" labelText={'lastName'} type={"text"} value={lastName} handleChange={(e) => setlastName(e.target.value)} />
                        <InputForm htmlFor='email' name="email" require={true} labelText={'Email'} type={"text"} value={email} handleChange={(e) => setemail(e.target.value)} />
                        <InputForm htmlFor='phone' name="phone" labelText={'Phone'} type={"text"} value={phone} handleChange={(e) => setphone(e.target.value)} />
                        <InputForm htmlFor='password' name="password" require={true} labelText={'Password'} type={"text"} value={password} handleChange={(e) => setpassword(e.target.value)} />
                        <InputForm htmlFor='location' name="location" labelText={'Location'} type={"text"} value={location} handleChange={(e) => setlocation(e.target.value)} />

                        <div className="d-flex justify-content-between"><p>Already Registered? <Link className='text-primary' to={'/login'}>Login Here</Link></p>
                            <button type="submit" className="btn btn-success">Register</button>
                        </div>
                    </form>
                </div>
            )}

        </>
    );
}
//we can save the values provided in form and sent them to the database

export default Register;
