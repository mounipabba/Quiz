import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Home = ({ user }) => {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  const handleSubjectClick = (subject) => {
    // Navigate to the quiz page with the selected subject in the URL
    //navigate(`/quiz/${encodeURIComponent(subject)}`);
    navigate("/instructions", { state: { subject } });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="list-group">
            {Object.keys(semestersData).map((semester) => (
              <button
                key={semester}
                className="list-group-item list-group-item-action"
                onClick={() => handleSemesterClick(semester)}
              >
                {semester}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          {selectedSemester ? (
            <>
              <h3>{selectedSemester}</h3>
              <div className="list-group">
                {semestersData[selectedSemester].map((subject, index) => (
                  <button
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSubjectClick(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <h3>Please select a semester</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
