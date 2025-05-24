import React, { useState } from "react";
import f1 from "../assets/form-logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (credentials.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }
    if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (credentials.password !== credentials.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Only proceed if validation passes
      const { name, email, password } = credentials;
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/createuser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          }
        );

        const data = await response.json();
        if (data?.authToken) {
          localStorage.setItem("token", data.authToken);
          toast.success("Registration successful!");
          navigate("/login");
        } else if (data?.error) {
          toast.error(data.error);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An unexpected error occurred");
      } 
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6 mt-5">
            <div className="image-side">
              <img src={f1} alt="Signup image" />
            </div>
          </div>
          <div className="col-md-6 mt-5">
            <h2>Register to continue</h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Full Name</label>
                <input
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <input
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    } position-absolute`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  ></i>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <div className="position-relative">
                  <input
                    name="cpassword"
                    value={credentials.cpassword}
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${
                      errors.cpassword ? "is-invalid" : ""
                    }`}
                  />
                  <i
                    className={`fa-solid ${
                      showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                    } position-absolute`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  ></i>
                  {errors.cpassword && (
                    <div className="invalid-feedback">{errors.cpassword}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <p>
              Already registered? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="row footer-body ">
        <div className="footer-logo-design">
          <span>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </span>
          <span>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </span>
          <span>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
          </span>
          <span>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-google"></i>
            </a>
          </span>
          <span>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
