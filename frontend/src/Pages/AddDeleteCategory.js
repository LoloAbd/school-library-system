import React, { useState } from 'react';
import './AddDeleteCategory.css';
import { FaBook } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const AddDeleteCategory = () => {

     const [category, setCategory] = useState({
        addcategoryName: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategory(prev => ({ ...prev, [name]: value }));
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/AddDeleteCategory', category);
            console.log("Server response:", response);
            navigate('/AddDeleteCategory');
        } catch (err) {
            console.error("Submission error:", err);
        }
    };



    const [categoryName, setCategoryName] = useState('');
    const [foundCategory, setFoundCategory] = useState(null);

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleFindSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/categories/${categoryName}`);
            if (response.ok) {
                const data = await response.json();
                setFoundCategory(data);
            } else {
                setFoundCategory(null);
                alert("Category not found");
            }
        } catch (error) {
            console.error('Error finding category:', error);
            alert("Error finding category");
        }
    };


    const [deleteCategoryName, setDeleteCategoryName] = useState('');

    const handleDeleteCategoryChange = (e) => {
        setDeleteCategoryName(e.target.value);
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/categories/${deleteCategoryName}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Category deleted successfully");
            } else {
                alert("Category not found");
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert("Error deleting category");
        }
    };




 return (
        <div className='parentWrapper'>
            <div className='childWrapper'>
                <form className='form' onSubmit={handleSubmit}>
                    <h2>Add Category</h2>
                    <div className="input-box1">
                        <input 
                            type="text"
                            placeholder='Category Name' 
                            name="addcategoryName" 
                            onChange={handleChange}
                            required 
                        />
                        <TbCategoryPlus className='icon' />
                    </div>
                    <button type="submit" className='add'>Add</button>
                </form>
            </div>

            <div className='childWrapper'>
                <form className='form' onSubmit={handleFindSubmit}>
                    <h2>Find Category</h2>
                    
                    <div className="input-box1">
                        <input 
                            type="search"
                            placeholder='Enter Category Name' 
                            onChange={handleCategoryNameChange}
                            name="categoryName"
                            required
                        />
                        <FaBook className='icon' />
                    </div>
                    <button type="submit" className='find'>Find</button>
                    <div className="input-box1">
                        <label>Category ID: {foundCategory && foundCategory.id}</label>
                    </div>
                    <div className="input-box1">
                        <label>Category Name: {foundCategory && foundCategory.categoryName}</label>
                 </div>
                 <div className="AddBook-link"><Link to='/AddBook'><a>Back</a></Link></div>
                </form>
         </div>
            <div className='childWrapper'>
                <form className='form' onSubmit={handleDeleteSubmit}>
                    <h2>Delete Category</h2>
                    <div className="input-box1">
                        <input 
                            type="search"
                            placeholder='Enter Category ID' 
                            onChange={handleDeleteCategoryChange}
                            name="id"
                            required
                        />
                        <FaBook className='icon' />
                    </div>
                 <button type="submit" className='delete'>Delete</button>
             </form>
         </div>
     </div>
     
    );
};

export default AddDeleteCategory;