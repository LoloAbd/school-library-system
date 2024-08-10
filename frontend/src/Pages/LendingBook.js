import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import './LendingBook.css';



const LendingBook = () => {
    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({
        studentId: '',
        bookId: '',
        sfName: '',
        bookTitle: '',
        lendDate: '',
        dueDate: ''
    });

    const navigate = useNavigate();

    const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    };
    

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8081/students');
                setStudents(response.data);
            } catch (err) {
                console.error("Error fetching students:", err);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8081/books');
                setBooks(response.data);
            } catch (err) {
                console.error("Error fetching books:", err);
            }
        };

        fetchStudents();
        fetchBooks();
    }, []);

    const handleLendDateChange = (e) => {
        const newLendDate = e.target.value;
        setFormData(prevState => ({ ...prevState, lendDate: newLendDate }));

        if (newLendDate) {
            const lendDateObj = new Date(newLendDate);
            const dueDate = new Date(lendDateObj);
            dueDate.setDate(lendDateObj.getDate() + 7);
            setFormData(prevState => ({
                ...prevState,
                dueDate: dueDate.toISOString().split('T')[0]
            }));
        }
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

    const handleBookChange = (e) => {
        const selectedTitle = e.target.value;
        const selectedBook = books.find(book => book.title === selectedTitle);
        setFormData(prevState => ({
            ...prevState,
            bookId: selectedBook ? selectedBook.id : '',
            bookTitle: selectedTitle
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/lend', formData)
            .then(response => {
                navigate('/LibrarianHome');
            })
            .catch(error => {
                console.error('Error lending book:', error);
            });
    };

    return (
        <div className="WrapperLending">
            <div className='form-box'>
                <h2>Lending a Book to a Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="column">
                        <div className="input-box">
                            <label htmlFor="sfName">Student Name</label>
                            <select id="sfName" name="sfName" onChange={handleStudentChange} required>
                                <option value="">Select Student</option>
                                {students.map(student => (
                                    <option key={student.id} value={student.sFirstName}>{student.sFirstName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-box">
                            <label htmlFor="bookTitle">Book Title</label>
                            <select id="bookTitle" name="bookTitle" onChange={handleBookChange} required>
                                <option value="">Select Book</option>
                                {books.map(book => (
                                    <option key={book.id} value={book.title}>{book.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-box">
                            <label htmlFor="lendDate">Lend Date</label>
                            <input
                                type="date"
                                id="lendDate"
                                name="lendDate"
                                min={getCurrentDate()}
                                max="2026-12-31"
                                onChange={handleLendDateChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="column">
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
                            <label htmlFor="bookId">Book ID</label>
                            <input
                                type="text"
                                id="bookId"
                                name="bookId"
                                value={formData.bookId}
                                readOnly
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                readOnly
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Lend The Book</button>
                    <div className="link">
                        <Link to='/LibrarianHome'>Back to Home</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LendingBook;
