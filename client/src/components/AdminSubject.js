import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Layout components
const Container = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Column = styled.div`
  width: 100%;
  max-width: 600px;
`;

// Card styling
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

// Card Header with a gradient background
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
  text-align: center;
`;

// Styled button using transient prop $variant for different styles
const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${pulse} 1.5s infinite ease-in-out;
  background-color: ${({ $variant }) =>
    $variant === "secondary" ? "#6c757d" : "#007bff"};
  color: #fff;

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ $variant }) =>
      $variant === "secondary" ? "#5a6268" : "#0056b3"};
  }
`;

// AdminSubject component
const AdminSubject = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  // Navigation handlers
  const handleUploadClick = () => navigate(`/admin/subject/${subject}/upload`);
  const handleViewResultsClick = () => navigate(`/admin/subject/${subject}/results`);
  const handleUploadSyllabusClick = () =>
    navigate(`/admin/subject/${subject}/upload-syllabus`);
  const handleUploadMaterialClick = () =>
    navigate(`/admin/subject/${subject}/upload-material`);
  const handleUploadMidPapersClick = () =>
    navigate(`/admin/subject/${subject}/upload-midpapers`);
  const handleUploadPreviousPapersClick = () =>
    navigate(`/admin/subject/${subject}/upload-previouspapers`);

  return (
    <Container>
      <Row>
        <Column>
          <Card>
            <CardHeader>{subject}</CardHeader>
            <CardBody>
              <StyledButton $variant="primary" onClick={handleUploadClick}>
                Upload Questions
              </StyledButton>
              <StyledButton $variant="secondary" onClick={handleViewResultsClick}>
                View Results
              </StyledButton>
              <StyledButton $variant="primary" onClick={handleUploadSyllabusClick}>
                Upload Syllabus
              </StyledButton>
              <StyledButton $variant="primary" onClick={handleUploadMaterialClick}>
                Upload Material
              </StyledButton>
              <StyledButton $variant="primary" onClick={handleUploadMidPapersClick}>
                Upload Mid Papers
              </StyledButton>
              <StyledButton $variant="primary" onClick={handleUploadPreviousPapersClick}>
                Upload Previous Papers
              </StyledButton>
            </CardBody>
          </Card>
        </Column>
      </Row>
    </Container>
  );
};

export default AdminSubject;
