// Requires
const express = require('express');
const router = express.Router();

// Routes
const hande = require('./handle');
const userId = require('./userId');
const all = require('./all');

// Set up the routes
router.use('/handle', handle);
router.use('/user', userId);
router.use('/all', all);

// @route   api/profile/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'ProfileRoutes Test'}));

module.exports = router;