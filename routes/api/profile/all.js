// Requires
const express = require('express');
const router = express.Router();

// @route   api/profile/all/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'ProfileRoutes All Test'}));

// @route   api/profile/all
// @desc    Get all profiles 
// @access  Public
router.get('/', (req, res) => {
    res.json({msg: 'Get All Profiles'});
});

module.exports = router;