// const inquirer = require('inquirer');

require('dotenv').config();
const request = require('superagent');

const keywords = ['quiet', 'hip', 'elegant', 'family-friendly', 'pizza', 'japanese', 'chinese', 'gluten-free', 'vegan', 'thai', 'italian', 'burgers', 'coffee', 'cocktails', 'beer', 'sports', 'jazz', 'dancing', 'art', 'museum', 'intimate', 'lively'];

const createEvening = [
    {
        type: 'input',
        name: 'zipcode',
        message: 'Where do you want to go? Please enter a ZIP code:'
    },
    {   
        type: 'checkbox',
        name: 'keywords',
        message: 'Describe the kind of evening you\'d like to have:',
        choices: keywords
    }
];

const handleCreateEvening = token => answers => {
    request
        .post(`${process.env.HOST}/api/evenings`)
        .set('Authorization', `Bearer ${token}`)
        .send(answers)
        .then(res => {
            res.body.logs.forEach(log => {
                console.log('\n', log.name);
            });
        });
};

module.exports = {
    createEvening,
    handleCreateEvening
};
