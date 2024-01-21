import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const styles = {
  authContainer: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop: '50px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  forgetPasswordLink: {
    marginTop: '15px',
    textAlign: 'center',
  },
};

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);
      console.log('Login successful:', response.data);
      // Add any additional logic (e.g., set authentication state, redirect)
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2>Login</h2>
      <form>
        <label style={styles.label}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </form>

      <div style={styles.forgetPasswordLink}>
        <p>Forgot your password?</p>
        <Link to="/reset-password">Reset it here</Link>
      </div>
    </div>
  );
};

export default Login;
