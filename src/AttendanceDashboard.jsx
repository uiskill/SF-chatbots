//Faculty needs an attendance dashboard where they can mark attendance quickly. Current design requires too many clicks.

import React, { useState,useEffect } from "react";

const studentsData = [
  { id: 1, name: "Amit Sharma", roll: "CSE101" },
  { id: 2, name: "Priya Verma", roll: "CSE102" },
  { id: 3, name: "Rahul Singh", roll: "CSE103" },
  { id: 4, name: "Neha Patil", roll: "CSE104" },
  { id: 5, name: "Karan Mehta", roll: "CSE105" },
  { id: 6, name: "Simran Kaur", roll: "IT201" },
  { id: 7, name: "Ankit Yadav", roll: "IT202" },
  { id: 8, name: "Pooja Deshmukh", roll: "IT203" },
  { id: 9, name: "Ravi Kumar", roll: "IT204" },
  { id: 10, name: "Sneha Reddy", roll: "ECE301" },
  { id: 11, name: "Arjun Nair", roll: "ECE302" },
  { id: 12, name: "Manisha Gupta", roll: "ECE303" },
  { id: 13, name: "Deepak Joshi", roll: "ECE304" },
  { id: 14, name: "Rohit Pawar", roll: "Mech401" },
  { id: 15, name: "Shreya Kulkarni", roll: "Mech402" },
  { id: 16, name: "Vikram Chauhan", roll: "Mech403" },
  { id: 17, name: "Aishwarya Iyer", roll: "Mech404" },
  { id: 18, name: "Siddharth Jain", roll: "Civil501" },
  { id: 19, name: "Komal Mishra", roll: "Civil502" },
  { id: 20, name: "Harsh Vora", roll: "Civil503" },
];


const AttendanceDashboard = () => {
  const [attendance, setAttendance] = useState({});
   const [darkMode, setDarkMode] = useState(false);

  // Toggle attendance
  const markAttendance = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Attendance:", attendance);
    alert("Attendance submitted successfully!");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);


   const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div className="container mt-4">

     <div className={darkMode ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100"}>
      {/* Navbar */}
      <nav className={darkMode ? "navbar navbar-dark bg-secondary" : "navbar navbar-light bg-light border"}>
        <div className="container-fluid">
          <span className="navbar-brand">Sandip Attendance ERP - Student Portal</span>
          <button className="btn btn-outline-info" onClick={toggleDarkMode}>
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>
<br/>
      <h1 className="fw-bold mb-3">Faculty Attendance Dashboard</h1>
  <div className={darkMode ? "card-body bg-secondary text-white" : "card-body"}>
      <table className="table table-bordered table-striped" >
        <thead className="table-dark">
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student.id}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>
                <div className="btn-group">
                  <button
                    className={`btn btn-sm ${
                      attendance[student.id] === "Present"
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => markAttendance(student.id, "Present")}
                  >
                    Present
                  </button>
                  <button
                    className={`btn btn-sm ${
                      attendance[student.id] === "Absent"
                        ? "btn-danger"
                        : "btn-outline-danger"
                    }`}
                    onClick={() => markAttendance(student.id, "Absent")}
                  >
                    Absent
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
        disabled={Object.keys(attendance).length !== studentsData.length}
      >
        Submit Attendance
      </button>
    </div>   </div></div>
  );
};

export default AttendanceDashboard;
