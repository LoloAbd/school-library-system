// frontend/src/ResetPassword.js
import React, { useState } from 'react';
import {useNavigate } from "react-router-dom";
import './ResetPassword.css';
import { MdOutlinePassword } from "react-icons/md";
import { FaQrcode } from "react-icons/fa";
import axios from 'axios';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        code: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            setSuccess('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/resetPassword', formData );

            if (response.status === 200) {
                setSuccess('Password updated successfully');
                setError('');
                navigate('/Login');
            }
        } catch (err) {
            setError('Failed to reset password. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="wrapperReset">
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <h2>Choose a New Password</h2>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder='Enter the Code' 
                            name='code' 
                            value={formData.code} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <FaQrcode className='icon' />
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder='Enter new Password' 
                            name='newPassword' 
                            value={formData.newPassword} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <MdOutlinePassword className='icon' />
                    </div>
                     <div className="input-box">
                        <input 
                            type="password" 
                            placeholder='Confirm Password' 
                            name='confirmPassword' 
                            value={formData.confirmPassword} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <MdOutlinePassword className='icon' />
                    </div>
                    <button type="submit" className="btn">Confirm</button>
                    {success && <p className="success-message">{success}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
