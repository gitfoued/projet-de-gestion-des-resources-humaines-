import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
    const { id } = useParams();  // Extract the `id` parameter from the URL
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();  // Hook for navigation

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);  // Fetch the employee details whenever the `id` changes

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const handleBackClick = () => {
        navigate('/employees');  
    };

    if (!employee) {
        return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
    }

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-8">Détails de l'employé</h1>
            <div className="max-w-xl bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 text-center mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{employee.firstName} {employee.lastName}</h2>
                        <p className="text-gray-600">{employee.role.name} dans {employee.department.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>ID:</strong> {employee.id}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {employee.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Département:</strong> {employee.department.name}</p>
                        <p className="text-gray-700"><strong>Date d'embauche:</strong> {new Date(employee.hireDate).toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-gray-700"><strong>Salaire:</strong> {employee.salary}€</p>
                    </div>
                </div>
            </div>
            <button
                onClick={handleBackClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Retour à la liste des employés
            </button>
        </div>
    );
};

export default EmployeeDetails;
