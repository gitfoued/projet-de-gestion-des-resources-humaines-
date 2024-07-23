import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const RolesList = () => {
    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rolesPerPage] = useState(8); // Nombre de rôles par page
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roles');
            if (response.data) {
                setRoles(response.data);
            } else {
                setRoles([]);
                console.log('No roles found in response.');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    const deleteRole = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/roles/${id}`);
            setRoles(roles.filter(role => role.id !== id));
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const viewRoleDetails = (id) => {
        navigate(`/role/${id}`);
    };

    const editRole = (id) => {
        navigate(`/modifierrole/${id}`);
    };

    const indexOfLastRole = currentPage * rolesPerPage;
    const indexOfFirstRole = indexOfLastRole - rolesPerPage;
    const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Liste des Rôles</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/12 px-4 py-2">ID</th>
                            <th className="w-5/12 px-4 py-2">Nom du rôle</th>
                            <th className="w-4/12 px-4 py-2">Description</th>
                            <th className="w-2/12 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRoles.length > 0 ? (
                            currentRoles.map((role) => (
                                <tr key={role.id} className="border-t">
                                    <td className="border px-4 py-2">{role.id}</td>
                                    <td className="border px-4 py-2">{role.name}</td>
                                    <td className="border px-4 py-2">{role.description}</td>
                                    <td className="border px-4 py-2 flex justify-around">
                                        <button onClick={() => viewRoleDetails(role.id)}>
                                            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 cursor-pointer" />
                                        </button>
                                        <button onClick={() => deleteRole(role.id)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
                                        </button>
                                        <button onClick={() => editRole(role.id)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-yellow-500 cursor-pointer" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center px-4 py-2">Aucun rôle trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md"
                >
                    Précédent
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastRole >= roles.length}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default RolesList;
