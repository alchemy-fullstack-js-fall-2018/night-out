require('dotenv').config();
const { dropCollection } = require('../util/db');
const User = require('../../lib/models/User');
const app = require('../../lib/app');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const Chance = require('chance');
const chance = new Chance();

const checkStatus = statusCode => res => {
    expect(res.status).toEqual(statusCode);
};

const checkOk = res => checkStatus(200)(res);

const withToken = user => {
    return request(app)
        .post('/api/auth/signin')
        .send({ email: `${user.email}`, clearPassword: `${user.clearPassword}` })
        .then(({ body }) => body.token);
};

describe('user routes', () => {
    const users = Array.apply(null, { length: 1 })
        .map(() => ({ 
            name: chance.name(), 
            clearPassword: chance.word(),
            email: chance.email(),
            zipcode: chance.zip(),
            initialPreferences: [chance.word(), chance.word(), chance.word()]
        }));

    let createdUsers;

    const createUser = user => {
        return User.create(user);
    };

    beforeEach(() => {
        return dropCollection('users');
    });

    beforeEach(() => {
        return Promise.all(users.map(createUser))
            .then(cs => {
                createdUsers = cs;
            });
    });

    let token;

    beforeEach(() => {
        return withToken(users[0]).then(createdToken => {
            token = createdToken;
        });
    });

    it('creates a user on signup', () => {
        return request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Al',
                clearPassword: 'password',
                email: 'al@al.com',
                zipcode: '90403',
                initialPreferences: ['thai food', 'coffee', 'tiki drinks']
            })
            .then(({ body: user }) => {
                expect(user).toEqual({
                    _id: expect.any(String),
                    name: 'Al',
                    email: 'al@al.com',
                    zipcode: '90403',
                    initialPreferences: ['thai food', 'coffee', 'tiki drinks']
                });
            });
    });

    it('signs in a user', () => {
        return request(app)
            .post('/api/auth/signin')
            .send({ email: createdUsers[0].email, clearPassword: users[0].clearPassword })
            .then(res => {
                checkOk(res);
                expect(res.body.token).toEqual(expect.any(String));
            });
    });
    
});
