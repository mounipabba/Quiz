import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components

// Main container
const Container = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  animation: ${fadeIn} 1s ease-in-out;
`;

// Card container
const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 0 auto;
  max-width: 800px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.2);
  }
`;

// Card Header
const CardHeader = styled.div`
  background: linear-gradient(135deg, #007bff, #0056b3);
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.75rem;
  font-weight: bold;
`;

// Card Body
const CardBody = styled.div`
  padding: 1.5rem;
`;

// Table container for responsiveness
const TableResponsive = styled.div`
  overflow-x: auto;
`;

// Styled table
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
`;

// Table Header
const TableHeader = styled.thead`
  background-color: #343a40;

  th {
    padding: 0.75rem 1rem;
    text-align: left;
    color: #fff;
    font-size: 1rem;
    text-transform: uppercase;
  }
`;

// Table Body Row
const TableRow = styled.tr`
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

// Table Cell
const TableCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #333;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`;

// Button styling
const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${pulse} 1.5s infinite ease-in-out;
  display: block;
  margin: 1rem auto 0 auto;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AdminSubjectResults = () => {
  const { subject } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/admin/results/${subject}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [subject]);

  const handleDownload = () => {
    const data = results.map((result) => {
      const correctAnswers = result.results.filter((r) => r.isCorrect).length;
      return {
        "Roll No": result.user.rollNo,
        Name: result.user.name,
        Score: correctAnswers,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${subject} Results`);
    XLSX.writeFile(workbook, `${subject}_Quiz_Results.xlsx`);
  };

  return (
    <Container className="animate__animated animate__fadeIn">
      <Card>
        <CardHeader>{subject} Quiz Results</CardHeader>
        <CardBody>
          <TableResponsive>
            <StyledTable>
              <TableHeader>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </TableHeader>
              <tbody>
                {results.map((result, index) => {
                  const correctAnswers = result.results.filter((r) => r.isCorrect).length;
                  return (
                    <TableRow key={index} className="animate__animated animate__fadeIn">
                      <TableCell>{result.user.rollNo}</TableCell>
                      <TableCell>{result.user.name}</TableCell>
                      <TableCell>{correctAnswers}</TableCell>
                    </TableRow>
                  );
                })}
              </tbody>
            </StyledTable>
          </TableResponsive>
          <StyledButton onClick={handleDownload}>Download Excel</StyledButton>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminSubjectResults;
