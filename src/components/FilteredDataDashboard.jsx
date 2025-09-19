import React, { useState } from "react";
import FilterBar from "./FilterBar";
import ResultsTable from "./ResultsTable";

const FilteredDataDashboard = () => {
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div className="filtered-data-dashboard">
      <h1>Filter and View Data</h1>
      {/* Filter Bar Component */}
      <FilterBar setFilteredData={setFilteredData} />
      
      {/* Results Table Component */}
      <div style={{ marginTop: "20px" }}>
        <ResultsTable data={filteredData} />
      </div>
    </div>
  );
};

export default FilteredDataDashboard;
