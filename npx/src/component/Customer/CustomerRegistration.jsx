import React, { useState } from 'react';
import axios from 'axios';

function CustomerRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/customers/register', formData)
      .then(response => {
        alert('Registration successful');
        window.location.href = '/customer/login';
      })
      .catch(error => {
        alert('Registration failed');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="mobile" placeholder="Mobile No." onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
      <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
      <button type="submit">Register</button>
    </form>
  );
}

export default CustomerRegistration;