<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

// DB connection
$host = "localhost";
$user = "root";
$pass = "";
$db   = "sandip_chatbot";

$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error){
    echo json_encode(["status"=>"error","message"=>"DB connection failed"]);
    exit;
}

// Read input
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if(!$email || !$password){
    echo json_encode(["status"=>"error","message"=>"Email & password required"]);
    exit;
}

// Fetch user
$stmt = $conn->prepare("SELECT * FROM client WHERE email=? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();
$user = $res->fetch_assoc();

if($user){
    // Check hashed password
    if(password_verify($password, $user['password'])){
        echo json_encode([
            "status"=>"success",
            "user"=>[
                "id"=>$user['id'],
                "username"=>$user['username'],
                "email"=>$user['email']
            ]
        ]);
    } else {
        echo json_encode(["status"=>"error","message"=>"Invalid password"]);
    }
} else {
    echo json_encode(["status"=>"error","message"=>"User not found"]);
}

$conn->close();
?>
