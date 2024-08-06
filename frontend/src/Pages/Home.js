import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="head1">
                <h1>Welcome to the School Library</h1>
                <p>
                    Welcome to our School Library System! <br></br> Our library is a gateway to a world of knowledge and imagination,
                    offering a vast collection of books. <br></br>
                    Whether you're looking for academic support, recreational reading,
                    or research materials, our system is designed to provide easy access to all the resources you need.
                    <br></br> Join us in exploring the endless possibilities of learning and discovery!
                </p>
            </div>
            <div className="left">
                <nav className="nav">
                    <ul>
                        <li><Link to="/Login">Login</Link></li>
                        <li className="dropdown">
                            <span className="dropbtn">Book</span>
                            <div className="dropdown-content">
                                <Link to="/AddBook">Add a New Book</Link>
                                <Link to="/ShowAllBooks">Show All Books</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <span className="dropbtn">School Book Club</span>
                            <div className="dropdown-content">
                                <Link to="/AddStudent">Add a Student</Link>
                                <Link to="/ShowAllStudents">Show All Students</Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Home;
