const express = require('express');
const passport = require('passport');
const Diagram = require('../../../models/DiagramModel');
const router = express.Router();

// @route   GET api/diagram/user
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'User Diagram Test Route' }));

// @route   GET api/diagram/user
// @desc    Gets current logged in users diagrams
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Diagram.find({ user: req.user.id })
        .sort({ date: -1 })
        .then(result => res.json(result))
        .catch(err => res.status(404).json({ msg: 'No Diagrams Found!' }))
});

// @route   POST api/diagram/user
// @desc    Adds a new diagram to the logged in users account
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Should Validate here but running out of time
    const diagramFieilds = {};
    var date = new Date();

    diagramFieilds.name = `Untitled_${date.getDate()}${date.getMonth()}${date.getFullYear()}_${date.getHours()}:${date.getMinutes()}`

    diagramFieilds.dataSet = req.body.dataSet;
    diagramFieilds.user = req.user.id;
    diagramFieilds.shapes = req.body.shapes;

    new Diagram(diagramFieilds)
        .save()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

// @route   PUT api/diagram/user
// @desc    Updates diagram to the logged in users account
// @access  Private
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Diagram.findOne({_id: req.params.id})
        .then(diagram => {
            if(!diagram){
                res.status(404).json({msg: 'No diagram found'})
            } else {
                diagram.name = req.body.name;
                diagram.shapes = req.body.shapes;
                diagram
                    .save()
                    .then(diagram => {
                        res.json(diagram)
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            }
        })
})

module.exports = router;