/*const semestersData = {
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
};*/

import React from "react";
import AdminUpload from "./AdminUpload";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminUpload subject="Linear Algebra" />
      <AdminUpload subject="Engineering Chemistry" />
      <AdminUpload subject="English" />
      <AdminUpload subject="Problem Solving Using C Programming" />
      {/* Add more subjects as needed */}
    </div>
  );
};

export default AdminDashboard;
