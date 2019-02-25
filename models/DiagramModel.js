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
            xCoOrd: {
                type: String,
                required: true
            },
            yCoOrd: {
                type: String,
                required: true
            },
            width: {
                type: String,
                required: true
            },
            color: {
                type: String,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Diagrams = mongoose.model('diagrams', DiagramSchema);