const inquirer = require('inquirer');
const { haveAccount, handleHaveAccount } = require('./lib/have-account');

inquirer.prompt(haveAccount).then(handleHaveAccount);

//do you want to rate an evening?
//-->list evenings
// -->select
//   -->rate
//    -->like
//     -->dislike
