// Requires and router set up
const express = require("express");
const passport = require("passport");
const gravatar = require("gravatar");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../../../models/UserModel");
const secretOrKey = require('../../../config/keys').secretOrKey;
const validatePutRequest = require("../../../validators/user/currentPutValidator");
const validatePutPassword = require("../../../validators/user/passwordPutValidator");

const router = express.Router();

// @route   api/users/current/test
// @desc    Default test route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Current Test" }));

// @route   api/users/current
// @desc    Gets the current users details
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    };

    res.json(user);
}
);

// @route   api/users/current/{id}
// @desc    Allows user to update info other than password
// @access  Private
router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!isValidUser(req.user, req.params.id)) {
        return res.status(401).json({ user: "Unauthorised" });
    }

    const { errors, isValid } = validatePutRequest(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                errors.user = "No user found";
                res.status(400).json(errors);
            } else {
                user.name = req.body.name;
                user.email = req.body.email;
                const avatar = gravatar.url(req.body.email, {
                    s: "200",
                    r: "pg",
                    d: "mm"
                });
                user.avatar = avatar;
                user
                    .save()
                    .then(user => {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar
                        };

                        jwt.sign(payload, secretOrKey, (err, token) => {
                            if (err) {
                                errors.token = 'Error issuing token';
                                console.log(err);
                                res.status(500).json(errors);
                            } else {
                                res.json({
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    avatar: user.avatar,
                                    success: true,
                                    token: 'Bearer ' + token,
                                });
                            }
                        });
                    })
                    .catch(err => {
                        errors.generic = "Error with Database. Contact your administrator";
                        console.log(err);
                        res.status(500).json(errors);
                    });
            }
        })
        .catch(err => {
            errors.generic = "Error with Database. Contact your administrator";
            console.log(err);
            res.status(500).json(errors);
        });
}
);

// @route   api/users/password/{id}
// @desc    Allows user to update their password
// @access  Private
router.put("/password/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!isValidUser(req.user, req.params.id)) {
        return res.status(401).json({ user: "Unauthorised" });
    }

    const { errors, isValid } = validatePutPassword(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    }

    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                errors.user = 'No user found';
                res.status(404).json(errors);
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        errors.generic = 'Error with Database. Contact your admistrator';
                        console.log(err);
                        res.status(500).json(errors);
                    } else {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) {
                                errors.generic = 'Error with Database. Contact your admistrator';
                                console.log(err);
                                res.status(500).json(errors);
                            } else {
                                user.password = hash;
                                user
                                    .save()
                                    .then(user => {
                                        res.json({
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            avatar: user.avatar,
                                            success: true
                                        });
                                    })
                                    .catch(err => {
                                        errors.generic = 'Error with Database. Contact your admistrator';
                                        console.log(err);
                                        res.status(500).json(errors);
                                    })
                            }
                        })
                    }
                })
            }
        })
        .catch(err => {
            errors.generic = 'Error with Database. Contact your adminstrator';
            console.log(err);
            res.status(500).json(errors);
        })
}
);

// Checks to see if it is the logged in user preforming the update
isValidUser = (user, id) => {
    if (user.id === id) {
        return true;
    }
    return false;
};

module.exports = router;
