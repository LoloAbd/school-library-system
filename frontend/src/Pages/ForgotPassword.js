import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import emailjs from '@emailjs/browser';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [coode, setCode] = useState('');
    const navigate = useNavigate();

     // Extract code from the response

            useEffect(() => {
                const fetchConstant = async () => {
                    try {
                        const response = await axios.get('http://localhost:8081/api/code');
                        setCode(response.data.code);
                    } catch (error) {
                        console.error('Error fetching the constant:', error);
                    }
                    };

                fetchConstant();
            }, []);

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send request to the server to get a reset code
            const response = await axios.post('http://localhost:8081/forgotPassword', { email });
            console.log("Server response:", response);

            // Set success message and navigate
            setSuccess('Reset code sent successfully. Please check your email.');
            setError('');
            navigate('/ResetPassword');

            // Prepare template parameters
            const templateParams = {
                email: email,
                code: coode
            };
            console.log(coode);
            // Send email with EmailJS
            emailjs.send('service_l7f61hu', 'template_tdryvi9', templateParams, 'AdEMD3kSSpPhYiWK8')
                .then(
                    (result) => {
                        console.log('SUCCESS!', result.text);
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                        setError('Failed to send email. Please try again.');
                        setSuccess('');
                    }
                );

        } catch (err) {
            console.error("Submission error:", err);
            setError('Failed to send reset code. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="wrapperForgot">
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <h2>Reset your password</h2>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder='Enter your email'
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                            required
                        />
                        <FaEnvelope className='icon' />
                    </div>
                    <button type="submit" className="btn">Continue</button>
                    {success && <p className="success-message">{success}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
                <div className="back-to-login">
                    <p>Remember your password?
                        <Link to="/Login"> Log in here.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
