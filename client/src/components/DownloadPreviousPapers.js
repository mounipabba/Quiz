import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

// Fade-in animation
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
  align-items: center;
  min-height: 80vh;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    width: 95%;
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
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
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

/*const Alert = styled.div`
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
`;*/

const DownloadPreviousPapers = () => {
  const { subject } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [filename, setFilename] = useState(null);

  useEffect(() => {
    const fetchPreviousPapers = async () => {
      try {
        // Note: Adjust the URL according to your router mount point.
        const response = await axios.get(
          `http://localhost:5000/api/user/previouspapers/${encodeURIComponent(subject)}`
        );
        if (response.data && response.data.fileId && response.data.filename) {
          // Adjust the streaming URL if necessary.
          setPdfUrl(`http://localhost:5000/api/user/previouspapers-file/${response.data.fileId}`);
          setFilename(response.data.filename);
        } else {
          setError("Previous papers not found for this subject.");
        }
      } catch (err) {
        console.error("Error fetching previous papers:", err);
        setError("Error fetching previous papers. Please try again later.");
      }
    };

    fetchPreviousPapers();
  }, [subject]);

  if (error) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">{subject} Previous Papers</h2>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">{subject} Previous Papers</h2>
        <p>Loading previous papers...</p>
      </div>
    );
  }

  return (
    <Container>
      <Card>
        <CardHeader>{subject} Previous Papers</CardHeader>
        <IframeContainer>
          <Iframe title="Previous Papers PDF" src={pdfUrl} />
        </IframeContainer>
        <DownloadButton href={pdfUrl} download={filename || `${subject}-previouspapers.pdf`}>
          Download Previous Papers
        </DownloadButton>
      </Card>
    </Container>
  );
};

export default DownloadPreviousPapers;
