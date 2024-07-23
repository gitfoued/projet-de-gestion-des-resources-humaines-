// AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost/5000/api/user/role', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('monToken')}`,
                    },
                });
                setUserRole(response.data.role);
                console.log(response.data.role)
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, []);

    return (
        <AuthContext.Provider value={userRole}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
