const inquirer = require('inquirer');
const request = require('superagent');
const { createEvening, handleCreateEvening } = require('./create-evening');

const HOST = 'http://localhost:7980';

const signIn = [
    { 
        type: 'input',
        name: 'email',
        message: 'Please enter your email address.'
    },
    {
        type: 'password',
        name: 'clearPassword',
        message: 'Please enter your password.' 
    }
];

const handleSignIn = (answers) => {
    request
        .post(`${HOST}/api/auth/signin`)
        .send(answers)
        .then(res => {
            const token = res.body.token;
            return inquirer.prompt(createEvening).then(handleCreateEvening(token));
        });
};

module.exports = {
    signIn,
    handleSignIn
};
