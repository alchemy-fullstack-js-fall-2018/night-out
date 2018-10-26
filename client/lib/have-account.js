const inquirer = require('inquirer');
const { signIn, handleSignIn } = require('./sign-in');
const { signUp, handleSignUp } = require('./sign-up');

const haveAccount = [
    { 
        type: 'confirm',
        name: 'hasAccount',
        message: 'Do you have an account?' 
    }
];

const handleHaveAccount = answers => {
    if(answers.hasAccount) {
        return inquirer.prompt(signIn).then(handleSignIn);
    }
    else {
        return inquirer.prompt(signUp).then(handleSignUp);
    }
};

module.exports = {
    haveAccount,
    handleHaveAccount
};
