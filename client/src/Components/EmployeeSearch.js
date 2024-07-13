import React, { useState } from 'react';
import axios from 'axios';

const EmployeeSearch = ({ setEmployees }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      setEmployees(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher par nom ou email"
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default EmployeeSearch;
