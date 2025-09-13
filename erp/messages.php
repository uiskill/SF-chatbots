<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET");

$host = "localhost";
$user = "root";
$pass = "";
$db   = "sandip_chatbot";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed"]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = intval($data["user_id"]);
    $message = $conn->real_escape_string($data["message"]);

    $sql = "INSERT INTO messages (user_id, message) VALUES ($user_id, '$message')";
    if ($conn->query($sql)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $user_id = intval($_GET["user_id"]);
    $sql = "SELECT * FROM messages WHERE user_id=$user_id ORDER BY created_at ASC";
    $result = $conn->query($sql);
    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode(["status" => "success", "messages" => $messages]);
}
