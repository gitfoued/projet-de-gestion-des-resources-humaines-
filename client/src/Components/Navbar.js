import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="bg-indigo-900 w-64 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-center mb-4">
                        <h1 className="text-white text-2xl font-bold">Gestion RH</h1>
                    </div>
                    <p className="text-white text-center bg-transparent mb-8 mt-8 opacity-30">Modules</p>
                    <div>
                        <Link to="/" className="flex items-center text-white py-2 px-4 mb-2 rounded-md hover:bg-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a2 2 0 00-2 2v4H6a2 2 0 00-2 2v6h12v-6a2 2 0 00-2-2h-2V4a2 2 0 00-2-2z" />
                            </svg>
                            Tableau de bord
                        </Link>
                        <Link to="/employees" className="flex items-center text-white py-2 px-4 mb-2 rounded-md hover:bg-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 3a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h1a2 2 0 002-2V5a2 2 0 012-2z" />
                            </svg>
                            Employée
                        </Link>
                        <Link to="/departments" className="flex items-center text-white py-2 px-4 mb-2 rounded-md hover:bg-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 7a1 1 0 011-1h1.6l.894-1.342A1 1 0 017.6 4h4.8a1 1 0 01.806.658L14.4 6H16a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7zm2 0v8h10V7H5z" />
                            </svg>
                            Dèpartment
                        </Link>
                        <Link to="/roles" className="flex items-center text-white py-2 px-4 mb-2 rounded-md hover:bg-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6.5 2.5a.5.5 0 00-1 0V4a.5.5 0 001 0V2.5zM10.5 2a.5.5 0 10-1 0v1.5a.5.5 0 001 0V2zM14.5 2a.5.5 0 10-1 0v2a.5.5 0 001 0V2zM6 11a4 4 0 11-8 0 4 4 0 018 0zM18 11a4 4 0 11-8 0 4 4 0 018 0zM14 12.5a3.5 3.5 0 00-7 0V17h7v-4.5zM16 12.5a3.5 3.5 0 00-7 0V17h7v-4.5z" />
                            </svg>
                            Role
                        </Link>
                    </div>
                </div>
                <Link to="/logout" className="flex items-center text-white py-2 px-4 mt-2 rounded-md hover:bg-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L11 10.586V8a1 1 0 10-2 0v2.586L7.707 9.707a1 1 0 10-1.414 1.414l3.5 3.5a1 1 0 001.414 0l3.5-3.5z" clipRule="evenodd" />
                    </svg>
                    Logout
                </Link>
            </div>

            <div className="flex-1 p-6 ">
                <div className="mb-4 ">
                    <input 
                        type="text" 
                        placeholder="Rechercher..." 
                        className=" w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 "
                    />
                </div>
            </div>
        </div>
    );
}
