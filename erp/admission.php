<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "localhost";
$user = "root";
$pass = "";
$db   = "sandip_erp";

// Connect DB
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "DB connection failed: " . $conn->connect_error]);
    exit();
}

// Read JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Debug (optional)
// file_put_contents("debug.log", $rawData . PHP_EOL, FILE_APPEND);

$name  = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");

// Validation
if (!$name || !$email || !$phone) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit();
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email format"]);
    exit();
}
if (!preg_match("/^[0-9]{10}$/", $phone)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid phone number"]);
    exit();
}

// Insert into DB
$stmt = $conn->prepare("INSERT INTO admissions (name, email, phone) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $phone);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Admission saved successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Insert failed: " . $stmt->error]);
}























$stmt->close();
$conn->close();
?>
