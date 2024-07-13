import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(8); // Nombre d'employés par page
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, [searchTerm]);

    const fetchEmployees = async () => {
        try {
            let url = 'http://localhost:5000/api/employees';
            if (searchTerm) {
                url = `http://localhost:5000/api/employees/search?keyword=${searchTerm}`;
            }
            const response = await axios.get(url);

            if (response.data && response.data.content) {
                setEmployees(response.data.content); // Accéder à la propriété `content` qui contient le tableau d'employés
            } else {
                setEmployees([]);
                console.log('No employees found in response.');
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]); // En cas d'erreur, définir employees comme un tableau vide
        }
    };

    const deleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/employees/${id}`);
            console.log(`Employé avec ID: ${id} supprimé`);
            // Mettre à jour la liste des employés après suppression
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'employé:', error);
        }
    };

    const viewEmployeeDetails = (id) => {
       
        console.log(`Afficher les détails de l'employé avec ID: ${id}`);
    };

    // Index de début et de fin de la page actuelle
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees ? employees.slice(indexOfFirstEmployee, indexOfLastEmployee) : [];

    // Fonction pour changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
   
    

    // Fonction pour gérer la recherche en temps réel
    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        setCurrentPage(1); // Revenir à la première page lors d'une nouvelle recherche
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Liste des Employés</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Rechercher par nom, email..."
                    className="px-4 py-2 border rounded-md w-80"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/12 px-4 py-2">ID</th>
                            <th className="w-2/12 px-4 py-2">Nom</th>
                            <th className="w-2/12 px-4 py-2">Prénom</th>
                            <th className="w-3/12 px-4 py-2">Email</th>
                            <th className="w-2/12 px-4 py-2">Département</th>
                            <th className="w-2/12 px-4 py-2">Rôle</th>
                            <th className="w-1/12 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(currentEmployees) && currentEmployees.length > 0 ? (
                            currentEmployees.map((employee) => (
                                <tr key={employee.id} className="border-t">
                                    <td className="border px-4 py-2">{employee.id}</td>
                                    <td className="border px-4 py-2">{employee.lastName}</td>
                                    <td className="border px-4 py-2">{employee.firstName}</td>
                                    <td className="border px-4 py-2">{employee.email}</td>
                                    <td className="border px-4 py-2">{employee.department.name}</td>
                                    <td className="border px-4 py-2">{employee.role.name}</td>
                                    <td className="border px-4 py-2 flex justify-around">
                                        <button onClick={() => viewEmployeeDetails(employee.id)}>
                                            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />
                                        </button>
                                        <button onClick={() => deleteEmployee(employee.id)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center px-4 py-2">Aucun employé trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
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
                    disabled={indexOfLastEmployee >= employees.length}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default EmployeesList;
