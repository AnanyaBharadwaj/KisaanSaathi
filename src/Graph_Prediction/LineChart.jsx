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

const LineChart = ({ width, height }) => {
  const [chartData, setChartData] = useState(null); // Holds the chart data
  const [isLoading, setIsLoading] = useState(true); // Indicates loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the Express backend
        const response = await fetch("http://localhost:3000/api/prices");

        // If the response is not OK, throw an error
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse the response as JSON
        const data = await response.json();
        console.log(data); // Log the data to inspect the structure

        // Extracting and organizing data for the chart
        const labels = data.map((item) => item.time); // Assuming 'time' is a key in the dataset
        const priceData = data.map((item) => item.price); // Assuming 'price' is a key in the dataset

        // Set the chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Price",
              data: priceData,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.4,
            },
          ],
        });

        setIsLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Stop loading if there's an error
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array means this runs once when the component mounts

  // Chart options
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
        text: "Time vs Price",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      {isLoading ? (
        <p>Loading chart...</p>
      ) : chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No data available to display the chart.</p>
      )}
    </div>
  );
};

export default LineChart;
