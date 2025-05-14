const validate = require('validate.js');

const userConstraints = {
    name: {
        presence: { allowEmpty: false },
        length: { minimum: 2, maximum: 50 },
    },
    email: {
        presence: true,
        email: true,
    },
    password: {
        presence: true,
        length: { minimum: 6 },
    },
};

const validateUser = (userData) => {
    return validate(userData, userConstraints);
};

module.exports = { validateUser };
