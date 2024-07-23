// ProtectedComponent.js
import React from 'react';
import { useAuth } from './AuthProvider';

const ProtectedComponent = ({ roleRequired, children }) => {
    const userRole = useAuth();

    if (userRole !== roleRequired) {
        return <div>You do not have permission to view this page.</div>;
    }

    return <>{children}</>;
};

export default ProtectedComponent;
