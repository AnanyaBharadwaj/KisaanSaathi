import React, { useState } from "react";
import "../App.css"; // Ensure the CSS file is linked

const FilterBar = () => { 
  const [formData, setFormData] = useState({
    priceArrival: "Price",
    commodity: "",
    state: "",
    district: "",
    market: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add your form submission logic here
  };

  return (
    <div className="filter-bar"> {/* Apply filter-bar class here */}
      <form onSubmit={handleSubmit}>


        <label htmlFor="commodity">Commodity:</label>
        <select id="commodity" value={formData.commodity} onChange={handleChange}>
          <option value="">--Select--</option>
          {/* Add options dynamically if required */}
        </select>

        <label htmlFor="state">State:</label>
        <select id="state" value={formData.state} onChange={handleChange}>
          <option value="">--Select--</option>
          {/* Add state options dynamically */}
        </select>

        <label htmlFor="district">District:</label>
        <select id="district" value={formData.district} onChange={handleChange}>
          <option value="">--Select--</option>
          {/* Add district options dynamically */}
        </select>

        <label htmlFor="market">Market:</label>
        <select id="market" value={formData.market} onChange={handleChange}>
          <option value="">--Select--</option>
          <option value="Market 1">Market 1</option>
          <option value="Market 2">Market 2</option>
        </select>

        <label htmlFor="priceArrival">Price/Arrivals:</label>
        <select id="priceArrival" value={formData.priceArrival} onChange={handleChange}>
          <option value="Price">Price</option>
          <option value="Arrivals">Arrivals</option>
        </select>

        <label htmlFor="dateFrom">Date From:</label>
        <input type="date" id="dateFrom" value={formData.dateFrom} onChange={handleChange} />

        <label htmlFor="dateTo">Date To:</label>
        <input type="date" id="dateTo" value={formData.dateTo} onChange={handleChange} />

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterBar;
