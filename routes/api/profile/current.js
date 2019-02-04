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
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'email', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.NoProfile = 'No Profile found';
                res.status(404).json(errors);
            }
            res.json(profile);
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
    const { errors, isValid } = validate(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) {
        profileFields.handle = req.body.handle;
    }
    if (req.body.bio) {
        profileFields.bio = req.body.bio;
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then(profile => {
                        return res.json(profile);
                    })
            } else {
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'That handle already exists';
                            return res.status(400).json(errors);
                        } else {
                            new Profile(profileFields)
                            .save()
                            .then(profile => res.json(profile))
                            .catch(err => {
                                errors.generic = 'Error saving to Database. Try again later';
                                console.log(err);
                                res.status(500).json(errors);
                            })
                        }
                    })
            }
        })
});
module.exports = router;