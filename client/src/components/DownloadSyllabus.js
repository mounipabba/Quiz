import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css"; // Keep Bootstrap for basic styling if needed

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  animation: ${fadeIn} 1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center; // Center content horizontally
  min-height: 80vh; // Ensure content takes up at least the viewport height
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 800px; // Adjust max-width as needed
  width: 90%; // Make card responsive
  margin: 0 auto; // Center the card
  padding: 2rem;

  @media (max-width: 768px) {
    width: 95%; // Slightly smaller on smaller screens
    padding: 1.5rem;
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

const IframeContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const DownloadButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-decoration: none; // Remove underline from link

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
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
    type === "success" ? "#d4edda" : type === "danger" ? "#f8d7da" : "#cce5ff"};
  color: ${({ type }) =>
    type === "success" ? "#155724" : type === "danger" ? "#721c24" : "#0056b3"};

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;



const DownloadSyllabus = () => {
  const { subject } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [filename, setFilename] = useState(null); // Store the filename
  const message="";

  useEffect(() => {
      const fetchSyllabus = async () => {
          try {
              const response = await axios.get(
                  `http://localhost:5000/api/user/syllabus/${encodeURIComponent(subject)}`
              );

              if (response.data && response.data.fileId && response.data.filename) {
                setPdfUrl(`http://localhost:5000/api/admin/syllabus-file/${response.data.fileId}`);
                setFilename(response.data.filename); // Set the filename
              } else {
                setError("Syllabus not found for this subject.");
              }

          } catch (error) {
              console.error("Error fetching syllabus:", error);
              setError("Error fetching syllabus. Please try again later.");
          }
      };

      fetchSyllabus();
  }, [subject]);

  if (error) {
      return <div className="container mt-5">
        <h2 className="text-center mb-4">{subject} Syllabus</h2>
        <div className="alert alert-danger">{error}</div>
      </div>;
  }

  if (!pdfUrl) {
      return <div className="container mt-5">
      <h2 className="text-center mb-4">{subject} Syllabus</h2>
      <p>Loading syllabus...</p> </div>; // Or a loading spinner
  }

  return (
    <Container>
      <Card>
        <CardHeader>{subject} Syllabus</CardHeader>

        {message && <Alert type={message.startsWith("Error") ? "danger" : "info"}>{message}</Alert>}

        {pdfUrl && (
          <>
            <IframeContainer>
              <Iframe title="Syllabus PDF" src={pdfUrl} />
            </IframeContainer>
            <DownloadButton href={pdfUrl} download={filename || `${subject}-syllabus.pdf`}>
              Download Syllabus
            </DownloadButton>
          </>
        )}
      </Card>
    </Container>
  );
};

export default DownloadSyllabus;