// Requires
const express = require('express');
const router = express.Router();

// @route   api/profile/user/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'ProfileRoutes User Test'}));

// @route   api/profile/user/{id}
// @desc    Gets a user by their id
// @access  Public
router.get('/:id', (req, res) => {
    res.json({msg: 'Get By Id'});
});

module.exports = router;