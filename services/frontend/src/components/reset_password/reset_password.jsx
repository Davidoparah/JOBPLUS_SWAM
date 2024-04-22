import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.scss';
import Alert from '../alert/Alert';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import authService from '../../services/AuthService';

export default function reset_password() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [alert, setAlert] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const { post } = useApi();

  const { resetPassword } = authService();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const handleSuccess = () => {
    // reset out state
    setPasswordConfirmation('');
    setPassword('');
    // navigate to the login page
    navigate('/login');
  };

  const handleError = (err) => {
    setAlert(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    await resetPassword(passwordConfirmation, password, code, handleSuccess, handleError);
  };

  return (
    <>
      <Alert data={alert} />
      <form className="form form--page" onSubmit={handleSubmit}>

        <div className="form__group form__group--page">
          <label className="form__label">Password</label>
          <input 
            className="form__field" 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Confirm Password</label>
          <input 
            className="form__field" 
            type="password" 
            placeholder="Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Reset Password" />
        </div>

        <footer>
          Remembered password? <Link to='/login'>Login</Link>
        </footer>
      </form>
    </>
  );
}
