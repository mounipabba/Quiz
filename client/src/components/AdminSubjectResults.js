import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminSubjectResults.css"; // Custom CSS for additional styling and animations

const AdminSubjectResults = () => {
  const { subject } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/admin/results/${subject}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [subject]);

  const handleDownload = () => {
    const data = results.map((result, index) => {
      const correctAnswers = result.results.filter((r) => r.isCorrect).length;
      return {
        "Roll No": result.user.rollNo,
        Name: result.user.name,
        Score: correctAnswers,
      };
    });

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${subject} Results`);

    // Generate and download the Excel file
    XLSX.writeFile(workbook, `${subject}_Quiz_Results.xlsx`);
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title text-center mb-0">
            {subject} Quiz Results
          </h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => {
                  const correctAnswers = result.results.filter(
                    (r) => r.isCorrect
                  ).length;
                  return (
                    <tr key={index} className="animate__animated animate__fadeIn">
                      <td>{result.user.rollNo}</td>
                      <td>{result.user.name}</td>
                      <td>{correctAnswers}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite"
              onClick={handleDownload}
            >
              Download Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubjectResults;