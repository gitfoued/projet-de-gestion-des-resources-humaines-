import React, { useState } from 'react';
import Dashboard from '../Components/Dashboard';
import Navbar from '../Components/Navbar';

export default function DashboardPage() {
    

    return (
        <div className="h-screen flex flex-col">
            
            <div className="flex-shrink-0 p-4 bg-gray-200 flex items-center justify-start">
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-indigo-900">
                    <Navbar />
                </div>
                <div className="flex-1 bg-gray-100 overflow-y-auto">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
}
