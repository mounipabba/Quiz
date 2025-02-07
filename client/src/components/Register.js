import React, { useState } from "react";
import axios from "axios";
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

// Container (replaces .container.mt-5 and animate__fadeIn)
const Container = styled.div`
  margin-top: 3rem;
  animation: ${fadeIn} 1s;
`;

// Row & Column for grid layout
const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Column = styled.div`
  width: 100%;
  max-width: 600px; /* roughly col-md-8 col-lg-6 */
  padding: 0 15px;
`;

// Card styling (replaces .card and its hover effects)
const Card = styled.div`
  background: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    margin: 0 10px;
  }
`;

// Card body styling
const CardBody = styled.div`
  padding: 1.5rem;
`;

// Title styling
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

// Form styling
const Form = styled.form`
  width: 100%;
`;

// Row for grouping form columns
const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

// Each column in the form
const FormColumn = styled.div`
  flex: 1;
  min-width: 250px;
`;

// Form group styling (for spacing between label & input)
const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

// Label styling
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

// Input styling (replaces .form-control)
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

// Button styling (replaces .btn.btn-primary)
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

// Alert styling (for error and success messages)
const Alert = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  background-color: ${({ variant }) =>
    variant === "danger" ? "#f8d7da" : "#d4edda"};
  color: ${({ variant }) =>
    variant === "danger" ? "#721c24" : "#155724"};
  animation: ${({ variant }) =>
    variant === "danger" ? shakeX : fadeIn} 1s;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    branch: "",
    section: "",
    yearOfStudy: "",
    gender: "",
    mobileNo: "",
    emailId: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/auth/register", formData);
      setMessage("Registration successful! Please go to the login page.");
      setFormData({
        rollNo: "",
        name: "",
        branch: "",
        section: "",
        yearOfStudy: "",
        gender: "",
        mobileNo: "",
        emailId: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to register");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Column>
          <Card>
            <CardBody>
              <Title>Register</Title>
              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormColumn>
                    <FormGroup>
                      <Label>Roll No</Label>
                      <Input
                        type="text"
                        name="rollNo"
                        value={formData.rollNo}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Name</Label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Branch</Label>
                      <Input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Section</Label>
                      <Input
                        type="text"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Year of Study</Label>
                      <Input
                        type="text"
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </FormColumn>
                  <FormColumn>
                    <FormGroup>
                      <Label>Gender</Label>
                      <Input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Mobile No</Label>
                      <Input
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Email ID</Label>
                      <Input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Username</Label>
                      <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="At least 6 characters with one uppercase, one lowercase, one special character, and a number."
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Confirm Password</Label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </FormColumn>
                </FormRow>
                <Button type="submit">Register</Button>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
              </Form>
            </CardBody>
          </Card>
        </Column>
      </Row>
    </Container>
  );
};

export default Register;
