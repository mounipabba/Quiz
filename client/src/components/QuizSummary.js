import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizSummary = () => {
  const location = useLocation();
  const { subject, correctCount, wrongCount, unansweredCount, totalMarks } =
    location.state;
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>{subject} Quiz Summary</h2>
        </div>
        <div className="card-body">
          <p>Total Questions: {correctCount + wrongCount + unansweredCount}</p>
          <p>Correct Answers: {correctCount}</p>
          <p>Wrong Answers: {wrongCount}</p>
          <p>Unanswered Questions: {unansweredCount}</p>
          <p>Total Marks: {totalMarks}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleGoHome}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSummary;
