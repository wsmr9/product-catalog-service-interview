const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

// Error handling utilities
const { 
    logErrors, 
    errorHandler, 
    boomErrorHandler, 
    ormErrorHandler 
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

// Enable Express to parse JSON bodies in requests
app.use(express.json());

// Define a whitelist of domains that can access the API
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the request origin is in the whitelist or not present (server-to-server requests)
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Apply CORS settings based on whitelist
app.use(cors(corsOptions));

// Basic route for a health check or welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Initialize API routes
routerApi(app);

// Register middleware for error handling
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
