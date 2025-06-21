import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <div className='form-container'>
                <br />
                <form className='card p-2'>
                    <img src="./src/assets/images/logo.png" alt="logo" height={250} width={400} />
                    {/* <h1>Register Here</h1> */}
                    <div className="mb-1">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" />
                    </div>

                    <div className="mb-1">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>

                    <div className="mb-1">
                        <label htmlFor="email" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" />
                    </div>

                    <div className="d-flex justify-content-between"><p>New Here? <Link className='text-primary' to={'/register'}>SignUp</Link></p>
                        <button type="submit" className="btn btn-success">Login</button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default Login;
