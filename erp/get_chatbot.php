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
if($conn->connect_error){ die(json_encode([])); }

$result=$conn->query("SELECT * FROM chatbot");
$rows = [];
while($row=$result->fetch_assoc()){ $rows[]=$row; }
echo json_encode($rows);
?>