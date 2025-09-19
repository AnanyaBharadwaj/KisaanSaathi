import React, { useState } from "react";

// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ResultsTable = ({ filteredData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!filteredData || !filteredData.data) {
    return <p>No data available. Please apply filters.</p>;
  }

  const { Date, Centre_Name, Commodity_Name, Price } = filteredData.data;

  // Get row keys
  const rowKeys = Object.keys(Date);

  // Calculate total pages
  const totalPages = Math.ceil(rowKeys.length / rowsPerPage);

  // Get data for the current page
  const currentPageKeys = rowKeys.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Results Table</h2>
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Date</th>
              <th style={headerStyle}>Centre Name</th>
              <th style={headerStyle}>Commodity Name</th>
              <th style={headerStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentPageKeys.map((key, index) => (
              <tr
                key={key}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e0f7fa",
                }}
              >
                <td style={cellStyle}>{formatDate(Date[key])}</td>
                <td style={cellStyle}>{Centre_Name[key]}</td>
                <td style={cellStyle}>{Commodity_Name[key]}</td>
                <td style={cellStyle}>{Price[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
  fontFamily: "'Arial', sans-serif",
};

const headerStyle = {
  backgroundColor: "#0073e6", // Blue color for the header
  color: "#ffffff", // White text for contrast
  padding: "10px",
  textAlign: "left",
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

export default ResultsTable;
