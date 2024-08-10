import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';

const LibrarianHome = () => {
    return (
        <div>
            <div className="head1">
                <h1>Welcome to Librarian Home Page</h1>
            </div>
            <div className="left">
                <nav className="nav">
                    <ul>
                        <li> <Link to="/">Home</Link></li>
                        <li className="dropdown">
                            <span className="dropbtn">Book</span>
                            <div className="dropdown-content">
                                <Link to="/AddBook">Add a New Book</Link>
                                <Link to="/ShowAllBooks">Show All Books</Link>
                                <Link to="/LendingBook">lending a book</Link>
                                <Link to="/ShowBorrowedBooks">Show All Borrowed Books</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <span className="dropbtn">School Book Club</span>
                            <div className="dropdown-content">
                                <Link to="/AddStudent">Add a Student</Link>
                                <Link to="/StudentFee">Monthly Subscription Fees</Link>
                                <Link to="/ShowAllStudent">Show All Students</Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default LibrarianHome;
