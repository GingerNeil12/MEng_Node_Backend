const mongose = require('mongoose');
const Schema = mongose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    bio: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongose.model('profile', ProfileSchema);