// Requires
const express = require('express');
const User = require('../../../models/UserModel');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const validator = require('../../../validators/user/registerValidator');

const router = express.Router();

// @route   api/users/register/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Register Test' }));

// @route   api/users/register
// @desc    Registers a user. Validate as well
// @access  Public
router.post('/', (req, res) => {
    const { errors, isValid } = validator(req.body);
    if (isValid == false) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already in use';
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json({
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                avatar: user.avatar
                            }))
                            .catch(err => console.log(err));
                    })
                });
            }
        })
});

module.exports = router;