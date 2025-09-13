<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
$host="localhost"; $user="root"; $pass=""; $db="sandip_chatbot";
$conn=new mysqli($host,$user,$pass,$db);
if($conn->connect_error){ die(json_encode(["status"=>"error"])); }

$data = json_decode(file_get_contents("php://input"), true);
$question = $data['question'] ?? '';
$answer = $data['answer'] ?? '';

if($question && $answer){
    $stmt=$conn->prepare("INSERT INTO chatbot (question, answer) VALUES (?,?)");
    $stmt->bind_param("ss",$question,$answer);
    $stmt->execute();
    echo json_encode(["status"=>"success"]);
}else{
    echo json_encode(["status"=>"error","message"=>"Invalid data"]);
}
?>
