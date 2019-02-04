// Requires
const express = require('express');
const passport = require('passport');
const Profile = require('../../../models/ProfileModel');
const validate = require('../../../validators/profile/currentPostValidator');
const router = express.Router();

// @route   api/profile/current/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'ProfileRoutes Current Test' }));

// @route   api/profile/current
// @desc    Gets the current logged in users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.NoProfile = 'No Profile found';
            res.status(404).json(errors);
        }
        res.json(errors);
    })
    .catch(err => {
        errors.NoProfile = 'No Profile found';
        console.log(err);
        res.status(404).json(errors);
    })
})


// @route   api/profile/current
// @desc    Set all the profile info
// @access  Public
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({msg: 'ProfileRoute Current Post'});
});
module.exports = router;