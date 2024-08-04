import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './EmailValidation';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import Validation from './EmailValidation';
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // Check if there are no validation errors
        if (!validationErrors.email && !validationErrors.password) {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data === "Success") {
                        navigate('/');
                    } else {
                        alert("Email or Password Incorrect");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box login">
                <form action="" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="input-box">
                        <input 
                            type="email" 
                            placeholder='Email' 
                            name='email' 
                            onChange={handleInput} 
                            required 
                        />
                        <FaUser className='icon' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder='Password' 
                            name='password' 
                            onChange={handleInput} 
                            required 
                        />
                        <FaLock className='icon' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account?
                            <Link to="/Registration"> Sign Up</Link>
                        </p>
                        <br></br>
                        <p><Link to="/">Back to home</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;