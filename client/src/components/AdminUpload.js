import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminUpload.css"; // Custom CSS for additional styling and animations

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const processCSV = (data) => {
    const questions = [];
    let subject = null;

    data.forEach((row, index) => {
      if (index === 0) return; // Skip header row
      const [
        rowSubject,
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
      ] = row;

      if (!subject) subject = rowSubject;

      questions.push({
        questionText,
        options: [optionA, optionB, optionC, optionD],
        answer,
      });
    });

    console.log("Parsed Questions:", questions);
    return { subject, questions };
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a CSV file.");
      return;
    }

    Papa.parse(file, {
      complete: async function (results) {
        const parsedData = processCSV(results.data);
        if (!parsedData || parsedData.questions.length === 0) {
          setUploadMessage(
            "Failed to extract questions or subject. Please check the CSV format."
          );
          return;
        }

        const { subject, questions } = parsedData;

        try {
          const response = await axios.post("/api/admin/upload-questions", {
            subject,
            questions,
          });
          setUploadMessage("Questions uploaded successfully!");
          console.log(response.data);
        } catch (error) {
          setUploadMessage("Failed to upload questions.");
          console.error("Error uploading questions:", error);
        }
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title text-center mb-0">Upload Questions</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="fileInput" className="form-label">
                  Choose a CSV file
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".csv"
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

export default AdminUpload;