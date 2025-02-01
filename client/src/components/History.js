import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./History.css"; // Custom CSS for additional styling and animations

const History = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/quiz/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="text-center mb-4">Your Quiz History</h2>
      {quizzes.length === 0 ? (
        <div className="alert alert-info text-center">
          No quizzes taken yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow">
            <thead className="thead-dark">
              <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz._id} className="animate__animated animate__fadeIn">
                  <td>{quiz.subject}</td>
                  <td>
                    {quiz.results.filter((result) => result.isCorrect).length} /{" "}
                    {quiz.results.length}
                  </td>
                  <td>{new Date(quiz.date).toLocaleString()}</td>
                  <td>
                    <Link
                      to={`/history/${quiz._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;