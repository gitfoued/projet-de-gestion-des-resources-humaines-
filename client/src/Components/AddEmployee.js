import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        hireDate: '',
        salary: '',
        departmentId: '',
        roleId: '',
        address: '',
        dateOfBirth: '', 
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let errors = {};

        if (!employee.firstName) {
            errors.firstName = 'Le prénom est requis';
        }
        if (!employee.lastName) {
            errors.lastName = 'Le nom est requis';
        }
        if (!employee.email) {
            errors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
            errors.email = 'L\'adresse email est invalide';
        }
        if (!employee.hireDate) {
            errors.hireDate = 'La date d\'embauche est requise';
        }
        if (!employee.salary) {
            errors.salary = 'Le salaire est requis';
        }
        if (!employee.dateOfBirth) {
            errors.dateOfBirth = 'La date de naissance est requise';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dateOfBirth') {
            // Format date to YYYY-MM-DD before setting state
            const formattedDate = new Date(value).toISOString().split('T')[0];
            setEmployee({ ...employee, [name]: formattedDate });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/employees', {
                first_name: employee.firstName,
                last_name: employee.lastName,
                email: employee.email,
                phone_number: employee.phoneNumber,
                hire_date: employee.hireDate,
                salary: employee.salary,
                department_id: parseInt(employee.departmentId), // Ensure integer value
                role_id: parseInt(employee.roleId), // Ensure integer value
                address: employee.address,
                date_of_birth: employee.dateOfBirth,
            });
            navigate('/employees');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'employé :', error);
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.message && error.response.data.message.includes('Email already exists')) {
                setErrors({ email: 'Email already exists' });
            } else {
                console.error('Error adding employee:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-8">Ajouter Employé</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        Prénom
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName && 'border-red-500'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Nom
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName && 'border-red-500'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && 'border-red-500'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Numéro de téléphone
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={employee.phoneNumber}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hireDate">
                        Date d'embauche
                    </label>
                    <input
                        type="date"
                        name="hireDate"
                        value={employee.hireDate}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.hireDate && 'border-red-500'}`}
                    />
                    {errors.hireDate && <p className="text-red-500 text-xs italic">{errors.hireDate}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                        Salaire
                    </label>
                    <input
                        type="number"
                        name="salary"
                        value={employee.salary}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.salary && 'border-red-500'}`}
                    />
                    {errors.salary && <p className="text-red-500 text-xs italic">{errors.salary}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentId">
                        ID du Département
                    </label>
                    <input
                        type="number"
                        name="departmentId"
                        value={employee.departmentId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleId">
                        ID du Rôle
                    </label>
                    <input
                        type="number"
                        name="roleId"
                        value={employee.roleId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Adresse
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={employee.address}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address && 'border-red-500'}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
                        Date de naissance
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={employee.dateOfBirth}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-xs italic">{errors.dateOfBirth}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Ajouter
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
