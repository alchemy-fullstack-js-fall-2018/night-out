require('dotenv').config();
require('../../lib/util/connect')();
const { dropCollection } = require('../util/db');
const request = require('supertest');
const app = require('../../lib/app');
// const { Types } = require('mongoose');

beforeEach(() => {
    return dropCollection('users');
});
beforeEach(() => {
    return dropCollection('logs');
});
beforeEach(() => {
    return dropCollection('evenings');
});

let createdUsers;
// let createdEvenings;
// let createdLogs;

let users = [
    {
        name: 'User1',
        email: 'user1@user1.com',
        zipcode: '97202',
        initialPreferences: ['pref1', 'pref2', 'pref3', 'pref4', 'pref5', 'pref6', 'pref7', 'pref8', 'pref9']
    },
    {
        name: 'User2',
        email: 'user2@user2.com',
        zipcode: '94061',
        initialPreferences: ['pref1', 'pref2', 'pref3', 'pref4', 'pref5', 'pref6', 'pref7', 'pref8', 'pref9']
    },
    {
        name: 'User3',
        email: 'user3@user3.com',
        zipcode: '97214',
        initialPreferences: ['pref1', 'pref2', 'pref3', 'pref4', 'pref5', 'pref6', 'pref7', 'pref8', 'pref9']
    }
];

// let logs = [
//     {
//         place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48',
//         user_id: Types.ObjectId(),
//         rating: 'liked',
//         tags: ['cheap', 'quiet', 'italian'],
//         price: 1
//     },
//     {
//         place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps73',
//         user_id: Types.ObjectId(),
//         rating: 'disliked',
//         tags: ['expensive', 'quiet', 'sushi'],
//         price: 4
//     }
// ];

const createUser = user => {
    return request(app)
        .post('/api/auth')
        .send(user)
        .then(res => res.body);
};

beforeEach(() => {
    return Promise.all(users.map(createUser)).then(userRes => {
        createdUsers = userRes;
    });
});

const getUsers = () => createdUsers;

module.exports = {
    getUsers
};
