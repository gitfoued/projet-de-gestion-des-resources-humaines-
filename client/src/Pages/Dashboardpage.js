import React, { useState } from 'react';
import Dashboard from '../Components/Dashboard';
import Navbar from '../Components/Navbar';

export default function DashboardPage() {
    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    return (
        <div className="h-screen flex flex-col">
            
            <div className="flex-shrink-0 p-4 bg-gray-200 flex items-center justify-start">
                <button onClick={toggleSearch} className="px-3 py-2 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.293 12.293a1 1 0 001.414-1.414l-1.175-1.175a1 1 0 00-.113-.136A5.5 5.5 0 1011 16.5a5.5 5.5 0 003.707-1.457l1.175 1.175a1 1 0 001.414 0zm-2.88-3.154a3.5 3.5 0 11-4.53-4.53 3.5 3.5 0 014.53 4.53z" clipRule="evenodd" />
                    </svg>
                </button>
                {searchVisible && (
                    <input 
                        type="text" 
                        placeholder="Rechercher..." 
                        className="w-full px-4 py-2 ml-4 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    />
                )}
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-indigo-900">
                    <Navbar />
                </div>
                <div className="flex-1 bg-gray-100 overflow-y-auto">
                    <Dashboard userName="John Doe" />
                </div>
            </div>
        </div>
    );
}
