// Requires
const express = require('express');
const router = express.Router();

// Routes
const current = require('./current');
const all = require('./all');
const handle = require('./handle');
const userId = require('./userId');

// Set up the routes
router.use('/current', current);
router.use('/all', all);
router.use('/handle', handle);
router.use('/user', userId);

// @route   api/profile/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'ProfileRoutes Test'}));

module.exports = router;