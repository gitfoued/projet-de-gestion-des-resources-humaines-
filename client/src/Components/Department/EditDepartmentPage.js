import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessMessage from '../SuccessMessage';

const EditDepartmentPage = () => {
    const { id } = useParams();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [department, setDepartment] = useState({
        name: '',
        description: '',
        departmentHead: ''
    });
    useEffect(() => {
        fetchDepartment();
    }, []);

    const fetchDepartment = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/departments/${id}`);
            setDepartment(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Erreur lors de la récupération du département:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/departments/${id}`, department);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du département:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Modifier un Département</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nom du Département</label>
                    <input
                        type="text"
                        name="name"
                        value={department.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={department.description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Chef de Département</label>
                    <input
                        type="text"
                        name="departmentHead"
                        value={department.departmentHead}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md">
                        Modifier le Département
                    </button>
                </div>
            </form>
            {showSuccessMessage && (
                <SuccessMessage
                    message="Département modifié avec succès !"
                    redirectPath="/departments"
                />
            )}
        </div>
    );
};

export default EditDepartmentPage;
