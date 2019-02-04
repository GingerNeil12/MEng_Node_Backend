const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validate(data) {
    const errors = {};

    // pull out the values and then boosh
    const handle = !isEmpty(data.handle) ? data.handle : '';
    const bio = !isEmpty(data.bio) ? data.bio : '';

    if(Validator.isEmpty(handle)){
        errors.handle = 'Handle is required';
    }
    if(!Validator.isLength(handle, {min: 5, max: 12})){
        errors.handle = 'Handle must be between 5 and 12 characters';
    }

    if(!Validator.isLength(bio, {min: 6, max: 1200})){
        errors.bio = 'Bio must be between 6 and 1200 characters';
    }

    return {
        errors,
        isValid: !isEmpty(errors)
    }
}