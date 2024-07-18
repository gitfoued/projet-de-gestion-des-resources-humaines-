import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessMessage = ({ message, redirectPath }) => {
    const navigate = useNavigate();

    const handleOKClick = () => {
        navigate(redirectPath);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
                <p className="text-lg font-bold text-center mb-4">{message}</p>
                <div className="flex justify-center">
                    <button
                        onClick={handleOKClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
