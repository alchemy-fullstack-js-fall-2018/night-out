require('dotenv').config();
const inquirer = require('inquirer');
const request = require('superagent');
const { signIn, handleSignIn } = require('./sign-in');

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
        message: 'Please select your preferences. Use the space bar to select and press Enter to confirm.',
        choices: ['quiet', 'elegant', 'hip', 'pizza', 'sushi'] 
    }
];

const handleSignUp = answers => {
    request
        .post(`${process.env.HOST}/api/auth/signup`)
        .send(answers)
        .then(() => {
            return inquirer.prompt(signIn).then(handleSignIn);
        });
};

module.exports = {
    signUp,
    handleSignUp
};
