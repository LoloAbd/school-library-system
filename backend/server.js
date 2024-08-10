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


/////////////////////////////////////////////////////////////////////////////////////////////

// Function to generate a random 6-digit number
const generateRandom6DigitNumber = () => Math.floor(100000 + Math.random() * 900000);
const code = generateRandom6DigitNumber();

app.get('/api/code', (req, res) => {
    res.json({ code: code });
});


app.post('/forgotPassword', (req, res) => {

    const email = req.body.email;
    const expiryDate = new Date(Date.now() + 120000);

    // Update the database with the code and expiry date
   const sql = "UPDATE user SET code = ?, codeExpiry = ? WHERE email = ?";
    db.query(sql, [code, expiryDate, email], (err, data) => {
         if (err) {
            console.error('Error Email not found', err);
            return res.status(500).json({ message: "Error Email not found", error: err });
        }
        return res.status(201).json(data);
    });

});

function clearExpiredCodes() {
    
    const now = new Date();
    const sql = "UPDATE user SET code = NULL, codeExpiry = NULL WHERE codeExpiry < ?";
    db.query(sql, [now], (err, data) => {
        if (err) {
            console.error('Error clearing expired codes', err);
        } else {
            console.log('Expired codes cleared:', data.affectedRows);
        }
    });
}

setInterval(clearExpiredCodes, 120000);



// Reset Password Endpoint
app.post('/resetPassword', async (req, res) => {
    const {code, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

        const sql = "UPDATE user SET password = ? WHERE code = ?";
        db.query(sql, [newPassword, code], (err, updateResult) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ message: 'Error updating password' });
            }
            return res.status(200).json({ message: 'Password updated successfully' });
        });

});


//////////////////////////////////////////////////////////////////////////////////////////////


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



// Display all borrowed books

app.get('/loans', (req, res) => {
    const sql = "SELECT * FROM lend";
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).json({ message: "Error fetching students", error: err });
        }
        return res.status(200).json(data);
    });
});


// borrowed books and Delete it 
app.post('/lend', (req, res) => {
    const insertLendSql = "INSERT INTO lend(studentId, bookId, sfName, bookTitle, lendDate, dueDate) VALUES (?, ?, ?, ?, ?, ?)";
    const deleteBookSql = "DELETE FROM book WHERE id = ?";
    const lendValues = [
        req.body.studentId,
        req.body.bookId,
        req.body.sfName,
        req.body.bookTitle,
        req.body.lendDate,
        req.body.dueDate
    ];

    db.query(insertLendSql, lendValues, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        
        db.query(deleteBookSql, [req.body.bookId], (err, result) => {
            if (err) {
                console.error('Error deleting book:', err);
                return res.status(500).json({ message: "Error deleting book", error: err });
            }
            
            return res.status(201).json({ message: "Book lent successfully and deleted from inventory", data: result });
        });
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
    const sql = "SELECT id, firstName FROM user WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Error during login query:", err);
            return res.status(500).json({ status: "Error", message: "Internal server error" });
        }
        if (data.length > 0) {
            const librarianId = data[0].id;
            const librarianName = data[0].firstName;
            return res.json({
                status: "Success",
                librarianId: librarianId,
                librarianName: librarianName
            });
        } else {
            return res.status(401).json({ status: "Fail", message: "Invalid email or password" });
        }
    });
});




app.post('/Fees', (req, res) => {
    const sqlInsertFee = "INSERT INTO fees(librarianId, librarianName, studentId, sfName, mFees, paymentDate) VALUES (?, ?, ?, ?, ?, ?)";
    const sqlUpdateStudent = "UPDATE student SET paymentDate = ? WHERE id = ?";
    const values = [
        req.body.librarianId,
        req.body.librarianName,
        req.body.studentId,
        req.body.sfName,
        req.body.mFees,
        req.body.paymentDate
    ];

    // Start a transaction
    db.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ message: "Error starting transaction", error: err });
        }

        // Insert into fees table
        db.query(sqlInsertFee, values, (err, result) => {
            if (err) {
                console.error('Error inserting data into fees table:', err);
                return db.rollback(() => {
                    res.status(500).json({ message: "Error inserting data into fees table", error: err });
                });
            }

            // Update paymentDate in students table
            db.query(sqlUpdateStudent, [req.body.paymentDate, req.body.studentId], (err, result) => {
                if (err) {
                    console.error('Error updating students table:', err);
                    return db.rollback(() => {
                        res.status(500).json({ message: "Error updating students table", error: err });
                    });
                }

                // Commit the transaction
                db.commit(err => {
                    if (err) {
                        console.error('Error committing transaction:', err);
                        return db.rollback(() => {
                            res.status(500).json({ message: "Error committing transaction", error: err });
                        });
                    }

                    res.status(201).json({ message: "Data inserted successfully", paymentDate: req.body.paymentDate });
                });
            });
        });
    });
});



app.listen(8081, () => {
    console.log("Server running on port 8081");
});

