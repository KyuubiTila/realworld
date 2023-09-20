import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login/Login';
import { HomePage } from '../HomePage/HomePage';

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};
