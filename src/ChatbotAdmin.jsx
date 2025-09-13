import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

const API = "http://localhost/erp"; // Replace with your PHP backend path

const ChatbotAdmin = ({ onLogout }) => {
  const [qaList, setQaList] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // ✅ New states for search & pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 5 rows per page

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/get_chatbot.php`);
      const data = await res.json();
      setQaList(data);
    } catch (err) {
      console.error("Error fetching Q&A:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addQA = async () => {
    if (!question || !answer) return;
    try {
      await fetch(`${API}/add_chatbot.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      setQuestion("");
      setAnswer("");
      fetchData();
    } catch (err) {
      console.error("Error adding Q&A:", err);
    }
  };

  const deleteQA = async (id) => {
    if (!window.confirm("Delete this Q&A?")) return;
    try {
      await fetch(`${API}/delete_chatbot.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting Q&A:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    onLogout();
  };

  // ✅ Filtering
  const filteredData = qaList.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="d-flex flex-column vh-100 vw-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Sandip Foundation Chatbot
          </a>
          <button className="btn btn-outline-light ms-auto" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="bg-light border-end" style={{ width: "200px" }}>
          <ul className="nav flex-column p-3">
            <li className="nav-item mb-2">
              <span className="nav-link active fw-bold">Dashboard</span>
            </li>
         
          </ul>
        </div>

        {/* Main Content */}
        <div className="container-fluid p-4">
          {/* Add Q&A Card */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-primary">Add New Q&A</h3>
              <hr />
              <div className="mb-3 pt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <button className="btn btn-primary" onClick={addQA}>
                Add Q&A
              </button>
            </div>
          </div>

          {/* Q&A Table */}
          <div className="card shadow-sm mb-5">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title m-0">Q&A List</h5>
                {/* ✅ Search Box */}
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th width="3%">ID</th>
                      <th>Question</th>
                      <th>Answer</th>
                      <th width="5%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((q) => (
                      <tr key={q.id}>
                        <td>{q.id}</td>
                        <td>{q.question}</td>
                        <td>{q.answer}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteQA(q.id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {currentData.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          No Q&A found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ✅ Pagination Controls */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages || totalPages === 0 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center text-muted py-3">
        &copy; 2025 Sandip Foundation. All rights reserved.
      </footer>
    </div>
  );
};

export default ChatbotAdmin;
