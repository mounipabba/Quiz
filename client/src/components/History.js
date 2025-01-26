// src/components/History.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="container mt-5">
      <h2>Your Quiz History</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes taken yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td>{quiz.subject}</td>
                <td>
                  {quiz.results.filter((result) => result.isCorrect).length} /{" "}
                  {quiz.results.length}
                </td>
                <td>{new Date(quiz.date).toLocaleString()}</td>
                <td>
                  <Link to={`/history/${quiz._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
