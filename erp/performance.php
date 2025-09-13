<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "sandip_erp");

$result = $conn->query("SELECT name, attendance, marks FROM students");
$students = [];

while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students);
$conn->close();
?>
