require('dotenv').config();
const inquirer = require('inquirer');
const request = require('superagent');
const { createEvening, handleCreateEvening } = require('./create-evening');
const { rateEvening, handleRateEvening } = require('./rate-evening');

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
    },
    {
        type: 'list',
        name: 'what',
        message: 'Do you want to create or rate an evening?',
        choices: ['rate', 'create']
    }
];

const handleSignIn = (answers) => {
    return request
        .post(`${process.env.HOST}/api/auth/signin`)
        .send(answers)
        .then(res => {
            const token = res.body.token;
            if(answers.what === 'create') {
                return inquirer.prompt(createEvening).then(handleCreateEvening(token));
            }
            else if(answers.what === 'rate') {
                return inquirer.prompt(rateEvening).then(handleRateEvening(token));
            }
        });
};

module.exports = {
    signIn,
    handleSignIn
};
