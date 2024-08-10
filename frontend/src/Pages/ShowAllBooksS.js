import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShowAllBooks.css';

const ShowAllBooks = () => {
    
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8081/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="books-container">
            <h2>All Books</h2>
            <input
                type="text"
                placeholder="Search by title or category"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <table className="books-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.category}</td>
                            <td>{book.description}</td>
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

export default ShowAllBooks;
