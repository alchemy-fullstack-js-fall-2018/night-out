require('dotenv').config();
const inquirer = require('inquirer');
const request = require('superagent');

const rateEvening = [

];

const rating = {
    type: 'confirm',
    name: 'rating',
    message: 'Did you enjoy your night out?'
};

const handleRating = token => answers => {
    let rating = 'disliked';

    if(answers.rating) {
        rating = 'liked';
    }
    return request
        .put(`${process.env.HOST}/api/evenings/${answers.toRate._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ rating })
        .then(() => console.log('Thanks for rating your night out!'));
};

const handleRateEvening = token => {
    const question = {
        type: 'list',
        name: 'toRate',
        message: 'Which would you like to rate?',
        choices: []
    };

    return request
        .get(`${process.env.HOST}/api/evenings`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            question.choices = res.body.map(evening => {
                return {
                    name: evening.logs.map(log => log.name).join('  -->  '),
                    value: evening,
                    short: evening.logs.map(log => log.name).join('  -->  ')
                };  
            });
            return inquirer.prompt([question, rating]).then(handleRating(token));
        });
};


module.exports = {
    rateEvening,
    handleRateEvening
};
