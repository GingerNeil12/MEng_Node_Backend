// Requires
const express = require('express');
const router = express.Router();

// Routes
const register = require('./register');

// Set up the routes
router.use('/register', register);

// @route   api/users/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'UserRoutes Test'}))

module.exports = router;