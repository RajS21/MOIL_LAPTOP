import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root456",
    database: "basictest"
})

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL Database.');
})

app.use(express.json())
app.use(cors())

app.get("/api/baisctest_csv", (req, res) => {
    const sql = "SELECT * FROM baisctest_csv";
    db.query(sql, (err,data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal Server Error'});
        }
        res.json(data);
    })
})

app.listen(3000, ()=>{
    console.log("Server running on part 3000");
});