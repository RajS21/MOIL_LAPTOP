import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root456', // Replace with your MySQL password
    database: 'basictest' // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL Database.');
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Error handler middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// FOR AUTO INCREMENT
app.post('/api/employees', async (req, res) => {
    const newEmployee = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Fetch all slno values
        const [rows] = await connection.execute('SELECT slno FROM employees ORDER BY slno');
        const slnos = rows.map(row => row.slno);

        // Find the smallest missing slno
        let newSlno = 1;
        for (let i = 0; i < slnos.length; i++) {
            if (slnos[i] != newSlno) {
                break;
            }
            newSlno++;
        }

        // Insert the new employee with the determined slno
        const [result] = await connection.execute(
            'INSERT INTO employees (slno, name, department) VALUES (?, ?, ?)',
            [newSlno, newEmployee.name, newEmployee.department]
        );

        await connection.end();

        res.status(201).json({ id: result.insertId, slno: newSlno, ...newEmployee });
    } catch (error) {
        console.error('Error inserting new employee:', error);
        res.status(500).json({ error: 'Failed to insert new employee' });
    }
});

// API endpoint to fetch employee data by ID
app.get('/api/employee/:id', (req, res, next) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM employees WHERE EMPNO = ?';

    db.query(sql, [id], (err, data) => {
        if (err) {
            return next(err); // Pass error to error handler middleware
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(data[0]);
    });
});

// API endpoint to add new employee data
app.post('/api/employee', (req, res, next) => {
    const newEmployee = req.body;

    // Validate the incoming data
    if (!newEmployee.EMPNO || !newEmployee.EMPNAME) {
        return res.status(400).json({ error: 'EMPNO and EMPNAME are required' });
    }

    console.log('New employee data received:', newEmployee);

    const sql = 'INSERT INTO employees SET ?';

    db.query(sql, newEmployee, (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            return next(err); // Pass error to error handler middleware
        }
        console.log('New employee added:', result.insertId);
        res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
    });
});

// API endpoint to fetch employee data from the list table by EMPNO
app.get('/api/list/employee/:empno', (req, res, next) => {
    const { empno } = req.params;
    const sql = 'SELECT EMPNAME, `MINE NAME` FROM list WHERE EMPNO = ?';

    db.query(sql, [empno], (err, data) => {
        if (err) {
            console.error('Error fetching data from list table:', err);
            return next(err); // Pass error to error handler middleware
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Employee not found in list table' });
        }
        res.json(data[0]);
    });
});


// API endpoint to update employee data
app.put('/api/employee/:id', (req, res, next) => {
    const { id } = req.params;
    const updatedEmployee = req.body; // Assuming req.body contains the updated employee data

    const sql = 'UPDATE employees SET ? WHERE EMPNO = ?';

    db.query(sql, [updatedEmployee, id], (err, result) => {
        if (err) {
            return next(err); // Pass error to error handler middleware
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        console.log('Employee updated:', id);
        res.json({ message: 'Employee updated successfully' });
    });
});

// API endpoint to delete employee data
app.delete('/api/employee/:id', (req, res, next) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employees WHERE EMPNO = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return next(err); // Pass error to error handler middleware
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        console.log('Employee deleted:', id);
        res.json({ message: 'Employee deleted successfully' });
    });
});

// API endpoint to fetch all employees
app.get('/api/employees/all', (req, res, next) => {
    const sql = 'SELECT * FROM employees';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch all employees:', err);
            return next(err); // Pass error to error handler middleware
        }
        res.json(results);
    });
});

// Endpoint to fetch year-wise data with labels
app.get('/api/employees/year-wise', (req, res, next) => {
    const sql = `
        SELECT 
            YEAR(STR_TO_DATE(\`INVOICE DATE\`, '%d.%m.%Y')) AS year,
            COUNT(*) AS count
        FROM employees
        GROUP BY year
        ORDER BY year`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch year-wise data:', err);
            return next(err); // Pass error to error handler middleware
        }

        // Transform the results to include label and count
        const transformedData = results.map(item => ({
            label: item.year.toString(), // Ensure label is a string
            count: item.count
        }));

        res.json(transformedData);
    });
});


// Endpoint to fetch department-wise data
app.get('/api/employees/department-wise', (req, res, next) => {
    const sql = 'SELECT `DEPARTMENT` AS label, COUNT(*) AS count FROM employees GROUP BY `DEPARTMENT`';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch department-wise data:', err);
            return next(err); // Pass error to error handler middleware
        }

        res.json(results);
    });
});

// Endpoint to fetch mine-wise data
app.get('/api/employees/mine-wise', (req, res, next) => {
    const sql = 'SELECT `MINE NAME` AS label, COUNT(*) AS count FROM employees GROUP BY `MINE NAME`';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch mine-wise data:', err);
            return next(err); // Pass error to error handler middleware
        }

        res.json(results);
    });
});

// Endpoint to fetch laptop-wise data
app.get('/api/employees/laptop-wise', (req, res, next) => {
    const sql = 'SELECT `LAPTOP MAKE` AS label, COUNT(*) AS count FROM employees GROUP BY `LAPTOP MAKE`';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch laptop-wise data:', err);
            return next(err); // Pass error to error handler middleware
        }

        res.json(results);
    });
});


// API endpoint to fetch employees based on category and subcategory
app.get('/api/employees/:category/:subcategory', (req, res, next) => {
    const { category, subcategory } = req.params;
    let sql;

    switch (category) {
        case 'year':
            sql = `
                SELECT * 
                FROM employees 
                WHERE YEAR(STR_TO_DATE(\`INVOICE DATE\`, '%d.%m.%Y')) = ?`;
            break;
        case 'department':
            sql = 'SELECT * FROM employees WHERE `DEPARTMENT` = ?';
            break;
        case 'mine':
            sql = 'SELECT * FROM employees WHERE `MINE NAME` = ?';
            break;
        case 'laptop':
            sql = 'SELECT * FROM employees WHERE `LAPTOP MAKE` = ?';
            break;
        default:
            return res.status(400).json({ error: 'Invalid category' });
    }

    db.query(sql, [subcategory], (err, data) => {
        if (err) {
            console.error('Failed to fetch data:', err);
            return next(err); // Pass error to error handler middleware
        }
        res.json(data);
    });
});

// Date-wise Fetch Endpoint
app.get('/api/employees/datewise', (req, res) => {
    const { dateFrom, dateTo } = req.query;

    // Convert the date format to match the database format (dd.mm.yyyy)
    const formattedDateFrom = dateFrom.split('-').reverse().join('.');
    const formattedDateTo = dateTo.split('-').reverse().join('.');

    const query = `
    SELECT *
    FROM employees
    WHERE STR_TO_DATE(\`INVOICE DATE\`, '%d.%m.%Y') BETWEEN STR_TO_DATE('${formattedDateFrom}', '%d.%m.%Y') AND STR_TO_DATE('${formattedDateTo}', '%d.%m.%Y')
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

// API endpoint to fetch total amounts
app.get('/api/employees/totalamounts', (req, res, next) => {
    const sql = `
        SELECT 
            YEAR(STR_TO_DATE(\`INVOICE DATE\`, '%d.%m.%Y')) AS year,
            SUM(\`TOTAL AMOUNT\`) AS totalAmount
        FROM employees
        GROUP BY year
        ORDER BY year`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch year-wise data:', err);
            return next(err); // Pass error to error handler middleware
        }

        // Calculate overall total in Rupees
        const overallTotal = results.reduce((acc, curr) => acc + curr.totalAmount, 0);

        // Prepare response object
        const response = {
            overallTotal: overallTotal,
            yearWiseTotal: results
        };

        res.json(response);
    });
});

// Start server
app.listen(port, () => {
    console.log('Server running on port ${port}');
});