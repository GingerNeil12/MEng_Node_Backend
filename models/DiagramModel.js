const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiagramSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    dataSet: {
        type: String,
        required: true
    },
    shapes: [
        {
            sid: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                required: true
            },
            color: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Diagram = mongoose.model('diagrams', DiagramSchema);