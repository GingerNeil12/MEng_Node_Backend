const express = require('express');
const router = express.Router();

// @route   api/users/current/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Current Test'}));

module.exports = router;