import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import {FaInstagram ,FaFacebook, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

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
                        <li className="dropdown">
                            <span className="dropbtn">Librarian</span>
                            <div className="dropdown-content">
                                <Link to="/Login">Login</Link>
                                <Link to="/Registration">Sign Up</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <span className="dropbtn">Student</span>
                            <div className="dropdown-content">
                                <Link to="/ShowAllBooksS">Show All Books</Link>
                            </div>
                        </li>
                    </ul>
                </nav>
                <section class="contacts">
                    <div>
                        <a href="https://www.facebook.com/ana.vmin/" class="contact-details"><i> <FaFacebook  className='icon' />  Facebook</i></a>
                        <a href="https://www.instagram.com/alaa_abdalqader3012/" class="contact-details"><i><FaInstagram   className='icon' /> Instagram</i></a>
                        <a href="mailto:alaaav019@gmail.com" class="contact-details"><i><FaEnvelope className='icon' /> Send a mail</i></a>
                        <a href="tel:+970597527564" class="contact-details"><i><FaPhoneAlt className='icon' /> Call Us</i></a>
                    </div>
                </section>
                
            </div>
        </div>
    );
};

export default Home;
