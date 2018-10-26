require('dotenv').config();
const inquirer = require('inquirer');
const request = require('superagent');

//get all evenings for one user
//user select one and rates it (like/ dislike)

const rateEvening = [

];

const handleRateEvening = () => {
    //list all evenings, ask user to rate one
    const question = {
        type: 'list',
        name: 'toRate',
        message: 'Which would you like to rate?',
        choices: []
    };
};


module.exports = {
    rateEvening,
    handleRateEvening
};
