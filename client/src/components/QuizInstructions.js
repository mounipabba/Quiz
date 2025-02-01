import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QuizInstructions.css"; // Custom CSS for additional styling and animations

const QuizInstructions = () => {
  const location = useLocation();
  const { subject } = location.state; // Get the subject from the state
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${encodeURIComponent(subject)}`);
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title text-center mb-0">
                {subject} Quiz Instructions
              </h2>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Number of questions:</strong> 20
                </li>
                <li className="list-group-item">
                  <strong>Time allowed:</strong> 30 minutes
                </li>
                <li className="list-group-item">
                  <strong>Each question carries:</strong> 1 mark
                </li>
                <li className="list-group-item">
                  <strong>Negative marking:</strong> No
                </li>
              </ul>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-success btn-lg animate__animated animate__pulse animate__infinite"
                onClick={handleStartQuiz}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;