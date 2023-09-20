import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginCard } from './LoginCard';

export const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('You must input a valid email'),
    password: Yup.string().required('You must input a password'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const loginUser = async (data) => {
    try {
      const loggedInUser = await axios.post(
        'http://localhost:3001/api/user/login',
        data
      );

      localStorage.setItem('accessToken', loggedInUser.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <LoginCard
      validationSchema={validationSchema}
      initialValues={initialValues}
      loginUser={loginUser}
    />
  );
};
