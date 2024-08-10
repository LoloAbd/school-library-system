import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShowAllStudents.css'; // Ensure this matches the file name

const ShowAllStudent = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null); // Added for error handling
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8081/students');
                setStudents(response.data);
            } catch (error) {
                setError('Error fetching students');
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleBackToHome = () => {
        navigate('/LibrarianHome');
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No Payment Date';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const isOverdue = (paymentDate) => {
        if (!paymentDate) return false;
        const currentDate = new Date();
        const paymentDateObj = new Date(paymentDate);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return paymentDateObj < oneMonthAgo;
    };

    const nextPaymentDate = (paymentDate) => {
        if (!paymentDate) return 'No Payment Date';
        const paymentDateObj = new Date(paymentDate);
        paymentDateObj.setMonth(paymentDateObj.getMonth() + 1);
        return formatDate(paymentDateObj.toISOString().split('T')[0]); // Adjusted to handle only the date part
    };

    return (
        <div className="students-container">
            <h2>All Students</h2>
            {error && <p className="error">{error}</p>} {/* Display error message */}
            <table className="students-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Student Email</th>
                        <th>Grade Level</th>
                        <th>Payment Date</th>
                        <th>Subscription</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className={isOverdue(student.paymentDate) ? 'overdue' : ''}>
                            <td>{student.sFirstName} {student.sLastName}</td>
                            <td>{student.sEmail}</td>
                            <td>{student.gradeLevel}</td>
                            <td>{formatDate(student.paymentDate)}</td>
                            <td>
                                {isOverdue(student.paymentDate) 
                                    ? 'Must renew the subscription' 
                                    : `Next payment due by: ${nextPaymentDate(student.paymentDate)}`
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="back">
                <p><a href="#" onClick={handleBackToHome}>Back to Home</a></p>
            </div>
        </div>
    );
};

export default ShowAllStudent;
