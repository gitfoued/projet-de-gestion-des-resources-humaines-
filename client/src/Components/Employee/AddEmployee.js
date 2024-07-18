import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from '../SuccessMessage';
const AddPage = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        hireDate: '',
        salary: '', // Keep salary as a string
        departmentId: '', // Department ID as a string
        roleId: '', // Role ID as a string
        department: {
            id: 0
        },
        role: {
            id: 0
        },
        address: '',
        dateOfBirth: ''
    });

    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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

    // Function to convert salary to decimal with two decimal places
    const formatSalary = (salary) => {
        return parseFloat(salary).toFixed(2);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        // Convert salary to decimal with two decimal places
        const formattedSalary = formatSalary(employee.salary);
        const updatedEmployee = {
            ...employee,
            salary: formattedSalary,
            department: { id: employee.departmentId },
            role: { id: employee.roleId }
        };

        try {
            await axios.post('http://localhost:5000/api/employees', updatedEmployee);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Error adding employee:', error);
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.message && error.response.data.message.includes('Email already exists')) {
                setErrors({ email: 'Email already exists' });
            } else {
                console.error('Error adding employee:', error);
            }
        }
    };

    const InputField = ({ name, label, type = 'text' }) => (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={employee[name]}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[name] && 'border-red-500'}`}
            />
            {errors[name] && <p className="text-red-500 text-xs italic">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-8">Ajouter Employé</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <InputField name="firstName" label="Prénom" />
                <InputField name="lastName" label="Nom" />
                <InputField name="email" label="Email" type="email" />
                <InputField name="phoneNumber" label="Numéro de téléphone" />
                <InputField name="hireDate" label="Date d'embauche" type="date" />
                <InputField name="salary" label="Salaire" />
                <InputField name="departmentId" label="ID du Département" />
                <InputField name="roleId" label="ID du Rôle" />
                <InputField name="address" label="Adresse" />
                <InputField name="dateOfBirth" label="Date de naissance" type="date" />
                
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Ajouter
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/employees')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Annuler
                    </button>
                </div>
            </form>
            {showSuccessMessage && (
                <SuccessMessage
                    message="Employé ajouté avec succès !"
                    redirectPath="/employees" 
                />
            )}
        </div>
    );
};

export default AddPage;
