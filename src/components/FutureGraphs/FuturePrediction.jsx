import React, { useState, useEffect } from "react";
import FutureFilterBar from './FutureFilterBar';
import FutureResultsTable from './FutureResultsTable';
const FuturePrediction = ({ crop, centre, fromDate, toDate }) => {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch future predictions
  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ crop, centre, fromDate, toDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }

      const data = await response.json();
      setPredictionData(data.predictionData); // Set prediction data
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (crop && centre && fromDate && toDate) {
      fetchPredictions();
    }
  }, [crop, centre, fromDate, toDate]);

  if (loading) return <div>Loading predictions...</div>;

  if (!predictionData) return <div>No predictions available.</div>;

  return (
    <div>
      <h3>Future Predictions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Predicted Price</th>
          </tr>
        </thead>
        <tbody>
          {predictionData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.predicted_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuturePrediction;
