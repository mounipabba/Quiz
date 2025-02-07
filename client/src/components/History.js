import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main container with white background
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #fff;
  color: #333;
  animation: ${fadeIn} 1s ease-in-out;
`;

// Title with subtle shadow
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  color: #222;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

// Glassmorphism card effect for the table
const Card = styled.div`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 900px;
  animation: ${fadeIn} 1s ease-in-out;
`;

// Alert box with soft effect
const Alert = styled.div`
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

// Responsive table container
const TableResponsive = styled.div`
  overflow-x: auto;
`;

// Styled table with a soft effect
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

// Styled table header
const TableHeader = styled.thead`
  background: rgba(0, 0, 0, 0.05);

  th {
    padding: 1rem;
    text-align: left;
    color: #333;
    font-size: 1rem;
    text-transform: uppercase;
  }
`;

// Table rows with hover effects
const TableRow = styled.tr`
  transition: all 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: scale(1.02);
  }
`;

// Table cells
const TableCell = styled.td`
  padding: 1rem;
  font-size: 1rem;
  color: #333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

// Modern gradient button with hover effect
const StyledButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #ff758c, #ff7eb3);
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Mobile-friendly styling
const MobileMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const History = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/quiz/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Container>
      <Title>Your Quiz History</Title>
      {quizzes.length === 0 ? (
        <Alert>No quizzes taken yet.</Alert>
      ) : (
        <Card>
          <TableResponsive>
            <StyledTable>
              <TableHeader>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </TableHeader>
              <tbody>
                {quizzes.map((quiz) => (
                  <TableRow key={quiz._id}>
                    <TableCell>{quiz.subject}</TableCell>
                    <TableCell>
                      {quiz.results.filter((result) => result.isCorrect).length}{" "}
                      / {quiz.results.length}
                    </TableCell>
                    <TableCell>{new Date(quiz.date).toLocaleString()}</TableCell>
                    <TableCell>
                      <StyledButton to={`/history/${quiz._id}`}>
                        View Details
                      </StyledButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          </TableResponsive>
          <MobileMessage>Swipe left/right on small screens.</MobileMessage>
        </Card>
      )}
    </Container>
  );
};

export default History;
