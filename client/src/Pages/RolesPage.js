import React, { useState } from 'react';
import RolesList from "../Components/Roles/RolesList";
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const RolesPage = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    const ajouterRole = () => {
        navigate('/ajouterrole');
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-indigo-900">
                    <Navbar />
                </div>
                <div className="flex-1 p-4">
                    <RolesList roles={roles} setRoles={setRoles} />
                </div>
                <div className="w-64 bg-gray-100 p-4">
                    <h2 className="text-lg font-semibold mb-4">Options</h2>
                    <button onClick={ajouterRole} className="w-full px-4 py-2 mb-4 bg-green-500 text-white rounded-md">
                        Ajouter un rôle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RolesPage;
