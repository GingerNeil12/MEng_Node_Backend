// Requires
const express = require('express');
const router = express.Router();

// Routes
const userDiagrams = require('./userDiagrams');
const diagramId = require('./diagramId');

// Set up the routes
router.use('/user', userDiagrams);
router.use('/id', diagramId);

// @route   api/diagrams/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'DiagramRoutes test'}));

module.exports = router;
