import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(3); // Nombre d'employés par page

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees'); // Assurez-vous que l'URL correspond à celle de votre backend
            setEmployees(response.data.content); // Accéder à la propriété `content` qui contient le tableau d'employés
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Index de début et de fin de la page actuelle
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Fonction pour changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Liste des Employés</h1>
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
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center px-4 py-2">Pas d'employés à afficher pour le moment.</td>
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
