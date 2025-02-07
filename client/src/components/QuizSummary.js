import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f9f9f9, #e6e6e6);
  animation: ${fadeIn} 1s ease-in-out;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 90%;
  max-width: 500px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const ListGroup = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  background: #f8f9fa;
  color: #333;
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;
  text-align: left;

  &:hover {
    background: #e9ecef;
  }
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const QuizSummary = () => {
  const location = useLocation();
  const { subject, correctCount, wrongCount, totalMarks } = location.state;
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Card>
        <CardHeader>{subject} Quiz Summary</CardHeader>
        <CardBody>
          <ListGroup>
            <ListItem>
              <strong>Total Questions:</strong> {correctCount + wrongCount}
            </ListItem>
            <ListItem>
              <strong>Correct Answers:</strong> {correctCount}
            </ListItem>
            <ListItem>
              <strong>Wrong Answers:</strong> {wrongCount}
            </ListItem>
            <ListItem>
              <strong>Total Marks:</strong> {totalMarks}
            </ListItem>
          </ListGroup>
          <Button onClick={handleGoHome}>Go to Home</Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default QuizSummary;
