import './Home.css';
import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
    return (
    <div>
        <h1>Welcome to the School Library</h1>
        <div className="left">
            <nav class="nav">
                <ul>
                    <li><a href="">Home</a></li>
                    <li><Link to="/Login">Login</Link></li>
                </ul>
            </nav>
        </div>
    </div>
    );
};

export default Home;