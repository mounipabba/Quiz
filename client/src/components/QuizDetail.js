// src/components/QuizDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/quiz/details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        setLoading(false);
        navigate("/history"); // Redirect to history page on error
      }
    };

    fetchQuizDetails();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading quiz details...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Quiz Details for {quiz.subject}</h2>
      <p>
        <strong>Date:</strong> {new Date(quiz.date).toLocaleString()}
      </p>
      <p>
        <strong>Score:</strong> {quiz.results.filter((r) => r.isCorrect).length}{" "}
        / {quiz.results.length}
      </p>
      <hr />
      {quiz.results.map((result, index) => (
        <div key={index} className="mb-4">
          <h5>
            Question {index + 1}: {result.questionId.question}
          </h5>
          <ul className="list-group">
            {result.questionId.options.map((option, idx) => {
              const isCorrect = option === result.correctAnswer;
              const isUserAnswer = option === result.userAnswer;
              return (
                <li
                  key={idx}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    isCorrect
                      ? "list-group-item-success"
                      : isUserAnswer
                      ? "list-group-item-danger"
                      : ""
                  }`}
                >
                  {option}
                  {isCorrect && (
                    <span className="badge bg-success">Correct</span>
                  )}
                  {isUserAnswer && !isCorrect && (
                    <span className="badge bg-danger">Your Answer</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Link to="/history" className="btn btn-primary">
        Back to History
      </Link>
    </div>
  );
};

export default QuizDetail;
