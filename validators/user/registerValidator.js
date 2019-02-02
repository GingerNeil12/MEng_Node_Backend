const Validator = require('validator');
const isEmpty = require('../is-empty');

// Data being passed in is the http request
// TODO: Add regex for name and password comparison
module.exports = function validateInput(data) {
    const errors = {};

    const name = !isEmpty(data.name) ? data.name : '';
    const email = !isEmpty(data.email) ? data.email : '';
    const password = !isEmpty(data.password) ? data.password : '';
    const password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (Validator.isEmpty(name)) {
        errors.name = 'Name is a required field';
    }
    if (!Validator.isLength(name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(email)) {
        errors.email = 'Email is required';
    }
    if (!Validator.isEmail(email)) {
        errors.email = 'Invalid email format';
    }

    if (Validator.isEmpty(password)) {
        errors.password = 'Password is required';
    }
    if (!Validator.isLength(password, { min: 6, max: 20 })) {
        errors.password = 'Password must be between 6 and 20 characters';
    }

    if (!Validator.equals(password, password2)) {
        errors.password = 'Passwords do not match';
    }

    return {
        errors,
        isValid: !isEmpty(errors)
    }
}