<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$mysqli = new mysqli("localhost","root","","sandip_erp");
if ($mysqli->connect_error) {
  http_response_code(500);
  echo json_encode(["status"=>"error","message"=>"DB failed"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$teacher_id = intval($data["teacher_id"] ?? 0);
$parent_id  = intval($data["parent_id"] ?? 0);
$student_id = intval($data["student_id"] ?? 0);
$start      = $data["start"] ?? null;
$end        = $data["end"] ?? null;

if (!$teacher_id || !$parent_id || !$start || !$end) {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"Missing fields"]);
  exit;
}

/* OPTIONAL rule: prevent multiple bookings same day for same parent+teacher
SELECT 1 FROM ptm_slots WHERE teacher_id=? AND parent_id=? AND DATE(start)=DATE(?)
*/

$mysqli->begin_transaction();

try {
  // Check overlap: any booked/blocked slot that intersects requested window
  $stmt = $mysqli->prepare("
    SELECT id FROM ptm_slots
    WHERE teacher_id = ?
      AND status IN ('booked','blocked')
      AND NOT (end <= ? OR start >= ?)
    LIMIT 1
  ");
  $stmt->bind_param("iss", $teacher_id, $start, $end);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows > 0) {
    $stmt->close();
    $mysqli->rollback();
    http_response_code(409);
    echo json_encode(["status"=>"error","message"=>"Slot not available"]);
    exit;
  }
  $stmt->close();

  // Create booking
  $ins = $mysqli->prepare("
    INSERT INTO ptm_slots (teacher_id, start, end, status, parent_id, student_id)
    VALUES (?, ?, ?, 'booked', ?, ?)
  ");
  $ins->bind_param("issii", $teacher_id, $start, $end, $parent_id, $student_id);
  $ok = $ins->execute();
  $ins->close();

  if (!$ok) { throw new Exception("Insert failed"); }

  $mysqli->commit();
  echo json_encode(["status"=>"success","message"=>"Booked"]);
} catch (Exception $e) {
  $mysqli->rollback();
  http_response_code(500);
  echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
$mysqli->close();
