import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminSubject = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate(`/admin/subject/${subject}/upload`);
  };

  const handleViewResultsClick = () => {
    navigate(`/admin/subject/${subject}/results`);
  };

  return (
    <div className="container mt-5">
      <h2>{subject}</h2>
      <div className="mt-4">
        <button className="btn btn-primary mr-3" onClick={handleUploadClick}>
          Upload Questions
        </button>
        <button className="btn btn-secondary" onClick={handleViewResultsClick}>
          View Results
        </button>
      </div>
    </div>
  );
};

export default AdminSubject;
