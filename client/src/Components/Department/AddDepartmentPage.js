import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from '../SuccessMessage';
import ProtectedComponent from '../ProtectedComponent';
const AddDepartmentPage = () => {
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        name: '',
        description: '',
        departmentHead: ''
    });

    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const validate = () => {
        let errors = {};

        if (!department.name) {
            errors.name = 'Le nom du département est requis';
        }
        if (!department.departmentHead) {
            errors.departmentHead = 'Le chef de département est requis';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prevDepartment) => ({
            ...prevDepartment,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/departments', department);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    return (
        <ProtectedComponent requiredRole="Manager">
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-8">Ajouter Département</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nom du Département
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={department.name}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-500'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={department.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentHead">
                        Chef de Département
                    </label>
                    <input
                        type="text"
                        name="departmentHead"
                        value={department.departmentHead}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.departmentHead && 'border-red-500'}`}
                    />
                    {errors.departmentHead && <p className="text-red-500 text-xs italic">{errors.departmentHead}</p>}
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
                        onClick={() => navigate('/departments')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Annuler
                    </button>
                </div>
            </form>
            {showSuccessMessage && (
                <SuccessMessage
                    message="Département ajouté avec succès !"
                    redirectPath="/departments" 
                />
            )}
        </div>
        </ProtectedComponent>
    );
};

export default AddDepartmentPage;
