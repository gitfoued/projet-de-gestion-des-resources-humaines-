import React from 'react';

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">You do not have the required permissions to view this page.</p>
        <button
          onClick={() => window.location.href = '/Dashboardpage'}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
