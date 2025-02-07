import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main container
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: #fff;
  animation: ${fadeIn} 1s ease-in-out;
`;

// Card styling
const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 90%;
  max-width: 800px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

// Card Header
const CardHeader = styled.div`
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  color: #fff;
  padding: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

// Card Body
const CardBody = styled.div`
  padding: 1.5rem;
`;

// Card Footer
const CardFooter = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
`;

// List Group
const ListGroup = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

// List Item
const ListItem = styled.li`
  background: ${(props) =>
    props.correct ? "#d4edda" : props.wrong ? "#f8d7da" : "#f8f9fa"};
  color: ${(props) =>
    props.correct ? "#155724" : props.wrong ? "#721c24" : "#333"};
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
`;

// Badge
const Badge = styled.span`
  background: ${(props) => (props.correct ? "#28a745" : "#dc3545")};
  color: white;
  padding: 0.4em 0.6em;
  font-size: 0.85rem;
  border-radius: 5px;
  font-weight: bold;
`;

// Styled Button
const StyledButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #ff758c, #ff7eb3);
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #ff4b8b, #ff6a9f);
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Loading Spinner
const LoadingContainer = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff758c;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/quiz/details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        setLoading(false);
        navigate("/history"); // Redirect to history page on error
      }
    };

    fetchQuizDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <p>Loading quiz details...</p>
      </LoadingContainer>
    );
  }

  if (!quiz) {
    return (
      <Container>
        <Card>
          <CardBody style={{ textAlign: "center" }}>
            <h2>Quiz not found.</h2>
            <StyledButton to="/history">Back to History</StyledButton>
          </CardBody>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <CardHeader>Quiz Details for {quiz.subject}</CardHeader>
        <CardBody>
          <p>
            <strong>Date:</strong> {new Date(quiz.date).toLocaleString()}
          </p>
          <p>
            <strong>Score:</strong>{" "}
            {quiz.results.filter((r) => r.isCorrect).length} /{" "}
            {quiz.results.length}
          </p>
          <hr />
          {quiz.results.map((result, index) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <h5>
                <strong>Q{index + 1}: </strong>
                {result.questionId.question}
              </h5>
              <ListGroup>
                {result.questionId.options.map((option, idx) => {
                  const isCorrect = option === result.correctAnswer;
                  const isUserAnswer = option === result.userAnswer;
                  return (
                    <ListItem key={idx} correct={isCorrect} wrong={isUserAnswer && !isCorrect}>
                      {option}
                      {isCorrect && <Badge correct>Correct</Badge>}
                      {isUserAnswer && !isCorrect && <Badge>Wrong</Badge>}
                    </ListItem>
                  );
                })}
              </ListGroup>
            </div>
          ))}
        </CardBody>
        <CardFooter>
          <StyledButton to="/history">Back to History</StyledButton>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default QuizDetail;
