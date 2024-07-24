import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessMessage from '../SuccessMessage';
import ProtectedComponent from '../ProtectedComponent';
const EditPage = () => {
    const { id } = useParams();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [employee, setEmployee] = useState({
        address: '',
        dateOfBirth: '',
        department: { id: '', name: '', description: '', departmentHead: '' },
        email: '',
        firstName: '',
        hireDate: '',
        id: '',
        lastName: '',
        phoneNumber: '',
        role: { id: '', name: '', description: '', creationDate: '' },
        salary: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
            setEmployee(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'employé:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleDepartmentChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, department: { ...employee.department, [name]: value } });
    };

    const handleRoleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, role: { ...employee.role, [name]: value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
setShowSuccessMessage(true);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'employé:', error);
        }
    };

    return (
        <ProtectedComponent requiredRole="Manager">
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Modifier un Employé</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nom</label>
                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Adresse</label>
                    <input
                        type="text"
                        name="address"
                        value={employee.address}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Date de naissance</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={employee.dateOfBirth.split('T')[0]}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Département</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.department.name}
                        onChange={handleDepartmentChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Rôle</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.role.name}
                        onChange={handleRoleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Téléphone</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={employee.phoneNumber}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Salaire</label>
                    <input
                        type="number"
                        name="salary"
                        value={employee.salary}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Date d'embauche</label>
                    <input
                        type="date"
                        name="hireDate"
                        value={employee.hireDate.split('T')[0]}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md">
                        Modifier un employé
                    </button>
                </div>
            </form>
            {showSuccessMessage && (
                <SuccessMessage
                    message="Employé modifié avec succès !"
                    redirectPath="/employees"
                />
            )}
        </div>
        </ProtectedComponent>
    );
};

export default EditPage;
