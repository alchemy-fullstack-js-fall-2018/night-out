require('dotenv').config();
require('../../lib/util/connect')();
const { dropCollection } = require('../util/db');
const request = require('supertest');
const app = require('../../lib/app');
const { Types } = require('mongoose');
const Log = require('../../lib/models/Log');

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
let createdLogs;
let createdEvenings;

let users = [
    {
        name: 'User1',
        email: 'user1@user1.com',
        zipcode: '97202',
        clearPassword: 'abcd1',
        keywords: ['japanese', 'cheap', 'cocktails']
    },
    {
        name: 'User2',
        email: 'user2@user2.com',
        zipcode: '94061',
        clearPassword: 'abcd2',
        keywords: ['quiet', 'art', 'steak']
    },
    {
        name: 'User3',
        email: 'user3@user3.com',
        zipcode: '97214',
        clearPassword: 'abcd3',
        keywords: ['beer', 'tapas', 'patio']
    }
];

let logs = [
    {
        place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48',
        name: 'some of garden',
        user: Types.ObjectId(),
        rating: 'liked',
        tags: ['cheap', 'quiet', 'italian'],
        price: 1
    },
    {
        place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps73',
        name: 'bamboo sushi',
        user: Types.ObjectId(),
        rating: 'disliked',
        tags: ['expensive', 'quiet', 'sushi'],
        price: 4
    }
];

let zipcodes = [
    {
        zipcode: 97202
    },
    {
        zipcode: 94103
    },
    {
        zipcode: 94610
    }
];


const createUser = user => {
    return request(app)
        .post('/api/auth/signup')
        .send(user)
        .then(res => res.body);
};


const createLog = log => {
    return Log.create(log)
        .then(log => JSON.parse(JSON.stringify(log)));
};

const createEvening = zipcode => {
    return request(app)
        .post('/api/evenings')
        .send(zipcode)
        .set('Authorization', `Bearer ${getToken()}`)
        .then(res => res.body);
};

const withToken = user => {
    return request(app)
        .post('/api/auth/signin')
        .send({ email: user.email, clearPassword: user.clearPassword })
        .then(({ body }) => body.token);
};


beforeEach(() => {
    return Promise.all(users.map(createUser)).then(userRes => {
        createdUsers = userRes;
    });
});

let token;

beforeEach(() => {
    return withToken(users[0]).then(createdToken => {
        token = createdToken;
    });
});


beforeEach(() => {
    return Promise.all(logs.map(createLog)).then(logRes => {
        createdLogs = logRes;
    });
});

beforeEach(() => {
    return Promise.all(zipcodes.map(createEvening)).then(eveningRes => {
        createdEvenings = eveningRes;
    });
});

const getUsers = () => createdUsers;
const getLogs = () => createdLogs;
const getToken = () => token;
const getEvenings = () => createdEvenings;

module.exports = {
    getUsers,
    getLogs,
    getToken,
    getEvenings
};

