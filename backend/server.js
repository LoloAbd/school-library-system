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