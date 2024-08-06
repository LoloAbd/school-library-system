const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sls"
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});



app.post('/Registration', (req, res) => {
    const sql = "INSERT INTO user(firstName, lastName, email, password) VALUES (?,?,?,?)";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
    ];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        return res.status(201).json(data);
    });
});


app.get('/categories', (req, res) => {
    const sql = "SELECT * FROM category";
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: "Error fetching data", error: err });
        }
        return res.status(200).json(data);
    });
});

// Add Book
app.post('/AddBook', (req, res) => {
    const sql = "INSERT INTO book(title, author, publisher, publicationYear, edition, category, shelfLocation, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.title,
        req.body.author,
        req.body.publisher,
        req.body.publicationYear,
        req.body.edition,
        req.body.category,
        req.body.shelfLocation,
        req.body.description
    ];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        return res.status(201).json(data);
    });
});


// Add Student
app.post('/AddStudent', (req, res) => {
    const sql = "INSERT INTO student(sFirstName, sLastName, dateOfBirth, sEmail, gradeLevel, identityNumber) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.sFirstName,
        req.body.sLastName,
        req.body.dateOfBirth,
        req.body.sEmail,
        req.body.gradeLevel,
        req.body.identityNumber,
    ];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        return res.status(201).json(data);
    });
});

// Show all Students

app.get('/students', (req, res) => {
    const sql = "SELECT * FROM student";
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).json({ message: "Error fetching students", error: err });
        }
        return res.status(200).json(data);
    });
});


// Add category
app.post('/AddDeleteCategory', (req, res) => {
    const sql = "INSERT INTO category(categoryName) VALUES (?)";
    const values = [
        req.body.addcategoryName
    ];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        return res.status(201).json(data);
    });
});


// Find a category by name
app.get('/categories/:categoryName', (req, res) => {
    const sql = "SELECT * FROM category WHERE categoryName = ?";
    const values = [req.params.categoryName];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: "Error fetching data", error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(data[0]);
    });
});


// Delete a category by id
app.delete('/categories/:id', (req, res) => {
    const sql = "DELETE FROM category WHERE id = ?";
    const values = [req.params.id];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ message: "Error deleting data", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    });
});

// Fetch all books
app.get('/books', (req, res) => {
    const sql = "SELECT * FROM book";
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: "Error fetching data", error: err });
        }
        return res.status(200).json(data);
    });
});

// Get books based on search criteria
app.get('/books/search', (req, res) => {
    const searchTerm = req.query.q;
    const sql = "SELECT * FROM book WHERE title LIKE ? OR category LIKE ?";
    const values = [`%${searchTerm}%`, `%${searchTerm}%`];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: "Error fetching data", error: err });
        }
        return res.status(200).json(data);
    });
});


app.post('/Login', (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        }
        else {
            return res.json("Fail");
        }
    });
});

app.listen(8081, () => {
    console.log("Server running on port 8081");
});