import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QuizSummary.css"; // Custom CSS for additional styling and animations

const QuizSummary = () => {
  const location = useLocation();
  const { subject, correctCount, wrongCount, unansweredCount, totalMarks } =
    location.state;
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title text-center mb-0">
                {subject} Quiz Summary
              </h2>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Total Questions:</strong>{" "}
                  {correctCount + wrongCount + unansweredCount}
                </li>
                <li className="list-group-item">
                  <strong>Correct Answers:</strong> {correctCount}
                </li>
                <li className="list-group-item">
                  <strong>Wrong Answers:</strong> {wrongCount}
                </li>
                <li className="list-group-item">
                  <strong>Unanswered Questions:</strong> {unansweredCount}
                </li>
                <li className="list-group-item">
                  <strong>Total Marks:</strong> {totalMarks}
                </li>
              </ul>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite"
                onClick={handleGoHome}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSummary;