import React, { useState } from 'react';
import axios from 'axios';

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

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    resetToken: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/resetPassword', formData);
      console.log('Password reset successful:', response.data);
      
    } catch (error) {
      console.error('Password reset failed:', error.response.data);
       
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2>Reset Password</h2>
      <form>
        <label style={styles.label}>
          Reset Token:
          <input
            type="text"
            name="resetToken"
            value={formData.resetToken}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <button onClick={handleResetPassword} style={styles.button}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
