const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateInput(data) {
    const errors = {};

    const email = !isEmpty(data.email) ? data.email : '';
    const password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(email)){
        errors.email = 'Email is required';
    }
    if(!Validator.isEmail(email)){
        errors.email = 'Invalid email format';
    }

    if(Validator.isEmpty(password)){
        errors.password = 'Password is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}