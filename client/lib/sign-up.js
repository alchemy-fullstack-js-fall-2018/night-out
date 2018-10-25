const inquirer = require('inquirer');
const request = require('superagent');
const { signIn, handleSignIn } = require('./sign-in');

const HOST = 'http://localhost:7980';

const signUp = [
    { 
        type: 'input',
        name: 'name',
        message: 'Please enter your name.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address.'
    },
    {
        type: 'password',
        name: 'clearPassword',
        message: 'Please enter your password.' 
    },
    {
        type: 'input',
        name: 'zipcode',
        message: 'Please enter your zip code.'
    },
    {
        type: 'checkbox',
        name: 'keywords',
        message: 'Please select your preferences.',
        choices: ['quiet', 'elegant', 'hip', 'pizza', 'sushi'] 
    }
];

const handleSignUp = answers => {
    request
        .post(`${HOST}/api/auth/signup`)
        .send(answers)
        .then(() => {
            return inquirer.prompt(signIn).then(handleSignIn);
        });
};

module.exports = {
    signUp,
    handleSignUp
};
