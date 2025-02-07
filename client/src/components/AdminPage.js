// src/components/AdminPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Fade-in animation keyframes (1s duration)
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/* Container styles with fade-in animation */
const Container = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  display: flex;
  gap: 2rem;
  animation: ${fadeIn} 1s;
  background-color:#ffffff;
  padding:10px;
  border-radius:10px
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* Sidebar styles */
const Sidebar = styled.div`
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

/* SemesterButton styled as a list-group item.
   Uses transient prop $active so it isn’t passed to the DOM. */
const SemesterButton = styled.button`
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  background: ${(props) => (props.$active ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background: ${(props) => (props.$active ? "#0056b3" : "#f8f9fa")};
    transform: ${(props) => (props.$active ? "none" : "translateX(5px)")};
  }
`;

/* Content area styling */
const Content = styled.div`
  flex: 1;
`;

/* Card styled to mimic the animated card hover effect */
const Card = styled.div`
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

/* CardHeader with adjusted border-radius and padding */
const CardHeader = styled.div`
  background: #007bff;
  color: #fff;
  padding: 1rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

/* CardTitle styling */
const CardTitle = styled.h3`
  margin: 0;
`;

/* CardBody with updated padding */
const CardBody = styled.div`
  padding: 1.5rem;
`;

/* SubjectButton styled as a list-group item */
const SubjectButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0.75rem;
  background: #f8f9fa;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
    transform: translateX(5px);
  }
`;

/* Badge styling */
const Badge = styled.span`
  background: #007bff;
  color: #fff;
  padding: 0.5em 0.75em;
  border-radius: 12px;
  font-size: 0.9rem;
`;

/* PlaceholderCard for when no semester is selected */
const PlaceholderCard = styled(Card)`
  padding: 2rem;
  text-align: center;
  color: #666;
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

const AdminPage = () => {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  const handleSubjectClick = (subject) => {
    navigate(`/admin/subject/${subject}`);
  };

  return (
    <Container>
      <Sidebar>
        {Object.keys(semestersData).map((semester) => (
          <SemesterButton
            key={semester}
            $active={selectedSemester === semester}
            onClick={() => handleSemesterClick(semester)}
          >
            {semester}
          </SemesterButton>
        ))}
      </Sidebar>
      <Content>
        {selectedSemester ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedSemester}</CardTitle>
            </CardHeader>
            <CardBody>
              {semestersData[selectedSemester].map((subject, index) => (
                <SubjectButton
                  key={index}
                  onClick={() => handleSubjectClick(subject)}
                >
                  {subject} <Badge>View</Badge>
                </SubjectButton>
              ))}
            </CardBody>
          </Card>
        ) : (
          <PlaceholderCard>
            <h3>Please select a semester</h3>
          </PlaceholderCard>
        )}
      </Content>
    </Container>
  );
};

export default AdminPage;
