import React, { useState } from 'react';
import axios from 'axios';

function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/customers/login', { email, password })
      .then(response => {
        alert('Login successful');
        window.location.href = '/order';
      })
      .catch(error => {
        alert('Login failed');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default CustomerLogin;

