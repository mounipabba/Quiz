// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import styled, { keyframes, createGlobalStyle } from "styled-components";
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
import AdminLogin from "./components/AdminLogin";
import AdminUploadSyllabus from "./components/AdminUploadSyllabus";
import AdminSubjectResults from "./components/AdminSubjectResults";
import DownloadSyllabus from "./components/DownloadSyllabus";
import "bootstrap/dist/css/bootstrap.min.css";

// Create a GlobalStyle to reset some default margins/paddings if needed
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

// Define keyframes for the fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled component for the main container
const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 20px;
  animation: ${fadeIn} 1s ease-in;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Styled component for the loading screen
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App = () => {
  const [user, setUser] = useState(null);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
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
      <LoadingContainer>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </LoadingContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar user={user} setUser={setUser} />
        <StyledContainer>
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
            <Route
              path="/admin-login"
              element={<AdminLogin setAdminAuthenticated={setAdminAuthenticated} />}
            />
            <Route
              path="/admin"
              element={
                adminAuthenticated ? <AdminPage /> : <Navigate to="/admin-login" />
              }
            />
            <Route path="/admin/subject/:subject" element={<AdminSubject />} />
            <Route
              path="/admin/subject/:subject/upload"
              element={<AdminUpload />}
            />
            <Route
              path="/admin/subject/:subject/upload-syllabus"
              element={<AdminUploadSyllabus />}
            />
            <Route
              path="/admin/subject/:subject/results"
              element={<AdminSubjectResults />}
            />
            <Route
              path="/download-syllabus/:subject"
              element={<DownloadSyllabus />}
            />
          </Routes>
        </StyledContainer>
      </Router>
    </>
  );
};

export default App;
