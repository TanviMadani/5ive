const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test registration endpoint with detailed logging
app.post('/test-register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], (req, res) => {
  console.log('=== TEST REGISTRATION REQUEST ===');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Body type:', typeof req.body);
  console.log('Body keys:', Object.keys(req.body));
  console.log('Content-Type:', req.headers['content-type']);
  
  const errors = validationResult(req);
  console.log('Validation errors:', errors.array());
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array(),
      receivedData: req.body
    });
  }
  
  res.json({ 
    message: 'Validation passed',
    receivedData: req.body
  });
});

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Test the registration validation at: http://localhost:5001/test-register');
});
