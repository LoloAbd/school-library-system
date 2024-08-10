import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShowAllBooks.css';

const ShowBorrowedBooks = () => {
    const [Loans, setLoans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:8081/loans');
                setLoans(response.data);
            } catch (error) {
                console.error('Error fetching Loans:', error);
            }
        };

        fetchLoans();
    }, []);

    const handleBackToHome = () => {
        navigate('/LibrarianHome');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const isOverdue = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        return dueDateObj < currentDate;
    };

    return (
        <div className="books-container">
            <h2>All Borrowed Books</h2>
            <table className="books-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student ID</th>
                        <th>Book Title</th>
                        <th>Borrowing Date</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Loans.map((loan) => (
                        <tr key={loan.id} className={isOverdue(loan.dueDate) ? 'overdue' : ''}>
                            <td>{loan.sfName}</td>
                            <td>{loan.studentId}</td>
                            <td>{loan.bookTitle}</td>
                            <td>{formatDate(loan.lendDate)}</td>
                            <td>{formatDate(loan.dueDate)}</td>
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

export default ShowBorrowedBooks;
