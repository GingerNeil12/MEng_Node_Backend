// Requires
const express = require('express');
const passport = require('passport');
const router = express.Router();

// @route   api/profile/current/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'ProfileRoutes Current Test' }));

// @route   api/profile/current
// @desc    Gets the current logged in users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ msg: 'Current users profile' });
})

module.exports = router;