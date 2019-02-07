const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validate(data) {
    const errors = {};

    const name = !isEmpty(data.name) ? data.name : '';
    const email = !isEmpty(data.email) ? data.email : '';

    if (Validator.isEmpty(name)) {
        errors.name = 'Name is required';
    }
    if (!Validator.isLength(name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(email)){
        errors.email = 'Email is required';
    }
    if(!Validator.isEmail(email)){
        errors.email = 'Invalid email format';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}