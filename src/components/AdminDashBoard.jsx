import React, { useState } from 'react';
import FilterBar from './FilterBar';
import ResultsTable from './ResultsTable'; // Import ResultsTable

function AdminDashboard() {
  const [filteredData, setFilteredData] = useState(null);

  return (
    <div>
      
      <h1>Filter and View Data</h1>
      <FilterBar setFilteredData={setFilteredData} />
      <ResultsTable filteredData={filteredData} />
    </div>
  );
};

// Styles for layout
const appStyle = {
  display: 'flex', // Arrange LeftNavbar and content side by side
};

const contentStyle = {
  flex: 1, // Take remaining space after LeftNavbar
  padding: '20px',
};

export default AdminDashboard;