import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminUploadSyllabus.css";

const AdminUploadSyllabus = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      console.log("Uploading file:", file);
      const response = await axios.post(
        "http://localhost:5000/api/admin/upload-syllabus",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
          withCredentials: true,
        }
      );
  
      setUploadMessage("File uploaded successfully!");
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
      const serverMessage = error.response?.data?.message;
      setUploadMessage(serverMessage || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title text-center mb-0">Upload Syllabus</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="fileInput" className="form-label">
                  Choose a file
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
              {uploadMessage && (
                <div
                  className={`alert ${
                    uploadMessage.includes("successfully")
                      ? "alert-success"
                      : "alert-danger"
                  } mt-4 animate__animated animate__fadeIn`}
                >
                  {uploadMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadSyllabus;
