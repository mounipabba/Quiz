import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  max-width: 600px;
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
  text-align: left;
`;

const QuestionText = styled.h5`
  margin-bottom: 1rem;
  font-weight: bold;
  color: #333;
`;

const TimerText = styled.h5`
  color: #ff4757;
  font-weight: bold;
`;

const ListGroup = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  background: ${({ selected }) => (selected ? "#007bff" : "#f8f9fa")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ selected }) => (selected ? "#0056b3" : "#e9ecef")};
  }
`;

const Button = styled.button`
  background: ${({ variant }) =>
    variant === "success"
      ? "#28a745"
      : variant === "primary"
      ? "#007bff"
      : "#6c757d"};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 48%;
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const Quiz = () => {
  const { subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const navigate = useNavigate();

  const shuffleOptions = (options) => options.sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (!subject) {
      navigate("/");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/quiz/questions/${subject}`);
        const shuffledQuestions = response.data.map((q) => ({
          ...q,
          options: shuffleOptions(q.options),
        }));
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [subject, navigate]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const results = questions.map((q, index) => {
        const userAnswer = selectedOptions[index] || null;
        return {
          questionId: q._id,
          userAnswer,
          correctAnswer: q.answer,
          isCorrect: userAnswer === q.answer,
        };
      });

      const correctCount = results.filter((r) => r.isCorrect).length;
      const wrongCount = results.length - correctCount;
      const totalMarks = correctCount;

      await axios.post(
        "/api/quiz/submit",
        { subject, results },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/summary", {
        state: { subject, correctCount, wrongCount,totalMarks },
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  }, [questions, selectedOptions, navigate, subject]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitQuiz();
    } else {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, handleSubmitQuiz]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`;
  };

  return (
    <Container>
      {questions.length > 0 ? (
        <Card>
          <CardHeader>{subject} Quiz</CardHeader>
          <CardBody>
            <QuestionText>
              Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
            </QuestionText>
            <TimerText>Time Left: {formatTime(timeLeft)}</TimerText>
            <ListGroup>
              {questions[currentQuestionIndex].options.map((option, idx) => (
                <ListItem
                  key={idx}
                  selected={selectedOptions[currentQuestionIndex] === option}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </ListItem>
              ))}
            </ListGroup>
            <ButtonContainer>
              <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous
              </Button>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button variant="primary" onClick={handleNextQuestion} disabled={!selectedOptions[currentQuestionIndex]}>
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={handleSubmitQuiz} disabled={!selectedOptions[currentQuestionIndex]}>
                  Submit Quiz
                </Button>
              )}
            </ButtonContainer>
          </CardBody>
        </Card>
      ) : (
        <h3>Loading questions...</h3>
      )}
    </Container>
  );
};

export default Quiz;
