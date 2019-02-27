const express = require("express");
const passport = require('passport');
const Diagram = require('../../../models/DiagramModel');
const router = express.Router();

// @route   api/diagrams
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "DiagramTest All Routess"}) );

// @route   GET api/diagrams
// @desc    Gets all the diagrams for the logged in user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Diagram.find({user: req.user.id})
    .sort({date: -1})
    .then(result => res.json(result))
    .catch(err => res.status(404).json({error: 'No Diagrams Found'}));
});

// @route   POST api/diagrams
// @desc    Posts a new diagram to the MongoDb
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const diagramFields = {};

    if(req.body.name){
        diagramFields.name = req.body.name;
    } else {
        diagramFields.name = 'Untitled_' + Date.now;
    }

    diagramFields.user = req.user.id;

    diagramFields.dataSet = req.body.dataSet;

    diagramFields.shapes = req.body.shapes;

    new Diagram(diagramFields)
    .save()
    .then(result => res.json(result))
    .catch(err => res.json({err}));
});

// @route   GET api/diagrams/{id}
// @desc    Gets the diagram for the given id
// @access  Public
router.get('/{id}', (req, res) => {
    
})

module.exports = router;