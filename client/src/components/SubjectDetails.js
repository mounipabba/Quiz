import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SubjectDetails.css";

const SubjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.state?.subject || "Subject";

  const handleButtonClick = (type) => {
    navigate(`/subject/${subject.toLowerCase().replace(/\s+/g, "-")}/${type}`);
  };

  const handleTakeQuizClick = () => {
    navigate("/instructions", { state: { subject } });
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title text-center mb-0">{subject}</h2>
            </div>
            <div className="card-body text-center">
              <button
                className="btn btn-primary btn-lg mb-3 animate__animated animate__pulse animate__infinite"
                onClick={() => handleButtonClick("syllabus")}
              >
                View Syllabus
              </button>
              <button
                className="btn btn-secondary btn-lg mb-3 animate__animated animate__pulse animate__infinite"
                onClick={() => handleButtonClick("materials")}
              >
                View Materials
              </button>
              <button
                className="btn btn-primary btn-lg mb-3 animate__animated animate__pulse animate__infinite"
                onClick={() => handleButtonClick("midpapers")}
              >
                View Mid Papers
              </button>
              <button
                className="btn btn-secondary btn-lg mb-3 animate__animated animate__pulse animate__infinite"
                onClick={() => handleButtonClick("previouspapers")}
              >
                View Previous Papers
              </button>
              <button
                className="btn btn-success btn-lg animate__animated animate__pulse animate__infinite"
                onClick={handleTakeQuizClick}
              >
                Take Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
