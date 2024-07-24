import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessMessage from '../SuccessMessage';
import ProtectedComponent from '../ProtectedComponent';
const EditRolePage = () => {
    const { id } = useParams();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [role, setRole] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        fetchRole();
    }, []);

    const fetchRole = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/roles/${id}`);
            setRole(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération du rôle:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRole({ ...role, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/roles/${id}`, role);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle:', error);
        }
    };

    return (
        <ProtectedComponent requiredRole="Manager">
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Modifier un Rôle</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nom du Rôle</label>
                    <input
                        type="text"
                        name="name"
                        value={role.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={role.description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md">
                        Modifier le Rôle
                    </button>
                </div>
            </form>
            {showSuccessMessage && (
                <SuccessMessage
                    message="Rôle modifié avec succès !"
                    redirectPath="/roles"
                />
            )}
        </div>
        </ProtectedComponent>
    );
};

export default EditRolePage;
