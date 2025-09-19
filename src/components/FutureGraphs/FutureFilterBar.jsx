import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // For the chart
import "../App.css";
import statesData from "../data/states.json";

const FilterBar = ({ setFilteredData }) => {
  const [formData, setFormData] = useState({
    commodity: "",
    state: "",
    dateFrom: "",
    dateTo: "",
  });

  const [states, setStates] = useState([]);
  const [commodityOptions, setCommodityOptions] = useState([]);
  const [centers, setCenters] = useState([]);
  const [graphData, setGraphData] = useState(null); // For the graph

  useEffect(() => {
    if (statesData && statesData.states) {
      setStates(statesData.states);
    } else {
      console.error("Invalid states.json structure");
    }
  }, []);

  useEffect(() => {
    const fetchCommodityData = async () => {
      try {
        const response = await fetch("/crop_names");
        if (!response.ok) {
          throw new Error("Failed to fetch commodity data");
        }
        const data = await response.json();
        setCommodityOptions(data.data || []);
      } catch (error) {
        console.error("Error fetching commodity data:", error);
      }
    };

    const fetchCentersData = async () => {
      try {
        const response = await fetch("/centre_names");
        if (!response.ok) {
          throw new Error("Failed to fetch center data");
        }
        const data = await response.json();
        setCenters(data.data || []);
      } catch (error) {
        console.error("Error fetching center data:", error);
      }
    };

    fetchCommodityData();
    fetchCentersData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiPayload = {
      crop: formData.commodity,
      centre: formData.state,
      from_date: formData.dateFrom ? `${formData.dateFrom}T00:00:00` : "",
      to_date: formData.dateTo ? `${formData.dateTo}T00:00:00` : "",
    };

    try {
      const response = await fetch("http://localhost:3000/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch filtered data");
      }

      const filteredData = await response.json();
      setFilteredData(filteredData);

      // Prepare data for the graph
      if (filteredData && filteredData.data) {
        const { Date: dates, Price: prices } = filteredData.data;

        const formattedDates = Object.values(dates).map((dateString) => {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        });

        const priceValues = Object.values(prices);

        setGraphData({
          labels: formattedDates,
          datasets: [
            {
              label: "Price vs Time",
              data: priceValues,
              borderColor: "teal",
              backgroundColor: "rgba(0, 128, 128, 0.2)",
              fill: true,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  return (
    <div className="filter-bar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="commodity">Commodity:</label>
        <select id="commodity" value={formData.commodity} onChange={handleChange}>
          <option value="">--Select--</option>
          {commodityOptions.map((commodity, index) => (
            <option key={index} value={commodity}>
              {commodity}
            </option>
          ))}
        </select>

        <label htmlFor="state">Centre Name:</label>
        <select id="state" value={formData.state} onChange={handleChange}>
          <option value="">--Select--</option>
          {centers.map((center, index) => (
            <option key={index} value={center}>
              {center}
            </option>
          ))}
        </select>

        <label htmlFor="dateFrom">Date From:</label>
        <input
          type="date"
          id="dateFrom"
          value={formData.dateFrom}
          onChange={handleChange}
        />

        <label htmlFor="dateTo">Date To:</label>
        <input
          type="date"
          id="dateTo"
          value={formData.dateTo}
          onChange={handleChange}
        />

        <button type="submit">Search</button>
      </form>

      {/* Render the graph if data is available */}
      {graphData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Price vs Time</h3>
          <Line data={graphData} />
        </div>
      )}
    </div>
  );
};

export default FilterBar;
