import useSWR from "swr";
import React, { useState } from "react";


const fetcher = (url) => fetch(url).then((res) => res.json());

const PlacementTable2 = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const { data, error, isLoading } = useSWR(
    `/api/placements?page=${page}&limit=${rowsPerPage}`,
    fetcher,
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  if (error) return <div>Error loading data</div>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Placement Data Using SWR</h2>
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
                Loading...
              </td>
            </tr>
          ) : (
            data?.records.map((student) => (
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
    </div>
  );
};
export default PlacementTable2;
