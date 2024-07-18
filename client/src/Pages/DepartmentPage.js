import React, { useState } from 'react';
import DepartmentsList from "../Components/Department/DepartmentsList";
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const DepartmentPage = () => {
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    const ajouter = () => {
        navigate('/ajouterdepartment');
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-indigo-900">
                    <Navbar />
                </div>
                <div className="flex-1 p-4">
                    <DepartmentsList departments={departments} setDepartments={setDepartments} />
                </div>
                <div className="w-64 bg-gray-100 p-4">
                    <h2 className="text-lg font-semibold mb-4">Options</h2>
                    <button onClick={ajouter} className="w-full px-4 py-2 mb-4 bg-green-500 text-white rounded-md">
                        Ajouter un département
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentPage;
