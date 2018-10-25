const inquirer = require('inquirer');
const request = require('superagent');

const email = {
    type: 'input',
    name: 'email',
    message: 'Please enter your email address.'
};

const password = {
    type: 'password',
    name: 'password',
    message: 'Please enter your password.'
};

