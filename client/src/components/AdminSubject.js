import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminSubject.css"; // Custom CSS for additional styling and animations

const AdminSubject = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const handleUploadClick = () => navigate(`/admin/subject/${subject}/upload`);
  const handleViewResultsClick = () => navigate(`/admin/subject/${subject}/results`);
  const handleUploadSyllabusClick = () => navigate(`/admin/subject/${subject}/upload-syllabus`);
  const handleUploadMaterialClick = () => navigate(`/admin/subject/${subject}/upload-material`);
  const handleUploadMidPapersClick = () => navigate(`/admin/subject/${subject}/upload-midpapers`);
  const handleUploadPreviousPapersClick = () => navigate(`/admin/subject/${subject}/upload-previouspapers`);

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title text-center mb-0">{subject}</h2>
            </div>
            <div className="card-body text-center">
              <button className="btn btn-primary btn-lg mb-3 animate__animated animate__pulse animate__infinite" onClick={handleUploadClick}>
                Upload Questions
              </button>
              <button className="btn btn-secondary btn-lg mb-3 animate__animated animate__pulse animate__infinite" onClick={handleViewResultsClick}>
                View Results
              </button>
              <button className="btn btn-primary btn-lg mb-3 animate__animated animate__pulse animate__infinite" onClick={handleUploadSyllabusClick}>
                Upload Syllabus
              </button>
              <button className="btn btn-primary btn-lg mb-3 animate__animated animate__pulse animate__infinite" onClick={handleUploadMaterialClick}>
                Upload Material
              </button>
              <button className="btn btn-primary btn-lg mb-3 animate__animated animate__pulse animate__infinite" onClick={handleUploadMidPapersClick}>
                Upload Mid Papers
              </button>
              <button className="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite" onClick={handleUploadPreviousPapersClick}>
                Upload Previous Papers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubject;
