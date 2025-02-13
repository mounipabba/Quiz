import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container mimicking Bootstrap's container with responsive padding
const Container = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  animation: ${fadeIn} 1s ease-in-out;
`;

// Row to center the content
const Row = styled.div`
  display: flex;
  justify-content: center;
`;

// Column with responsive max-width
const Column = styled.div`
  width: 100%;
  max-width: 600px;
`;

// Card component with smooth hover effects
const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

// Card Header with gradient background
const CardHeader = styled.div`
  background: linear-gradient(135deg, #007bff, #0056b3);
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.75rem;
  font-weight: bold;
`;

// Card Body with centered content
const CardBody = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

// Styled Button using a transient prop for variant styling
const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  background-color: ${({ $variant }) =>
    $variant === "primary"
      ? "#007bff"
      : $variant === "secondary"
      ? "#6c757d"
      : $variant === "success"
      ? "#28a745"
      : "#007bff"};
  color: #fff;

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ $variant }) =>
      $variant === "primary"
        ? "#0056b3"
        : $variant === "secondary"
        ? "#5a6268"
        : $variant === "success"
        ? "#218838"
        : "#0056b3"};
  }
`;

// Main component
const SubjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.state?.subject || "Subject";

  const handleButtonClick = (type) => {
    if (type === "syllabus") {
      // Navigate to the DownloadSyllabus page with the subject
      navigate(`/download-syllabus/${encodeURIComponent(subject)}`);
    } else if (type === "materials") {
      // Navigate to the DownloadMaterial page with the subject
      navigate(`/download-material/${encodeURIComponent(subject)}`);
    }else if (type === "midpapers") {
      // Navigate to the DownloadMaterial page with the subject
      navigate(`/download-midpaper/${encodeURIComponent(subject)}`);
    }else if (type === "previouspapers") {
      // Navigate to the DownloadMaterial page with the subject
      navigate(`/download-previouspaper/${encodeURIComponent(subject)}`);
    } else {
      // Navigate using the subject and type in a URL-friendly way
      navigate(`/subject/${subject.toLowerCase().replace(/\s+/g, "-")}/${type}`);
    }
  };

  const handleTakeQuizClick = () => {
    navigate("/instructions", { state: { subject } });
  };

  return (
    <Container>
      <Row>
        <Column>
          <Card>
            <CardHeader>{subject}</CardHeader>
            <CardBody>
              <StyledButton $variant="primary" onClick={() => handleButtonClick("syllabus")}>
                View Syllabus
              </StyledButton>
              <StyledButton $variant="secondary" onClick={() => handleButtonClick("materials")}>
                View Materials
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => handleButtonClick("midpapers")}>
                View Mid Papers
              </StyledButton>
              <StyledButton $variant="secondary" onClick={() => handleButtonClick("previouspapers")}>
                View Previous Papers
              </StyledButton>
              <StyledButton $variant="success" onClick={handleTakeQuizClick}>
                Take Quiz
              </StyledButton>
            </CardBody>
          </Card>
        </Column>
      </Row>
    </Container>
  );
};

export default SubjectDetails;
