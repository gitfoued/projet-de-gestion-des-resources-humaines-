import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedComponent = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role');

  if (role !== requiredRole) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedComponent;
