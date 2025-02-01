import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"; // Custom CSS for additional styling and animations

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
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Roll No</label>
                      <input
                        type="text"
                        className="form-control"
                        name="rollNo"
                        value={formData.rollNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Branch</label>
                      <input
                        type="text"
                        className="form-control"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Section</label>
                      <input
                        type="text"
                        className="form-control"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Year of Study</label>
                      <input
                        type="text"
                        className="form-control"
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Gender</label>
                      <input
                        type="text"
                        className="form-control"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Mobile No</label>
                      <input
                        type="text"
                        className="form-control"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Email ID</label>
                      <input
                        type="email"
                        className="form-control"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="At least 6 characters with one uppercase, one lowercase, one special character, and a number."
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Register
                </button>
                {error && (
                  <div className="alert alert-danger mt-3 animate__animated animate__shakeX">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="alert alert-success mt-3 animate__animated animate__fadeIn">
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;