import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  //const location = useLocation();
  const { subject } = useParams(); // Get subject from location.state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const navigate = useNavigate();

  // Function to shuffle options
  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (!subject) {
      // Redirect to home if subject is missing
      navigate("/");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/quiz/questions/${subject}`);
        const shuffledQuestions = response.data.map((q) => ({
          ...q,
          options: shuffleOptions(q.options), // Shuffle options here
        }));
        setQuestions(shuffledQuestions);
        console.log("Fetched questions:", shuffledQuestions);
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
        const isCorrect = userAnswer === q.answer;
        return {
          questionId: q._id,
          userAnswer,
          correctAnswer: q.answer,
          isCorrect,
        };
      });

      const correctCount = results.filter((r) => r.isCorrect).length;
      const wrongCount = results.length - correctCount;
      const unansweredCount = results.filter(
        (r) => r.userAnswer === null
      ).length;
      const totalMarks = correctCount; // Assuming 1 mark per correct answer

      await axios.post(
        "/api/quiz/submit",
        { subject, results },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/summary", {
        state: {
          subject,
          correctCount,
          wrongCount,
          unansweredCount,
          totalMarks,
        },
      });
    } catch (error) {
      console.error("Error submitting quiz:", error.response || error.message);
    }
  }, [questions, selectedOptions, navigate, subject]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitQuiz();
    } else {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft, handleSubmitQuiz]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  };

  return (
    <div className="container mt-5">
      {questions.length > 0 ? (
        <div>
          <h2>{subject} Quiz</h2>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              <h5>
                Question {currentQuestionIndex + 1}:{" "}
                {questions[currentQuestionIndex].question}
              </h5>
            </div>
            <div>
              <h5>Time Left: {formatTime(timeLeft)}</h5>
            </div>
          </div>
          <ul className="list-group mt-3">
            {questions[currentQuestionIndex].options.map((option, idx) => (
              <li
                key={idx}
                className={`list-group-item ${
                  selectedOptions[currentQuestionIndex] === option
                    ? "active"
                    : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <div className="mt-3 d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={handleNextQuestion}
                disabled={!selectedOptions[currentQuestionIndex]}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={handleSubmitQuiz}
                disabled={!selectedOptions[currentQuestionIndex]}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>Loading questions...</div>
      )}
    </div>
  );
};

export default Quiz;
