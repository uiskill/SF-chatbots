<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$db = "sandip_chatbot";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode([]));
}

$userId = $_GET['userId'] ?? '';
if (!$userId) {
    echo json_encode([]);
    exit;
}

$sql = "SELECT message, response, created_at FROM chat_history WHERE user_id=? ORDER BY created_at ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = ["type" => "user", "text" => $row['message']];
    $messages[] = ["type" => "bot", "text" => $row['response']];
}

echo json_encode($messages);
$conn->close();
?>
