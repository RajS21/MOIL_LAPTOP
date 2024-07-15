<?php
// Database connection details
$servername = "localhost";
$username = "root";      // MySQL username
$password = "root456";   // MySQL password
$dbname = "basictest";   // Database name
$port = 3306;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get empno from query string
$empno = $_GET['empno'];

// Fetch pdf_path from database based on empno
$sql = "SELECT pdf_path FROM employees WHERE EMPNO = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $empno);
$stmt->execute();
$stmt->bind_result($pdf_path);
$stmt->fetch();

// Close statement and connection
$stmt->close();
$conn->close();

// Check if pdf_path exists
if ($pdf_path) {
    // Output PDF file
    header("Content-type: application/pdf");
    readfile($pdf_path);
} else {
    // Handle error if pdf_path not found
    echo "PDF file not found for EMPNO: " . $empno;
}
?>
