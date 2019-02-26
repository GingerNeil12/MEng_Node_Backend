const mongoose = require('mongoose');
const schema = mongoose.schema;

const DiagramSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
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
            shape: {
                id: {
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
                    type: String,
                    default: '#ffffff'
                }
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Diagrams = mongoose.model('diagrams', DiagramSchema);