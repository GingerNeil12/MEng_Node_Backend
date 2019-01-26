// Requires
const express = require('express');
const router = express.Router();

// @route   api/users/register/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Register Test'}));

// @route   api/users/register
// @desc    Registers a user. Validate as well
// @access  Public
router.post('/', (req, res) => {

});

module.exports = router;