const inquirer = require('inquirer');
const request = require('superagent');

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
        .then(console.log('hey bro u signed in'))
};

module.exports = {
    signIn,
    handleSignIn
};
