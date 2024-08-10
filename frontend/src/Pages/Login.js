import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/Login', values)
            .then(res => {
                if (res.data.status === "Success") {
                    // Store librarian data in localStorage or context for later use
                    localStorage.setItem('librarianId', res.data.librarianId);
                    localStorage.setItem('librarianName', res.data.librarianName);
                    navigate('/LibrarianHome');
                } else {
                    alert(res.data.message || "Email or Password Incorrect");
                }
            })
            .catch(err => {
                console.error('Login error:', err);
                alert('Invalid email or password');
            });
    };

    return (
        <div className="wrapperLogin">
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
                        <FaEnvelope className='icon' />
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
                    </div>
                    <div className="register-link">
                        <p><Link to="/ForgotPassword">Forgot password?</Link></p>
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
