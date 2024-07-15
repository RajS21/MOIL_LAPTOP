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

// Directory where PDFs will be stored (ensure this directory exists)
$uploadDir = "D:/UPLOADS/pdf_uploads/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$uploadFile = $uploadDir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;

// Check if file already exists
if (file_exists($uploadFile)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size (e.g., max 5MB)
if ($_FILES["fileToUpload"]["size"] > 5000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow only PDF file formats
$fileType = strtolower(pathinfo($uploadFile, PATHINFO_EXTENSION));
if ($fileType != "pdf") {
    echo "Sorry, only PDF files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $uploadFile)) {
        echo "File successfully uploaded to: " . $uploadFile;

        // Get employee ID (EMPNO)
        $empno = $_POST['empno']; // Replace with your method of getting EMPNO

        // Check if employee already has a row in employees table
        $sql_check = "SELECT * FROM employees WHERE EMPNO = ?";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bind_param("s", $empno);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();

        if ($result_check->num_rows > 0) {
            // Update existing row
            $sql_update = "UPDATE employees SET pdf_path = ? WHERE EMPNO = ?";
            $stmt_update = $conn->prepare($sql_update);
            $stmt_update->bind_param("ss", $uploadFile, $empno);
            if ($stmt_update->execute()) {
                echo "PDF file path updated for EMPNO: " . $empno;
            } else {
                echo "Error updating PDF file path: " . $stmt_update->error;
            }
        } else {
            // Insert new row
            $sql_insert = "INSERT INTO employees (EMPNO, pdf_path) VALUES (?, ?)";
            $stmt_insert = $conn->prepare($sql_insert);
            $stmt_insert->bind_param("ss", $empno, $uploadFile);
            if ($stmt_insert->execute()) {
                echo "PDF file path inserted for EMPNO: " . $empno;
            } else {
                echo "Error inserting PDF file path: " . $stmt_insert->error;
            }
        }
    } else {
        echo "Error uploading file.";
    }
}

// Close connection
$conn->close();
?>


