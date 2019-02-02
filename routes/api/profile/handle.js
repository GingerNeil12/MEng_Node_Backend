// Requires
const express = require('express');
const router = express.Router();

// @route   api/profile/handle/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'ProfileRoutes Handle Test'}));

// @route   api/profile/handle/{handle}
// @desc    Gets user by their handle
// @access  Public
router.get('/:handle', (req, res) => {
    res.json({msg: 'Get By Handle'});
})

module.exports = router;