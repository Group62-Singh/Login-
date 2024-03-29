
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Placeholder data (in-memory)
let clientProfiles = [];

// Middleware for parsing JSON data
app.use(express.json());

// Define routes for serving HTML pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/profile.html');
});

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

app.get('/history', (req, res) => {
    res.sendFile(__dirname + '/history.html');
});

// Placeholder data (in-memory)
let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

let fuelQuotes = [];


// Login route with backend validation
app.post('/login', (req, res) => {
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


// Client profile management routes
app.get('/client/profiles', (req, res) => {
    res.json(clientProfiles);
});

// Client profile management route handler
app.post('/client/profiles', (req, res) => {
    // Extract profile data from the request body
    const { fullname, address1, address2, city, state, zipcode } = req.body;

    // Perform validation, save to database, etc.
    // For now, just send back a success response
    res.status(200).json({ message: 'Profile submitted successfully', profile: req.body });
});

// Placeholder function for client profile validation
function validateClientProfile(profileData) {
    let errors = [];

    // Validate required fields
    if (!profileData.full_name || typeof profileData.full_name !== 'string' || profileData.full_name.length > 50) {
        errors.push('Full name is required and must be a string with maximum length of 50 characters');
    }
    if (!profileData.address1 || typeof profileData.address1 !== 'string' || profileData.address1.length > 100) {
        errors.push('Address 1 is required and must be a string with maximum length of 100 characters');
    }
    if (!profileData.city || typeof profileData.city !== 'string' || profileData.city.length > 100) {
        errors.push('City is required and must be a string with maximum length of 100 characters');
    }
    if (!profileData.state || typeof profileData.state !== 'string' || profileData.state.length !== 2) {
        errors.push('State is required and must be a two-character string');
    }
    if (!profileData.zipcode || typeof profileData.zipcode !== 'string' || profileData.zipcode.length < 5 || profileData.zipcode.length > 9) {
        errors.push('Zipcode is required and must be a string with length between 5 and 9 characters');
    }

    return errors;
}


// Fuel quote module routes
app.get('/fuel/quotes', (req, res) => {
    res.json(fuelQuotes);
});

app.post('/fuel/quotes', (req, res) => {
    // Placeholder validation logic
    const quoteData = req.body;
    const validationErrors = validateFuelQuote(quoteData);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    fuelQuotes.push(quoteData);
    res.status(201).json({ message: 'Fuel quote created successfully' });
});

// Route to handle registration form submission
app.post('/register', (req, res) => {
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

// Placeholder function for client profile validation
function validateClientProfile(profileData) {
    // Implement validation logic
    // Validate required fields, field types, and field lengths
    let errors = [];
    // Example validation
    if (!profileData.full_name || typeof profileData.full_name !== 'string' || profileData.full_name.length > 50) {
        errors.push('Full name is required and must be a string with maximum length of 50 characters');
    }
    // Add more validations as needed
    return errors;
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
