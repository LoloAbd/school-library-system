import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShowAllStudents.css'; 

const ShowAllStudent = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8081/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="students-container">
            <h2>All Students</h2>
            <table className="students-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Student Email</th>
                        <th>Grade Level</th>
                        <th>Identity Number</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.sFirstName} {student.sLastName}</td>
                            <td>{student.sEmail}</td>
                            <td>{student.gradeLevel}</td>
                            <td>{student.identityNumber}</td>
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
