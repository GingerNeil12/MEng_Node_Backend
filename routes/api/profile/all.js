// Requires
const express = require('express');
const Profile = require('../../../models/ProfileModel');
const router = express.Router();

// @route   api/profile/all/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'ProfileRoutes All Test' }));

// @route   api/profile/all
// @desc    Get all profiles 
// @access  Public
router.get('/', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'email', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.NoProfiles = 'No Profiles found';
                res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => {
            errors.NoProfiles = 'No Profiles found';
            console.log(err);
            res.status(404).json(errors);
        })
});

module.exports = router;