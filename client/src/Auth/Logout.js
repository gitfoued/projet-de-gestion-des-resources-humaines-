import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from local storage
        localStorage.removeItem('monToken');
        
        // Navigate to the login page
        navigate('/');
    }, [navigate]);

    return null;
};

export default Logout;
