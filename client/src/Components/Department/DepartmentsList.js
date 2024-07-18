import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const DepartmentsList = () => {
    const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [departmentsPerPage] = useState(8); // Nombre de départements par page
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Pour gérer l'ID du département à supprimer
    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/departments');
            if (response.data) {
                setDepartments(response.data);
            } else {
                setDepartments([]);
                console.log('No departments found in response.');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    const deleteDepartment = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/departments/${id}`);
            setDepartments(departments.filter(department => department.id !== id));
            setConfirmDeleteId(null); // Réinitialiser l'état après la suppression
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    const handleDeleteClick = (id) => {
        setConfirmDeleteId(id); 
    };

    const handleConfirmDelete = () => {
        if (confirmDeleteId) {
            deleteDepartment(confirmDeleteId);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeleteId(null); // Annuler la suppression, réinitialiser l'état
    };

    const viewDepartmentDetails = (id) => {
        navigate(`/department/${id}`);
    };

    const editDepartment = (id) => {
        navigate(`/modifierdepartment/${id}`);
    };

    const indexOfLastDepartment = currentPage * departmentsPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
    const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Liste des Départements</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/12 px-4 py-2">ID</th>
                            <th className="w-6/12 px-4 py-2">Nom du département</th>
                            <th className="w-3/12 px-4 py-2">Nombre d'employés</th>
                            <th className="w-2/12 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDepartments.length > 0 ? (
                            currentDepartments.map((department) => (
                                <tr key={department.id} className="border-t">
                                    <td className="border px-4 py-2">{department.id}</td>
                                    <td className="border px-4 py-2">{department.name}</td>
                                    <td className="border px-4 py-2">{department.employeeCount}</td>
                                    <td className="border px-4 py-2 flex justify-around">
                                        <button onClick={() => viewDepartmentDetails(department.id)}>
                                            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 cursor-pointer" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(department.id)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
                                        </button>
                                        <button onClick={() => editDepartment(department.id)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-yellow-500 cursor-pointer" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center px-4 py-2">Aucun département trouvé.</td>
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
                    disabled={indexOfLastDepartment >= departments.length}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                    Suivant
                </button>
            </div>

            {/* Boîte de dialogue de confirmation */}
            {confirmDeleteId && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <p className="text-lg font-semibold mb-4">Confirmer la suppression</p>
                        <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce département ?</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                Oui, Supprimer
                            </button>
                            <button onClick={handleCancelDelete} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentsList;
