require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const { getUsers, getLogs } = require('./mockData');

describe('validates vertical slices of log posts', () => {

    it('posts a log', () => {
        const createdUsers = getUsers();

        return request(app)
            .post('/api/logs')
            .send({ 
                place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48', 
                name: 'por que no',
                user: createdUsers[0]._id,
                rating: 'liked',
                tags: ['happy hour', 'mexican', 'bar'],
                price: 2
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    place_id: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48',
                    name: 'por que no',
                    user: createdUsers[0]._id,
                    rating: 'liked',
                    tags: ['happy hour', 'mexican', 'bar'],
                    price: 2
                });
            });
    });

    it('updates a log with a rating by ID', () => {
        const createdLogs = getLogs();
        const log = createdLogs[0];

        return request(app).put(`/api/logs/${log._id}`)
            .send({ rating: 'liked' })
            .then(res => {
                expect(res.body).toEqual({
                    ...log,
                    rating: 'liked'
                });
            });
    });

    it('gets all logs by user ID', () => {
        const createdLogs = getLogs();
        const createdUsers = getUsers();
        const userId = createdLogs[0].user;

        return request(app).get(`/api/logs/${userId}`)
            .then(res => {
                expect(res.body).toEqual([createdLogs[0]]);
            });
    });
});
