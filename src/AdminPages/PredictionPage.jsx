import React from "react";
import LineChart from "../Graph_Prediction/LineChart";

// Import components
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PredictionFilter from "../Graph_Prediction/PredictionFilter";

function App() {
  return (
    <div style={appContainerStyle}>
      {/* Header */}
      <Header />
      
      
        
        {/* Right section for top navbar, filter, and charts */}
        <div style={rightSectionStyle}>
          {/* Top navbar */}
          <Navbar />
          
          {/* Prediction filter */}
          <PredictionFilter />
          
          {/* Grid of charts */}
          <div style={gridContainerStyle}>
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index} style={chartWrapperStyle}>
                <LineChart width={440} height={440} /> {/* Increased size */}
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
}

// Styling
const appContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  width: "100%",
  boxSizing: "border-box",
};



const rightSectionStyle = {
  flexGrow: 1,
  padding: "20px",
  marginLeft: "20px", // Space between left navbar and the graph section
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // Two graphs per row
  gap: "40px", // Increased spacing between rows and columns
  padding: "10px",
  maxWidth: "100%",
  margin: "0 auto",
  justifyItems: "center", // Center each graph horizontally
};

const chartWrapperStyle = {
  width: "100%", // Match the width of the chart
  height: "440px", // Match the height of the chart
  border: "1px solid #ddd",
  borderRadius: "6px",
  backgroundColor: "#f9f9f9",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};


export default App;
