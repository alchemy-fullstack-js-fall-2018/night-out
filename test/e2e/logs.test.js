require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const { getUsers } = require('./mockData');

xdescribe('validates vertical slices of log posts', () => {

    it('posts a log', () => {
        const createdUsers = getUsers();

        return request(app)
            .post('/api/logs')
            .send({ 
                place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48', 
                user_id: createdUsers[0]._id,
                rating: 'liked',
                tags: ['happy hour', 'mexican', 'bar'],
                price: 2
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48',
                    user_id: createdUsers[0]._id,
                    rating: 'liked',
                    tags: ['happy hour', 'mexican', 'bar'],
                    price: 2
                });
            });
    });
});
