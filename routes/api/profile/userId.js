// Requires
const express = require('express');
const Profile = require('../../../models/ProfileModel');
const router = express.Router();

// @route   api/profile/user/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'ProfileRoutes User Test' }));

// @route   api/profile/user/{id}
// @desc    Gets a user by their id
// @access  Public
router.get('/:id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.id })
        .populate('user', ['name', 'email', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.NoProfile = 'No Profile Found';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
});

module.exports = router;