// Requires
const express = require('express');
const router = express.Router();

// Routes
const register = require('./register');
const login = require('./login');

// Set up the routes
router.use('/register', register);
router.use('/login', login);

// @route   api/users/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'UserRoutes Test'}))

module.exports = router;