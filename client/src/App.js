// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import QuizInstructions from "./components/QuizInstructions";
import SubjectDetails from "./components/SubjectDetails";
import QuizSummary from "./components/QuizSummary";
import History from "./components/History";
import QuizDetail from "./components/QuizDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./components/AdminPage";
import AdminSubject from "./components/AdminSubject";
import AdminUpload from "./components/AdminUpload";
import AdminUploadSyllabus from "./components/AdminUploadSyllabus";
import AdminSubjectResults from "./components/AdminSubjectResults";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Custom CSS for additional styling and animations

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/auth/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-5 animate__animated animate__fadeIn">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? "/home" : "/login"} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:subject"
            element={
              <ProtectedRoute user={user}>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route path="/subject-details" element={<SubjectDetails />} />

          <Route
            path="/instructions"
            element={
              <ProtectedRoute user={user}>
                <QuizInstructions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute user={user}>
                <QuizSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute user={user}>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history/:id"
            element={
              <ProtectedRoute user={user}>
                <QuizDetail />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/subject/:subject" element={<AdminSubject />} />
          <Route
            path="/admin/subject/:subject/upload"
            element={<AdminUpload />}
          />
          <Route path="/admin/subject/:subject/upload-syllabus" element={<AdminUploadSyllabus />} />
          <Route
            path="/admin/subject/:subject/results"
            element={<AdminSubjectResults />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;