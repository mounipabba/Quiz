import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shakeX = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

// Container with top margin and fade-in animation
const Container = styled.div`
  margin-top: 3rem;
  animation: ${fadeIn} 1s;
`;

// Row for centering content
const Row = styled.div`
  display: flex;
  justify-content: center;
`;

// Column for responsive width (mimics col-md-6 col-lg-4)
const Column = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 15px;
`;

// Card styling with shadow and hover effect
const Card = styled.div`
  background: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    margin: 0 10px;
  }
`;

// Card body for padding
const CardBody = styled.div`
  padding: 1.5rem;
`;

// Title styling for the form header
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

// Alert styling for error messages with conditional animation
const Alert = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 5px;
  background-color: ${({ variant }) =>
    variant === "danger" ? "#f8d7da" : "#d4edda"};
  color: ${({ variant }) =>
    variant === "danger" ? "#721c24" : "#155724"};
  animation: ${({ variant }) => (variant === "danger" ? shakeX : fadeIn)} 1s;
  margin-bottom: 1rem;
`;

// Form styling
const Form = styled.form`
  width: 100%;
`;

// Form group styling for spacing between label and input
const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

// Label styling
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

// Input styling (mimics the Bootstrap form-control)
const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

// Button styling for the primary action
const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", { username, password });
      // Save the token and update user state
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      // Navigate to the home page after successful login
      navigate("/home");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Container>
      <Row>
        <Column>
          <Card>
            <CardBody>
              <Title>Login</Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Username</Label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button type="submit">Login</Button>
              </Form>
            </CardBody>
          </Card>
        </Column>
      </Row>
    </Container>
  );
};

export default Login;
