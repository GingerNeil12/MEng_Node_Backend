const Validator = require('validator');
const isEmpty = require('../is-empty');

// TODO: Add regex for a password comparison.
module.exports = function validate(data){
    const errors = {};

    const password = !isEmpty(data.password) ? data.password : '';
    const password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(Validator.isEmpty(password)){
        errors.password = 'Password is required';
    }
    if(!Validator.isLength(password, {min: 6, max: 20})){
        errors.password = 'Password must be between 6 and 20 characters';
    }

    if(!Validator.equals(password, password2)){
        errors.password = 'Passwords do not match'
    }
    
    return  {
        errors,
        isValid: isEmpty(errors)
    }
}