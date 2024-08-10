import React, { useState } from 'react';
import './AddStudent.css';
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom";

const AddStudent = () => {
    const [student, setStudent] = useState({
        sFirstName: '',
        sLastName: '',
        dateOfBirth: '',
        sEmail: '',
        gradeLevel: '',
        identityNumber: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/addStudent', student);
            console.log("Server response:", response);
            alert('Student added successfully');
            navigate('/StudentFee'); 
        } catch (error) {
            console.error("Error adding student:", error);
            alert('Error adding student');
        }
    };

    return (
        <div className="WrapperStudent">
            <div className='form-box Student'>
                <h2>Add a Student to the School Book Club</h2>
                <form onSubmit={handleSubmit}>
                    <div className="column">
                        <div className="input-box">
                            <input
                                type="text"
                                name="sFirstName"
                                value={student.sFirstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                            />
                        </div>
                         <div className="input-box">
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={student.dateOfBirth}
                                onChange={handleChange}
                                min="2008-01-01"
                                max="2020-12-31"
                                placeholder="Date Of Birth"
                                required
                            />
                        </div>
                         <div className="input-box">
                            <input
                                type="email"
                                name="sEmail"
                                value={student.sEmail}
                                onChange={handleChange}
                                placeholder="Student Email"
                                required
                            />
                        </div>
                    </div>
                    <div className="column">
                         <div className="input-box">
                            <input
                                type="text"
                                name="sLastName"
                                value={student.sLastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                            />
                        </div>
                         <div className="input-box">
                            <input
                                type="text"
                                name="gradeLevel"
                                value={student.gradeLevel}
                                onChange={handleChange}
                                placeholder="Grade Level"
                                required
                            />
                        </div>
                         <div className="input-box">
                            <input
                                type="text"
                                name="identityNumber"
                                value={student.identityNumber}
                                onChange={handleChange}
                                placeholder="Identity Number"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Add Student</button>
                    <div className="link">
                        <Link to='/LibrarianHome'><a>Back to Home</a></Link>
                    </div>
                </form>
            </div>       
        </div>
    );
};

export default AddStudent;
