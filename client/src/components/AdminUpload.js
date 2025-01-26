import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";

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
    <div className="container mt-5">
      <h2>Upload Questions</h2>
      <div className="form-group">
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>
      {uploadMessage && <p className="mt-3">{uploadMessage}</p>}
    </div>
  );
};

export default AdminUpload;
