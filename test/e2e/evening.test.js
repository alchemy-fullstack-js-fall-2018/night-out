
require('dotenv').config();
const { dropCollection } = require('../util/db');
const User = require('../../lib/models/User');

const request = require('supertest');
const app = require('../../lib/app');
// const { getUsers } = require('./mockData');
const Chance = require('chance');
const chance = new Chance();


const withToken = user => {
    return request(app)
        .post('/api/auth/signin')
        .send({ email: user.email, clearPassword: user.clearPassword })
        .then(({ body }) => body.token);
};



describe('validates a vertical slice of the Evening model', () => {


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

    it.skip('Posts an evening', () => {

        return request(app)
            .post('/api/evenings')
            .set('Authorization', `Bearer ${token}`)
            .send({})
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    user_id: createdUsers[0]._id,
                    rating: 'unknown',
                    logs: expect.any(Array),
                });
            });
    });

    // it('updates an evening', () => {

    //     return request(app)
    //         .put('api/evenings')
    //         .set('Authorization', `Bearer ${token}`);
    //         .send({

    //         })
    //         .then(res => {
    //             expect(res.body).toEqual({
                    
    //             })
    //         })
    // })
});
