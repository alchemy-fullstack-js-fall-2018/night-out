require('dotenv').config();
const inquirer = require('inquirer');
const request = require('superagent');

//get all evenings for one user
//user select one and rates it (like/ dislike)

const rateEvening = [

];

const handleRateEvening = token => {
    //list all evenings, ask user to rate one
    const question = {
        type: 'list',
        name: 'toRate',
        message: 'Which would you like to rate?',
        choices: []
    };

    request
        .get(`${process.env.HOST}/api/evenings`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            console.log(res.text);
            // evenings.forEach(evening => {
            //     question.choices.push(evening);
            // });
        });

};


module.exports = {
    rateEvening,
    handleRateEvening
};
