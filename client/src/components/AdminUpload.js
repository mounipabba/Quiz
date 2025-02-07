import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components

// Main container
const Container = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  animation: ${fadeIn} 1s ease-in-out;
`;

// Card Component
const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 0 auto;
  max-width: 600px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

// Card Header
const CardHeader = styled.div`
  background: linear-gradient(135deg, #007bff, #0056b3);
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.75rem;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
`;

// Card Body
const CardBody = styled.div`
  padding: 1.5rem;
`;

// Form Group for input
const FormGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

// Form Label
const FormLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

// File Input styling
const FileInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

// Button styling
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${pulse} 1.5s infinite ease-in-out;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

// Alert message styling
const Alert = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  animation: ${fadeIn} 1s ease-in-out;
  background-color: ${({ type }) =>
    type === "success" ? "#d4edda" : "#f8d7da"};
  color: ${({ type }) => (type === "success" ? "#155724" : "#721c24")};
`;

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const processCSV = (data) => {
    const questions = [];
    let subject = null;

    // Skip header row and process remaining rows
    data.forEach((row, index) => {
      if (index === 0) return;
      const [rowSubject, questionText, optionA, optionB, optionC, optionD, answer] = row;
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
          setUploadMessage("Failed to extract questions or subject. Please check the CSV format.");
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
    <Container className="animate__animated animate__fadeIn">
      <Card>
        <CardHeader>Upload Questions</CardHeader>
        <CardBody>
          <FormGroup>
            <FormLabel htmlFor="fileInput">Choose a CSV file</FormLabel>
            <FileInput
              type="file"
              id="fileInput"
              accept=".csv"
              onChange={handleFileChange}
            />
          </FormGroup>
          <Button onClick={handleUpload}>Upload</Button>
          {uploadMessage && (
            <Alert type={uploadMessage.includes("successfully") ? "success" : "danger"}>
              {uploadMessage}
            </Alert>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminUpload;
