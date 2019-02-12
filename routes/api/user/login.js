// Requires and set up Router
const express = require('express');
const User = require('../../../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretOrKey = require('../../../config/keys').secretOrKey;
const validator = require('../../../validators/user/loginValidator');

const router = express.Router();

// @route   api/users/login/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Login Test' }));

// @route   api/users/login
// @desc    Logs user in to system and issues a web token as Authentication
// @access  Public
router.post('/', (req, res) => {
    const { errors, isValid } = validator(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                errors.email = 'Incorrect email or password';
                return res.status(404).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        errors.email = 'Incorrect email or password';
                        res.status(404).json(errors);
                    } else {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar
                        };

                        // Left a default of no expiration on the JWT just now for dev purposes
                        jwt.sign(
                            payload,
                            secretOrKey,
                            (err, token) => {
                                if (err) {
                                    errors.token = 'Error creating token';
                                    res.status(500).json(errors);
                                } else {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                                }
                            }
                        )
                    }
                })
        })
});

module.exports = router;