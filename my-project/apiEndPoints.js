const express = require('express');
const router = express.Router();

// Placeholder data (in-memory)
let fuelQuotes = [];
let fuelQuoteHistory = [];
let clientProfiles = [];
let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Fuel quote module routes
router.get('/fuel/quotes', (req, res) => {
    res.json(fuelQuotes);
});

router.post('/fuel/quotes', (req, res) => {
    // Placeholder validation logic
    const quoteData = req.body;
    const validationErrors = validateFuelQuote(quoteData);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    fuelQuotes.push(quoteData);
    res.status(201).json({ message: 'Fuel quote created successfully' });
});

// Route to fetch fuel quote history
router.get('/fuel/quotes/history', (req, res) => {
    // Will replace fuelQuoteHistory with database query 
    res.json(fuelQuoteHistory);
});

// Client profile management routes
router.get('/client/profiles', (req, res) => {
    res.json(clientProfiles);
});

router.post('/client/profiles', (req, res) => {
    // Extract profile data from the request body
    const { fullname, address1, address2, city, state, zipcode } = req.body;

    // Perform validation, save to database, etc.
    // For now, just send back a success response
    res.status(200).json({ message: 'Profile submitted successfully', profile: req.body });
});

// Login route with backend validation
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate username
    if (!username || typeof username !== 'string' || username.length > 20) {
        return res.status(400).json({ error: 'Invalid username' });
    }

    // Validate password
    if (!password || typeof password !== 'string' || password.length < 5) {
        return res.status(400).json({ error: 'Password must be at least 5 characters long' });
    } else if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one capital letter' });
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one special character' });
    }

    // Placeholder authentication logic
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Placeholder token generation (for future use)
    const token = generateAuthToken(user);

    res.json({ token });
});

// Route to handle registration form submission
router.post('/register', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // Validate username
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Username is required' });
    }

    // Validate password
    if (!password || typeof password !== 'string' || password.length < 5) {
        return res.status(400).json({ error: 'Password must be at least 5 characters long' });
    }

    // Validate confirmPassword
    if (!confirmPassword || confirmPassword !== password) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    // Add new user to the list
    const newUser = { username, password };
    users.push(newUser);

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Placeholder function for generating authentication token
function generateAuthToken(user) {
    return 'placeholder-token';
}

// Placeholder function for fuel quote validation
function validateFuelQuote(quoteData) {
    // Implement validation logic
    // Validate required fields, field types, and field lengths
    let errors = [];
    // Example validation
    if (!quoteData.gallons_requested || typeof quoteData.gallons_requested !== 'number' || quoteData.gallons_requested <= 0) {
        errors.push('Gallons requested is required and must be a positive number');
    }
    // Add more validations as needed
    return errors;
}

module.exports = router;
