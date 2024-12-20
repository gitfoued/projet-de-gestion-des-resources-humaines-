import React, { useState } from 'react';
import EmployeeList from "../Components/Employee/EmployeesList"
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const navigate=useNavigate();
    const ajouter= () => {
        navigate('/ajouter');  
    };
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-indigo-900">
                    <Navbar />
                </div>
                <div className="flex-1 p-4">
                    <EmployeeList employees={employees} setEmployees={setEmployees} />
                </div>
                <div className="w-64 bg-gray-100 p-4">
                    <h2 className="text-lg font-semibold mb-4">Options</h2>
                    <button onClick={()=>{ajouter()}}   className="w-full px-4 py-2 mb-4 bg-green-500 text-white rounded-md">
                        Ajouter un employé
                    </button>
                   
                </div>
            </div>
        </div>
    );
};

export default EmployeePage;
