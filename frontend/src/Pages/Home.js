import './Home.css';
import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to the School Library</h1>
            <div className="left">
                <nav className="nav">
                    <ul>
                        <li><Link to="/Login">Login</Link></li>
                        <li className="dropdown">
                            <a className="dropbtn">Book</a>
                            <div className="dropdown-content">
                                <Link to="/AddBook">Add a New Book</Link>
                                <Link to="/ShowAllBooks">Show All Books</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a className="dropbtn">School Book Club</a>
                            <div className="dropdown-content">
                                <Link to="/AddStudent">Add a Student </Link>
                                <Link to="/ShowAllStudent">Show All Students</Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Home;
