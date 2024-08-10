import React, { useState, useEffect } from 'react';
import './AddBook.css';
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom";

const AddBook = () => {
    const [book, setBooks] = useState({
        title: '',
        author: '',
        publisher: '',
        publicationYear: '',
        edition: '',
        category: '',
        shelfLocation: '',
        description: ''
    });

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8081/categories');
                setCategories(response.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBooks(prev => ({ ...prev, [name]: value }));
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/AddBook', book);
            console.log("Server response:", response);
            alert("Book inserted successfully");
            navigate('/LibrarianHome');
        } catch (err) {
            console.error("Submission error:", err);
        }
    };

    return (
        <div className="wrapperBook">
            <div className='form-box book'>
                <h2>Add New Book</h2>
                <form onSubmit={handleSubmit}>
                    <div className="column">
                        <div className="input-box">
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                placeholder="Title"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="author"
                                onChange={handleChange}
                                placeholder="Author"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="publisher"
                                onChange={handleChange}
                                placeholder="Publisher"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="number"
                                min="1900"
                                name="publicationYear"
                                onChange={handleChange}
                                placeholder="Publication Year"
                                required
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-box">
                            <input
                                type="text"
                                name="edition"
                                onChange={handleChange}
                                placeholder="Edition"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="shelfLocation"
                                onChange={handleChange}
                                placeholder="Shelf Location"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <textarea
                                name="description"
                                onChange={handleChange}
                                placeholder="Description"
                                required
                                rows="4"
                            />
                        </div>
                         <div className="input-box">
                            <select
                                name="category"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.categoryName}>
                                        {category.categoryName}
                                    </option>
                                ))}
                                
                            </select>
                            <div className="Add-Category"> <p><Link to="/AddDeleteCategory">Add or Delete Category</Link></p> </div>
                        </div>
                    </div>
                    <button type="submit">Add Book</button>
                    <div className="link">
                        <Link to='/LibrarianHome'><a>Back to Home</a></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
