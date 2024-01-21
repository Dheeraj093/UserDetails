import React, { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';

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
};

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/forgetPassword', { email });
      console.log('Password reset email sent:', response.data);
      navigate("/new-password");
    } catch (error) {
      console.error('Password reset failed:', error.response.data);
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2>Reset Password</h2>
      <form>
        <label style={styles.label}>
          Email:
          <input type="email" value={email} onChange={handleChange} style={styles.input} />
        </label>
        <button onClick={handleResetPassword} style={styles.button}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
