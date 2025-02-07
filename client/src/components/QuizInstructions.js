import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f9f9f9, #e6e6e6);
  animation: ${fadeIn} 1s ease-in-out;
`;

// Card styling
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

// Card Header
const CardHeader = styled.div`
  background: linear-gradient(135deg, #ff758c, #ff7eb3);
  color: #fff;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

// Card Body
const CardBody = styled.div`
  padding: 1.5rem;
`;

// List Group
const ListGroup = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// List Item
const ListItem = styled.li`
  background: #f8f9fa;
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

// Start Button Animation
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Start Button
const StartButton = styled.button`
  display: inline-block;
  background: linear-gradient(135deg, #28a745, #40c057);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #218838, #34a853);
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Card Footer
const CardFooter = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
`;

const QuizInstructions = () => {
  const location = useLocation();
  const { subject } = location.state;
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${encodeURIComponent(subject)}`);
  };

  return (
    <Container>
      <Card>
        <CardHeader>{subject} Quiz Instructions</CardHeader>
        <CardBody>
          <ListGroup>
            <ListItem>
              <strong>Number of questions:</strong> 20
            </ListItem>
            <ListItem>
              <strong>Time allowed:</strong> 30 minutes
            </ListItem>
            <ListItem>
              <strong>Each question carries:</strong> 1 mark
            </ListItem>
            <ListItem>
              <strong>Negative marking:</strong> No
            </ListItem>
          </ListGroup>
        </CardBody>
        <CardFooter>
          <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default QuizInstructions;
