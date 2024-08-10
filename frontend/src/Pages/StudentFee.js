import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LendingBook.css';

const StudentFee = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        librarianId: localStorage.getItem('librarianId') || '',
        librarianName: localStorage.getItem('librarianName') || '',
        studentId: '',
        sfName: '',
        mFees: '',
        paymentDate: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8081/students');
                setStudents(response.data);
            } catch (err) {
                console.error("Error fetching students:", err);
            }
        };
        fetchStudents();
    }, []);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleStudentChange = (e) => {
        const selectedName = e.target.value;
        const selectedStudent = students.find(student => student.sFirstName === selectedName);
        setFormData(prevState => ({
            ...prevState,
            studentId: selectedStudent ? selectedStudent.id : '',
            sfName: selectedName
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/Fees', formData);
            console.log("Server response:", response);
            alert('Fees added successfully');
            navigate('/LibrarianHome'); // Navigate to home or another page if needed
        } catch (error) {
            console.error("Error adding fees:", error);
            alert('Error adding fees');
        }
    };

    return (
        <div className="WrapperLending">
            <div className='form-box'>
                <h2>Students' Monthly Subscription Fees</h2>
                <form onSubmit={handleSubmit}>
                    <div className="column">
                        <div className="input-box">
                            <label htmlFor="librarianName">Librarian Name</label>
                            <input
                                type="text"
                                id="librarianName"
                                name="librarianName"
                                value={formData.librarianName}
                                readOnly
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="sfName">Student Name</label>
                            <select id="sfName" name="sfName" onChange={handleStudentChange} value={formData.sfName} required>
                                <option value="">Select Student</option>
                                {students.map(student => (
                                    <option key={student.id} value={student.sFirstName}>
                                        {student.sFirstName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-box">
                            <label htmlFor="mFees">Monthly Subscription Fees</label>
                            <input
                                type="text"
                                id="mFees"
                                name="mFees"
                                value={formData.mFees}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-box">
                            <label htmlFor="librarianId">Librarian ID</label>
                            <input
                                type="text"
                                id="librarianId"
                                name="librarianId"
                                value={formData.librarianId}
                                readOnly
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="studentId">Student ID</label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                readOnly
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="paymentDate">Payment Date</label>
                            <input
                                type="date"
                                id="paymentDate"
                                name="paymentDate"
                                min={getCurrentDate()}
                                max="2026-12-31"
                                value={formData.paymentDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Pay</button>
                    <div className="link">
                        <Link to='/LibrarianHome'>Back to Home</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentFee;
