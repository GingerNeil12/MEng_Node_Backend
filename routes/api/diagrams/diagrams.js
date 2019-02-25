const express = require("express");
const passport = require('passport')
const router = express.Router();

// @route   api/diagrams
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "DiagramTest All Routess"}) );

// @route   api/diagrams
// @desc    Gets all the diagrams for the logged in user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get all the diagrams attached to the Users Id
});

// @route   api/diagrams/{id}
// @desc    Get a specific diagram with the Id
// @access  Private

module.exports = router;