const request = require('supertest');
const express = require('express');
const app = express();
const router = require('./apiEndPoints'); 


app.use('/', router);

// Test case for GET request to /fuel/quotes
test('GET /fuel/quotes should return empty array', async () => {
  const response = await request(app).get('/fuel/quotes');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

// Test case for POST request to /fuel/quotes
test('POST /fuel/quotes should add a new fuel quote', async () => {
  const newQuote = { gallons_requested: 100, price_per_gallon: 2.50 };
  const response = await request(app)
    .post('/fuel/quotes')
    .send(newQuote);
  expect(response.statusCode).toBe(201);
  expect(response.body.message).toBe('Fuel quote created successfully');
});

// Test case for GET request to /fuel/quotes/history
test('GET /fuel/quotes/history should return empty array', async () => {
  const response = await request(app).get('/fuel/quotes/history');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

// Test case for GET request to /client/profiles
test('GET /client/profiles should return empty array', async () => {
  const response = await request(app).get('/client/profiles');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

// Test case for POST request to /client/profiles
test('POST /client/profiles should add a new client profile', async () => {
  const newProfile = { fullname: 'John Doe', address1: '123 Main St', city: 'City', state: 'CA', zipcode: '12345' };
  const response = await request(app)
    .post('/client/profiles')
    .send(newProfile);
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Profile submitted successfully');
});

// Test case for POST request to /login
test('POST /login should authenticate user and return token', async () => {
  const credentials = { username: 'user1', password: 'password1' };
  const response = await request(app)
    .post('/login')
    .send(credentials);
  expect(response.statusCode).toBe(200);
  expect(response.body.token).toBeTruthy();
});

// Test case for POST request to /register
test('POST /register should register a new user', async () => {
  const newUser = { username: 'newuser', password: 'newpassword', confirmPassword: 'newpassword' };
  const response = await request(app)
    .post('/register')
    .send(newUser);
  expect(response.statusCode).toBe(201);
  expect(response.body.message).toBe('User registered successfully');
});


app.listen(3000, () => {
  console.log('Test server running on port 3000');
});
