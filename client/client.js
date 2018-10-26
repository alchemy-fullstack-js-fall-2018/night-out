const inquirer = require('inquirer');
const { haveAccount, handleHaveAccount } = require('./lib/have-account');

inquirer.prompt(haveAccount).then(handleHaveAccount);

