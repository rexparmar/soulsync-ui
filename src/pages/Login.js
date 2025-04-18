import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>SoulSync 💙</h2>
        <p className="subtitle">Welcome back, please login to continue</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="register-link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
