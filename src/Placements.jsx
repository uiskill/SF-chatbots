import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Fake API (simulate backend with delay)
const fetchPlacements = async (page, rowsPerPage) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const placements = Array.from({ length: 15000 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        stream: ["CSE", "IT", "ECE", "Mech", "Civil"][i % 5],
        company: ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture"][i % 5],
        package: `${3 + (i % 5)} LPA`,
      }));

      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      resolve({
        data: placements.slice(start, end),
        total: placements.length,
      });
    }, 800); // simulate API delay
  });
};

const PlacementTable = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["placements", page],
    queryFn: () => fetchPlacements(page, rowsPerPage),
    keepPreviousData: true, // keep old page while fetching new
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  const totalPages = data ? Math.ceil(data.total / rowsPerPage) : 1;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Placement Data</h2>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stream</th>
            <th>Company</th>
            <th>Package</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            data?.data.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.stream}</td>
                <td>{student.company}</td>
                <td>{student.package}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          disabled={page === 1 || isFetching}
          onClick={() => setPage((p) => p - 1)}
          className="btn btn-secondary"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}{" "}
          {isFetching && <span className="text-muted">(loading...)</span>}
        </span>
        <button
          disabled={page === totalPages || isFetching}
          onClick={() => setPage((p) => p + 1)}
          className="btn btn-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PlacementTable;
