// Requires
const express = require('express');
const router = express.Router();

// Routes
const userDiagrams = require('./userDiagrams');

// Set up the routes
router.use('/user', userDiagrams);


// @route   api/diagrams/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'DiagramRoutes test'}));

module.exports = router;
