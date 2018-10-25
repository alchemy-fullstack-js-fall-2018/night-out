const inquirer = require('inquirer');

const signIn = [
    { 
        type: 'input',
        name: 'email',
        message: 'Please enter your email address.'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Please enter your password.' 
    }
];

const handleSignIn = answers => {
    console.log(answers);
};

module.exports = {
    signIn,
    handleSignIn
};
