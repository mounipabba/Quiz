import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizInstructions = () => {
  const location = useLocation();
  const { subject } = location.state; // Get the subject from the state
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${encodeURIComponent(subject)}`);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>{subject} Quiz Instructions</h2>
        </div>
        <div className="card-body">
          <p>Number of questions: 20</p>
          <p>Time allowed: 30 minutes</p>
          <p>Each question carries 1 mark.</p>
          <p>No negative marking.</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;
