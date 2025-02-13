// src/components/AdminUploadMidPapers.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
const Container = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  animation: ${fadeIn} 1s ease-in-out;
`;
const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 600px;
  margin: 0 auto;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.2);
  }
`;
const CardHeader = styled.div`
  background: linear-gradient(135deg, #007bff, #0056b3);
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.75rem;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
`;
const CardBody = styled.div`
  padding: 1.5rem;
`;
const FormGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;
const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const FileInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0,123,255,0.5);
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${pulse} 1.5s infinite ease-in-out;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;
const DeleteButton = styled(Button)`
  background-color: #dc3545;
  margin-top: 0.5rem;
  &:hover {
    background-color: #c82333;
  }
`;
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
const IframePreview = styled.iframe`
  width: 100%;
  height: 500px;
  border: none;
  margin-top: 1rem;
  border-radius: 5px;
`;
const Alert1 = styled.div`
  background-color: ${({ type }) =>
    type === "success"
      ? "#d4edda"
      : type === "danger"
      ? "#f8d7da"
      : "#cce5ff"};
  color: ${({ type }) =>
    type === "success"
      ? "#155724"
      : type === "danger"
      ? "#721c24"
      : "#0056b3"};
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  animation: ${fadeIn} 1s ease-in-out;
`;

const AdminUploadMidPapers = () => {
  const { subject } = useParams();
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]); // Array to store uploaded files
  const [midpapersMessage, setMidpapersMessage] = useState("");

  useEffect(() => {
    const fetchMidpapersMetadata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/midpapers-metadata/${subject}`
        );
        if (response.data.length === 0) {
          setMidpapersMessage("No midpapers uploaded yet.");
        } else {
          setUploadedFiles(response.data);
        }
      } catch (error) {
        console.error("Error fetching midpapers metadata:", error);
      }
    };

    fetchMidpapersMetadata();
  }, [subject]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/upload-midpapers",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
          withCredentials: true,
        }
      );

      setUploadMessage("File uploaded successfully!");
      setUploadedFiles([...uploadedFiles, response.data]);
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      const serverMessage = error.response?.data?.message;
      setUploadMessage(serverMessage || "Upload failed. Please try again.");
    }
  };

  const handleDelete = async (filename) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/midpapers/filename/${filename}`
      );

      if (response.status === 200) {
        setUploadMessage("Midpapers deleted successfully!");
        setUploadedFiles(uploadedFiles.filter((f) => f.filename !== filename));
      } else {
        console.error("Unexpected response status:", response.status);
        setUploadMessage("Failed to delete midpapers. Server returned an unexpected status.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete midpapers.";
      setUploadMessage(errorMessage);
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader>Upload Midpapers</CardHeader>
        <CardBody>
          <FormGroup>
            <Label htmlFor="fileInput">Choose a PDF file</Label>
            <FileInput
              type="file"
              id="fileInput"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </FormGroup>
          <Button onClick={handleUpload}>Upload</Button>
          {uploadMessage && (
            <Alert type={uploadMessage.includes("successfully") ? "success" : "danger"}>
              {uploadMessage}
            </Alert>
          )}

          {midpapersMessage && <Alert1 type="info">{midpapersMessage}</Alert1>}

          {uploadedFiles.length > 0 &&
            uploadedFiles.map((fileData) => (
              <div key={fileData.fileId}>
                <IframePreview
                  src={`http://localhost:5000/api/admin/midpapers-file/${fileData.fileId}`}
                  title={fileData.filename}
                />
                <DeleteButton onClick={() => handleDelete(fileData.filename)}>
                  Delete {fileData.filename}
                </DeleteButton>
              </div>
            ))}
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminUploadMidPapers;
