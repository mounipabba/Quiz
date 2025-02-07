import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Keyframe for a smooth fade-in effect
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Main container with a gradient background and fade-in animation
const Container = styled.div`
  margin-top: 3rem;
  padding: 2rem 1rem;
  animation: ${fadeIn} 1s ease-in-out;
  background: linear-gradient(135deg, #f0f4ff 0%, #d9e4ff 100%);
  min-height: calc(100vh - 3rem);
`;

// Flex row to structure the layout.
const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

// Left column for semester list
const LeftColumn = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  margin-right: 1rem;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

// Right column for subject details
const RightColumn = styled.div`
  flex: 0 0 75%;
  max-width: 75%;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

// Styled container for the list group with a light shadow and rounded edges
const ListGroup = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Styled button for each semester using a transient prop ($active)
const ListGroupButton = styled.button`
  width: 100%;
  background: ${({ $active }) => ($active ? "#007bff" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  border: none;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${({ $active }) => ($active ? "#007bff" : "#e6f0ff")};
    transform: translateX(5px);
  }
`;

// Card component with a modern shadow and smooth hover lift
const Card = styled.div`
  background: #ffffff;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

// Card body to add spacing inside cards
const CardBody = styled.div`
  padding: 1.5rem;
`;

// Title styled component using a transient prop for centering ($center)
const Title = styled.h3`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
  text-align: ${({ $center }) => ($center ? "center" : "left")};
`;

// Styled button for subject items with flex layout and hover effects
const ListGroupItem = styled.button`
  width: 100%;
  background: #f8f9fa;
  border: none;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 8px;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #e2e6ea;
    transform: translateX(5px);
  }
`;

// Styled badge for the "Start" label with a rounded pill style
const Badge = styled.span`
  font-size: 0.9rem;
  padding: 0.5em 0.75em;
  background-color: #007bff;
  border-radius: 50px;
  color: #fff;
  transition: background-color 0.3s ease;

  ${ListGroupItem}:hover & {
    background-color: #0056b3;
  }
`;

const semestersData = {
  "Semester-1": [
    "Linear Algebra",
    "Engineering Chemistry",
    "English",
    "Problem Solving Using C Programming",
  ],
  "Semester-2": [
    "Differential Equations and Numerical Methods",
    "Engineering Physics",
    "Object Oriented Programming With Python",
    "IT Essentials",
    "Basic Electrical and Electronics Engineering",
  ],
  "Semester-3": [
    "Discrete Mathematics",
    "Data Structures",
    "Database Management Systems",
    "Digital Logic Design",
    "Computer Organization And Architecture",
  ],
  "Semester-4": [
    "Probability and Statistics",
    "Operating Systems",
    "Java Programming",
    "Design and Analysis of Algorithms",
    "Managerial Economics and Financial Analysis",
    "IoT Lab Using Python",
  ],
  "Semester-5": [
    "Computer Networks",
    "Data Science",
    "Software Engineering",
    "Theory of Computation",
  ],
  "Semester-6": [
    "Compiler Design",
    "Object Oriented Analysis and Design",
    "Machine Learning",
    "Mobile Application Development",
    "Web Design and Development",
  ],
  "Semester-7": [
    "Advanced Python Programming",
    "Cryptography and Network Security",
    "Distributed Systems",
    "Wireless Sensor Networks",
  ],
  "Semester-8": ["Project"],
};

const Home = ({ user }) => {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  const handleSubjectClick = (subject) => {
    navigate("/subject-details", { state: { subject } });
  };

  return (
    <Container>
      <Row>
        <LeftColumn>
          <ListGroup>
            {Object.keys(semestersData).map((semester) => (
              <ListGroupButton
                key={semester}
                $active={selectedSemester === semester}
                onClick={() => handleSemesterClick(semester)}
              >
                {semester}
              </ListGroupButton>
            ))}
          </ListGroup>
        </LeftColumn>
        <RightColumn>
          {selectedSemester ? (
            <Card>
              <CardBody>
                <Title>{selectedSemester}</Title>
                <div>
                  {semestersData[selectedSemester].map((subject, index) => (
                    <ListGroupItem
                      key={index}
                      onClick={() => handleSubjectClick(subject)}
                    >
                      {subject}
                      <Badge>Start</Badge>
                    </ListGroupItem>
                  ))}
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <Title $center>Please select a semester</Title>
              </CardBody>
            </Card>
          )}
        </RightColumn>
      </Row>
    </Container>
  );
};

export default Home;
