<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$host="localhost"; $user="root"; $pass=""; $db="sandip_chatbot";
$conn=new mysqli($host,$user,$pass,$db);
if($conn->connect_error){ die(json_encode(["status"=>"error"])); }

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if($username && $email && $password){
	
	$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

	
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO client (username,email,password) VALUES (?,?,?)");
    $stmt->bind_param("sss", $username,$email,$hashed);
    if($stmt->execute()){
        echo json_encode(["status"=>"success"]);
    } else {
        echo json_encode(["status"=>"error","message"=>"User already exists"]);
    }
} else {
    echo json_encode(["status"=>"error","message"=>"Invalid data"]);
}
?>
