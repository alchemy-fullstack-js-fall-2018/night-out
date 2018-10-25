// const inquirer = require('inquirer');
const request = require('superagent');

const HOST = 'http://localhost:7980';
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

const handleCreateEvening = answers => {
    request
        .post(`${HOST}/api/evenings`)
        .send(answers)
        .then(console.log(answers));
};

module.exports = {
    createEvening,
    handleCreateEvening
};
