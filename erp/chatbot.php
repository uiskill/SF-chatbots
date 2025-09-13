<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "localhost";
$user = "root";
$pass = "";
$db   = "sandip_chatbot";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB Connection Failed"]);
    exit;
}

// Get input (support JSON or FormData)
$input = json_decode(file_get_contents("php://input"), true);
$message = $input['message'] ?? $_POST['message'] ?? '';

if ($message) {
    $userMessage = strtolower(trim($message));
    
    $stmt = $conn->prepare("SELECT answer FROM chatbot WHERE question LIKE CONCAT('%', ?, '%')");
    if (!$stmt) {
        echo json_encode(["status"=>"error", "message"=>$conn->error]);
        exit;
    }
    $stmt->bind_param("s", $userMessage);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(["status" => "success", "answer" => $row['answer']]);
    } else {
        echo json_encode(["status" => "success", "answer" => "Sorry, I don't understand. Please contact admin."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No message received"]);
}
?>
