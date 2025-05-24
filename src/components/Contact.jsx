import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';


const Contact = () => {
    const apiUrl = import.meta.env.VITE_REACT_API_URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

   const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject?.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
  
    // Message validation
    if (!formData.message?.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
  
    return newErrors;
  };


    // Update handleSubmit to show a specific error message for invalid fields
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      toast.error("Please login to send message");
      navigate("/login");
      return;
    }

    const newErrors = validateForm();
     if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Show specific error message based on which fields are invalid
      const errorFields = Object.keys(newErrors).join(', ');
      toast.error(`Please check the following fields: ${errorFields}`);
      return;
    }
  
    try {
      const response = await fetch(
        `${apiUrl}/api/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );
  
      const data = await response.json();
      
      if (data) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      }
       else {
        toast.error( "Failed to send message");
      }
      
       } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Contact Us</h1>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="lead text-center mb-4">We'd love to hear from you! Please fill out the form below or use the contact information provided.</p>
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} className="form-control" id="name" placeholder="Enter your name"/>
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} name='email' placeholder="Enter your email address"/>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control" name='subject' value={formData.subject} onChange={handleChange}  id="subject" placeholder="Enter the subject of your message"/>
                    {errors.subject && <div className="text-danger">{errors.subject}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" name='message' value={formData.message} onChange={handleChange} id="message" rows="5" placeholder="Enter your message"/>
                    {errors.message && <div className="text-danger">{errors.message}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>Your go-to online store for quality products and excellent service.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="index.html" className="text-light">Home</a></li>
                <li><a href="products.html" className="text-light">Products</a></li>
                <li><a href="services.html" className="text-light">Services</a></li>
                <li><a href="contact.html" className="text-light">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-4 ">
              <h5>Follow Us</h5>
              <ul className="list-inline">
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-facebook-f"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-instagram"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-twitter"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-github"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-linkedin-in"></i></a></li>
              </ul>
            </div>
          </div>
          <hr className="my-3"/>
          <p>&copy; 2025 Your E-commerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Contact