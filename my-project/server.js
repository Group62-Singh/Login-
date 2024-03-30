// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const apiEndPoints = require('./apiEndPoints'); // Import the API endpoints

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Uses the API endpoints from imported file
app.use('/', apiEndPoints);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
