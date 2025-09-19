import React, { useEffect } from "react";

const DataFetchingComponent = ({ filters, onDataFetched }) => {
  useEffect(() => {
    // Fetch data whenever filters change
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/crop_prices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: {
            "crop": "Rice",
            "center": "DELHI",
            "from_date": "2009-01-01T00:00:00",
            "to_date": "2009-01-01T00:00:00"
          },
          // body: JSON.stringify(filters),
        });
        const data = await response.json();
        console.log("Data fetched:", data);
        onDataFetched(data); // Pass the fetched data to parent component
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (filters.commodity && filters.state && filters.dateFrom && filters.dateTo) {
      fetchData();
    }
  }, [filters, onDataFetched]);

  return <></>; // This component does not render anything
};

export default DataFetchingComponent;
