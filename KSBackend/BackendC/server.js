// Express.js API server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000; // Port for Express.js server
const FLASK_API_URL = "http://127.0.0.1:8000/crop_prices"; // Correct Flask API for data
const FLASK_FILTER_URL = "http://127.0.0.1:8000/crop_prices"; // Correct Flask API for filter

// Middleware
app.use(cors()); // Enable CORS for React or other frontends
app.use(bodyParser.json()); // Parse JSON bodies

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// API route to fetch all data from Flask
app.get("/api/data", async (req, res) => {
  try {
    console.log("Fetching data from Flask API...");
    const response = await axios.get(FLASK_API_URL); // Fetch data from Flask
    const data = response.data;
    res.json(data); // Send data to frontend
  } catch (error) {
    console.error("Error fetching data from Flask API:", error.message);
    res.status(500).json({ error: "Error fetching data from Flask API" });
  }
});

// API route to filter data via Flask
app.post("/api/filter", async (req, res) => {
  try {
    const filterCriteria = req.body; // Get filter criteria from the request body

    // Print the received data
    console.log(
      "Received filter criteria from frontend:",
      JSON.stringify(filterCriteria, null, 2)
    );

    // Send filter criteria to Flask backend
    const flaskResponse = await axios.post(FLASK_FILTER_URL, filterCriteria, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const filteredData = flaskResponse.data; // Flask's response
    console.log("Filtered data received from Flask:", filteredData);
    res.json(filteredData); // Send filtered data to frontend
  } catch (error) {
    if (error.response) {
      console.error("Flask returned an error:", error.response.data);
      res.status(error.response.status).json({
        error: error.response.data.error || "Error from Flask API",
      });
    } else if (error.request) {
      console.error("No response from Flask API:", error.message);
      res.status(500).json({ error: "No response from Flask API" });
    } else {
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const axios = require("axios");

// const app = express();
// const PORT = 3000; // Port for Express.js server
// const FLASK_API_URL = "http://127.0.0.1:8000/crop_prices"; // Correct Flask API for data (Port 5000)
// const FLASK_FILTER_URL = "http://127.0.0.1:8000/crop_prices"; // Correct Flask API for filter

// // Middleware
// app.use(cors()); // Enable CORS for React or other frontends
// app.use(bodyParser.json()); // Parse JSON bodies

// // Root route handler
// app.get("/", (req, res) => {
//   res.send("Welcome to the Express server!");
// });

// // API route to fetch all data from Flask
// app.get("/api/data", async (req, res) => {
//   try {
//     console.log("Fetching data from Flask API...");
//     const response = await axios.get(FLASK_API_URL); // Fetch data from Flask
//     const data = response.data;
//     res.json(data); // Send data to frontend
//   } catch (error) {
//     console.error("Error fetching data from Flask API:", error.message);
//     res.status(500).json({ error: "Error fetching data from Flask API" });
//   }
// });

// // API route to filter data via Flask
// app.post("/api/filter", async (req, res) => {
//   try {
//     const filterCriteria = req.body; // Get filter criteria from the request body

//     console.log("Sending filter criteria to Flask:", filterCriteria);

//     // Send filter criteria to Flask backend
//     const flaskResponse = await axios.post(FLASK_FILTER_URL, filterCriteria, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const filteredData = flaskResponse.data; // Flask's response
//     console.log("Filtered data received from Flask:", filteredData);
//     res.json(filteredData); // Send filtered data to frontend
//   } catch (error) {
//     // More detailed error handling
//     if (error.response) {
//       // Errors from Flask (e.g., 404, 500)
//       console.error("Flask returned an error:", error.response.data);
//       res.status(error.response.status).json({
//         error: error.response.data.error || "Error from Flask API",
//       });
//     } else if (error.request) {
//       // Errors during the request (e.g., network issues)
//       console.error("No response from Flask APIIIIIIII:", error.message);
//       res.status(500).json({ error: "No response from Flask API" });
//     } else {
//       // Other unexpected errors
//       console.error("Unexpected error:", error.message);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// });

// // Start Express server
// app.listen(PORT, () => {
//   console.log(`Express server is running on http://localhost:${PORT}`);
// });
