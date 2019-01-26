// Main Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Route Requires
const userRoutes = require('./routes/api/user/userRoutes');


// Mongoose set up

// Setting up port and initialising the server
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});

// Setting up the body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport config

// Use Routes
app.use('api/users', userRoutes);

// Default test route
app.get('/test', (req, res) => res.json({msg: 'Test'}));