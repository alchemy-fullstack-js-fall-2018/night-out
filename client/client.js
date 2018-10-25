const inquirer = require('inquirer');
const { haveAccount, handleHaveAccount } = require('./lib/have-account');

inquirer.prompt(haveAccount).then(handleHaveAccount);


//no: (sign up)

//after logged in
//should i create an evening? 
//--> create evening and price
//do you want to rate an evening?
//-->list evenings
// -->select
//   -->rate
//    -->like
//     -->dislike
