// Requires
const express = require('express');
const Profile = require('../../../models/ProfileModel');
const router = express.Router();

// @route   api/profile/handle/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'ProfileRoutes Handle Test' }));

// @route   api/profile/handle/{handle}
// @desc    Gets user by their handle
// @access  Public
router.get('/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'email', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.NoProfile = 'No profile found';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
})

module.exports = router;