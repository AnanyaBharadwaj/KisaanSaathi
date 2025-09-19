import React, { useState } from "react";
import FilterBar from "./FilterBar";
import ResultsTable from "./ResultsTable"; // Import the ResultsTable component

const FuturePricePrediction = () => {
  const [filters, setFilters] = useState({
    commodity: "",
    state: "",
    dateFrom: "",
    dateTo: "",
  });

  const [fetchedData, setFetchedData] = useState([]);

  // Function to handle filter changes (from FilterBar)
  const handleFilterChange = (newFilters) => {
    console.log("Filters updated:", newFilters);  
    setFilters(newFilters); // Update the filters
  };

  // Function to handle the search operation when the user clicks search
  const handleSearch = async () => {
    if (filters.commodity && filters.state && filters.dateFrom && filters.dateTo) {
      await fetchDataFromServer(filters);
    } else {
      console.error("Please fill all filter fields");
    }
  };

  // Function to fetch filtered data from the server
  const fetchDataFromServer = async (filters) => {
    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      setFetchedData(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Future Price Prediction</h1>
      
      {/* Pass the filter change and search functions as props */}
      <FilterBar onFilterChange={handleFilterChange} onSearch={handleSearch} />
      
      {/* Use ResultsTable to display the fetched data */}
      <ResultsTable data={fetchedData} />
    </div>
  );
};

export default FuturePricePrediction;
