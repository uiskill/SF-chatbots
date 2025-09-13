<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost","root","","sandip_erp");
if ($mysqli->connect_error) {
  http_response_code(500);
  echo json_encode(["status"=>"error","message"=>"DB failed"]);
  exit;
}

$teacher_id = intval($_GET["teacher_id"] ?? 0);
$start = $_GET["start"] ?? null; // "YYYY-MM-DD HH:MM:SS"
$end   = $_GET["end"] ?? null;

if (!$teacher_id || !$start || !$end) {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"Bad params"]);
  exit;
}

$stmt = $mysqli->prepare("
  SELECT start, end, status
  FROM ptm_slots
  WHERE teacher_id = ? AND start >= ? AND end <= ?
  ORDER BY start ASC
");
$stmt->bind_param("iss", $teacher_id, $start, $end);
$stmt->execute();
$res = $stmt->get_result();

$slots = [];
while ($row = $res->fetch_assoc()) {
  $slots[] = [
    "start" => $row["start"],
    "end"   => $row["end"],
    "status"=> $row["status"]
  ];
}
echo json_encode($slots);
$stmt->close();
$mysqli->close();
