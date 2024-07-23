import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoleDetails = () => {
    const { id } = useParams(); // Extract the `id` parameter from the URL
    const [role, setRole] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetchRoleDetails();
    }, [id]); // Fetch role details whenever `id` changes

    const fetchRoleDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/roles/${id}`);
            setRole(response.data);
        } catch (error) {
            console.error('Error fetching role details:', error);
        }
    };

    const handleBackClick = () => {
        navigate('/roles');
    };

    if (!role) {
        return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
    }

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-8">Détails du Rôle</h1>
            <div className="max-w-xl bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 text-center mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{role.name}</h2>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>ID:</strong> {role.id}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-gray-700"><strong>Description:</strong> {role.description}</p>
                    </div>
                </div>
            </div>
            <button
                onClick={handleBackClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Retour à la liste des rôles
            </button>
        </div>
    );
};

export default RoleDetails;
