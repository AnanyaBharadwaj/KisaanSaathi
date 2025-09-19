import React, { useState, useEffect } from "react";
import "../App.css";
import statesData from "../data/states.json";

const FilterBar = ({ setFilteredData }) => {
  const [formData, setFormData] = useState({
    commodity: "",
    state: "", // This will be used for both state and center
    dateFrom: "",
    dateTo: "",
  });

  const [states, setStates] = useState([]);
  const [commodityOptions, setCommodityOptions] = useState([]);
  const [centers, setCenters] = useState([]); // State to store center data

  useEffect(() => {
    console.log("States Data from JSON:", statesData);
    if (statesData && statesData.states) {
      setStates(statesData.states);
    } else {
      console.error("Invalid states.json structure");
    }
  }, []);

  useEffect(() => {
    // Fetch commodity data
    const fetchCommodityData = async () => {
      try {
        const response = await fetch("/crop_names"); // Endpoint to get commodity data
        if (!response.ok) {
          throw new Error("Failed to fetch commodity data");
        }
        const data = await response.json();
        console.log("Commodity Data:", data.data);
        setCommodityOptions(data.data || []); // Set commodity options if available
      } catch (error) {
        console.error("Error fetching commodity data:", error);
      }
    };

    // Fetch center data
    const fetchCentersData = async () => {
      try {
        const response = await fetch("/centre_names"); // Endpoint to get center data
        if (!response.ok) {
          throw new Error("Failed to fetch center data");
        }
        const data = await response.json();
        console.log("Center Data:", data.data);
        setCenters(data.data || []); // Set center options if available
      } catch (error) {
        console.error("Error fetching center data:", error);
      }
    };

    fetchCommodityData();
    fetchCentersData(); // Fetch centers when component mounts
  }, []); // This effect runs once when the component mounts

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
      centre_name: formData.state, // Use centre_name for center selection
      from_date: formData.dateFrom ? `${formData.dateFrom}T00:00:00` : "",
      to_date: formData.dateTo ? `${formData.dateTo}T00:00:00` : "",
    };

    console.log("Form Data Submitted:", apiPayload);

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
      console.log("Filtered Data:", filteredData.data);
      setFilteredData(filteredData);
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
          {commodityOptions.length > 0 ? (
            commodityOptions.map((commodity, index) => (
              <option key={index} value={commodity}>
                {commodity}
              </option>
            ))
          ) : (
            <option>Loading commodities...</option>
          )}
        </select>

        <label htmlFor="state">Centre Name:</label>
        <select id="state" value={formData.state} onChange={handleChange}>
          <option value="">--Select--</option>
          {centers.length > 0 ? (
            centers.map((center, index) => (
              <option key={index} value={center}>
                {center}
              </option>
            ))
          ) : (
            <option>Loading centres...</option>
          )}
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
    </div>
  );
};

export default FilterBar;