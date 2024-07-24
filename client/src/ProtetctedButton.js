import React from 'react';

const ProtectedButton = ({ requiredRole, onClick, children }) => {
  const role = localStorage.getItem('role'); // Récupérer le rôle de l'utilisateur depuis localStorage

  const handleClick = (event) => {
    if (role !== requiredRole) {
      // Afficher un message ou rediriger si le rôle n'est pas suffisant
      alert("Vous n'avez pas les permissions nécessaires pour effectuer cette action.");
    
    } else {
      onClick(event); // Exécuter la fonction onClick si le rôle est suffisant
    }
  };

  return (
    <button onClick={handleClick} className="text-red-500 cursor-pointer">
      {children}
    </button>
  );
};

export default ProtectedButton;
