import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '.   /Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/register', formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Your SoulSync Account</h2>
        <p className="subtitle">Start your emotional wellness journey 💙</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
