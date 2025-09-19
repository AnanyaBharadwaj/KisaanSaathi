import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      // Extract labels and datasets dynamically from filtered data
      const labels = data.map((item) => item.Month || "Unknown Month");
      const datasetKeys = Object.keys(data[0]).filter(
        (key) => key !== "Month" && key !== "Date"
      );

      const datasets = datasetKeys.map((key, index) => ({
        label: key,
        data: data.map((item) => item[key]),
        borderColor: `rgba(${(index + 1) * 50}, ${index * 60}, ${(index + 2) * 80}, 1)`,
        backgroundColor: `rgba(${(index + 1) * 50}, ${index * 60}, ${(index + 2) * 80}, 0.2)`,
        tension: 0.4,
      }));

      setChartData({
        labels,
        datasets,
      });
    } else {
      setChartData(null); // Ensure no stale data is retained
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Filtered Data Trends",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
      x: {
        title: {
          display: true,
          text: "Labels",
        },
      },
    },
  };

  return (
    <div style={lineChartContainerStyle}>
      {chartData ? <Line data={chartData} options={options} /> : <p>No data to display</p>}
    </div>
  );
};

const App = () => {
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div style={appContainerStyle}>
      <h1 style={mainHeaderStyle}>Filtered Results</h1>
      <LineChart data={filteredData} />
    </div>
  );
};

// Styles
const lineChartContainerStyle = {
  width: "80%",
  height: "400px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const appContainerStyle = {
  padding: "40px",
  backgroundColor: "#eef2f3",
  minHeight: "100vh",
};

const mainHeaderStyle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "#0073aa",
};

export default App;
