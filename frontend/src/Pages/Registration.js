 import React, { useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUserEdit, FaEnvelope } from "react-icons/fa";
import axios from 'axios';

const Registration = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Log values before sending the request
        console.log("Submitting values:", values);
        
        try {
            const response = await axios.post('http://localhost:8081/Registration', values);
            console.log("Server response:", response);
            navigate('/LibrarianHome');
        } catch (err) {
            console.error("Submission error:", err);
        }
        }

    return (
        <div className="wrapper">
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <div className="input-box">
                        <input type="text" placeholder='First Name' name='firstName' value={values.firstName} onChange={handleInput} required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Last Name' name='lastName' value={values.lastName} onChange={handleInput} required />
                        <FaUserEdit className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' name='email' value={values.email} onChange={handleInput} required />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' name='password' value={values.password} onChange={handleInput} required />
                        <FaLock className='icon'/>
                    </div>
                    <button type="submit">Sign Up</button>
                    <div className="register-link">
                        <p>Already have an account? <Link to="/Login">Login</Link></p>
                        <br></br>
                        <p><Link to="/">Back to home</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;