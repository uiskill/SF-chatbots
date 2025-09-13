// Responsive Timetable

import React from "react";


const timetable = {
  Monday: [
    { time: "9:00 - 10:00", subject: "Maths", teacher: "Mr. Sharma", room: "101" },
    { time: "10:00 - 11:00", subject: "Physics", teacher: "Ms. Patel", room: "102" },
    { time: "11:00 - 12:00", subject: "English", teacher: "Mr. Khan", room: "103" },
    
  ],
  Tuesday: [
    { time: "9:00 - 10:00", subject: "Chemistry", teacher: "Ms. Verma", room: "101" },
    { time: "10:00 - 11:00", subject: "Biology", teacher: "Mr. Singh", room: "102" },
    { time: "11:00 - 12:00", subject: "History", teacher: "Mr. Gupta", room: "103" },
  ],
  // Add Wednesday – Saturday similarly
};

const Timetable = () => {
  return (
    <div className="container card p-5 mt-4">
      <h2 className="text-center mb-4">📅 Class Timetable</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(timetable).map(([day, sessions]) =>
              sessions.map((session, index) => (
                <tr key={`${day}-${index}`}>
                  {index === 0 && (
                    <td rowSpan={sessions.length} className="fw-bold">
                      {day}
                    </td>
                  )}
                  <td>{session.time}</td>
                  <td>{session.subject}</td>
                  <td>{session.teacher}</td>
                  <td>{session.room}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
