const express = require('express');
const Diagram = require('../../../models/DiagramModel');
const router = express.Router();

// @route   GET api/diagram/id/test
// @desc    Default test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'DiagramId Test'}));

// @route   GET api/diagram/id/{id}
// @desc    Gets the diagram for the id provided
// @access  Public
router.get('/:id', (req, res) => {
    Diagram.findOne({ _id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.status(404).json(err));
})

module.exports = router;