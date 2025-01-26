import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

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
    <div className="container mt-5">
      <h3>{subject} Quiz Results</h3>
      <table className="table table-striped">
        <thead>
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
              <tr key={index}>
                <td>{result.user.rollNo}</td>
                <td>{result.user.name}</td>
                <td>{correctAnswers}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn btn-primary mt-3" onClick={handleDownload}>
        Download Excel
      </button>
    </div>
  );
};

export default AdminSubjectResults;
