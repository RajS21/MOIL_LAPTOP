<!DOCTYPE html>
<html>
<head>
    <title>Upload PDF</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Select PDF to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    Employee Number: <input type="text" name="empno"> <!-- Corrected name to empno -->
    <input type="submit" value="Upload PDF" name="submit">
</form>

</body>
</html>


