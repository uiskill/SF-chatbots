//Management wants a dashboard for student performance that shows graphs and reports

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { useTranslation } from "react-i18next";

const StudentAtttendance = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  // Fetch student performance from API
  useEffect(() => {
    fetch("http://localhost/erp/performance.php")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  // Example summary
const avgAttendance = (
  data.reduce((sum, s) => sum + s.attendance, 0) / (data.length || 1)
).toFixed(1);
  const avgMarks = Math.round(data.reduce((sum, s) => sum + s.marks, 0) / (data.length || 1));

  // Pie chart data for pass/fail
  const passFailData = [
    { name: "Pass", value: data.filter((s) => s.marks >= 40).length },
    { name: "Fail", value: data.filter((s) => s.marks < 40).length },
  ];
  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="container  p-4 card mt-4">

  {/* Language Switch */}
      <div className="mb-3">
        <button onClick={() => i18n.changeLanguage("en")} className="btn btn-sm btn-primary me-2">English</button>
        <button onClick={() => i18n.changeLanguage("hi")} className="btn btn-sm btn-success me-2">हिंदी</button>
        <button onClick={() => i18n.changeLanguage("mr")} className="btn btn-sm btn-warning">मराठी</button>
      </div>








      <h2 className="mb-4">📊 {t("welcome")}</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 bg-info text-white">
            <h4>{t("total_stud")}</h4>
            <p>{data.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 bg-success text-white">
            <h4>{t("avg_attandance")}</h4>
            <p>{avgAttendance}%</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 bg-info text-white">
               <h4>{t("student_marks")}</h4>
            <p>{avgMarks}%</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-4">
        <div className="card p-4">
           <h4>{t("pass-fail")}</h4>
          <PieChart width={300} height={300}>
            <Pie data={passFailData} dataKey="value" outerRadius={100} label>
              {passFailData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          </div>
        </div>

        <div className="col-md-4">
         <div className="card p-4">
         <h4>{t("student_by_marks")}</h4>
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="marks" fill="purple" />
          </BarChart>
        </div></div>
    
        <div className="col-md-4">
                 <div className="card p-4">
         <h4>{t("Attendance Trend")}</h4>
          <LineChart width={450} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#28a745" />
          </LineChart></div>
        </div>
      </div>
    </div>
  );
};

export default StudentAtttendance;
