import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Custom CSS for additional styling and animations

const semestersData = {
  "Semester-1": [
    "Linear Algebra",
    "Engineering Chemistry",
    "English",
    "Problem Solving Using C Programming",
  ],
  "Semester-2": [
    "Differential Equations and Numerical Methods",
    "Engineering Physics",
    "Object Oriented Programming With Python",
    "IT Essentials",
    "Basic Electrical and Electronics Engineering",
  ],
  "Semester-3": [
    "Discrete Mathematics",
    "Data Structures",
    "Database Management Systems",
    "Digital Logic Design",
    "Computer Organization And Architecture",
  ],
  "Semester-4": [
    "Probability and Statistics",
    "Operating Systems",
    "Java Programming",
    "Design and Analysis of Algorithms",
    "Managerial Economics and Financial Analysis",
    "IoT Lab Using Python",
  ],
  "Semester-5": [
    "Computer Networks",
    "Data Science",
    "Software Engineering",
    "Theory of Computation",
  ],
  "Semester-6": [
    "Compiler Design",
    "Object Oriented Analysis and Design",
    "Machine Learning",
    "Mobile Application Development",
    "Web Design and Development",
  ],
  "Semester-7": [
    "Advanced Python Programming",
    "Cryptography and Network Security",
    "Distributed Systems",
    "Wireless Sensor Networks",
  ],
  "Semester-8": ["Project"],
};

const AdminPage = () => {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  const handleSubjectClick = (subject) => {
    navigate(`/admin/subject/${subject}`);
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="list-group shadow">
            {Object.keys(semestersData).map((semester) => (
              <button
                key={semester}
                className={`list-group-item list-group-item-action ${
                  selectedSemester === semester ? "active" : ""
                }`}
                onClick={() => handleSemesterClick(semester)}
              >
                {semester}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          {selectedSemester ? (
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h3 className="card-title mb-0">{selectedSemester}</h3>
              </div>
              <div className="card-body">
                <div className="list-group">
                  {semestersData[selectedSemester].map((subject, index) => (
                    <button
                      key={index}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      onClick={() => handleSubjectClick(subject)}
                    >
                      {subject}
                      <span className="badge bg-primary rounded-pill">
                        View
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center text-muted">
                  Please select a semester
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;