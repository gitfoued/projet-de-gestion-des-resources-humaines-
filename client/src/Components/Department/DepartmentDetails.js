import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DepartmentDetails = () => {
    const { id } = useParams();  // Extraire le paramètre `id` de l'URL
    const [department, setDepartment] = useState(null);
    const navigate = useNavigate();  // Hook pour la navigation

    useEffect(() => {
        fetchDepartmentDetails();
    }, [id]);  // Récupérer les détails du département chaque fois que `id` change

    const fetchDepartmentDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/departments/${id}`);
            setDepartment(response.data);
        } catch (error) {
            console.error('Error fetching department details:', error);
        }
    };

    const handleBackClick = () => {
        navigate('/departments');  
    };

    if (!department) {
        return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
    }

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-8">Détails du Département</h1>
            <div className="max-w-xl bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 text-center mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{department.name}</h2>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>ID:</strong> {department.id}</p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="text-xl font-semibold mb-2">Liste des employés</h3>
                        <ul className="list-disc list-inside">
                            {department.employees.length > 0 ? (
                                department.employees.map(employee => (
                                    <li key={employee.id} className="text-gray-700">{employee.firstName} {employee.lastName} ({employee.role.name})</li>
                                ))
                            ) : (
                                <li className="text-gray-700">Aucun employé trouvé</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <button
                onClick={handleBackClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Retour à la liste des départements
            </button>
        </div>
    );
};

export default DepartmentDetails;
