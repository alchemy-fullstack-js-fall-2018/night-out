const { getLogs, getToken } = require('./mockData');
const request = require('supertest');
const app = require('../../lib/app');

describe('validates vertical slices of log posts', () => {

    it('updates a log with a rating by ID', () => {
        const createdLogs = getLogs();
        const log = createdLogs[0];

        return request(app).put(`/api/logs/${log._id}`)
            .set('Authorization', `Bearer ${getToken()}`)
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
        const userId = createdLogs[0].user;

        return request(app).get(`/api/logs/${userId}`)
            .set('Authorization', `Bearer ${getToken()}`)
            .then(res => {
                expect(res.body).toEqual([createdLogs[0]]);
            });
    });

    it('gets all logs by query', () => {
        const createdLogs = getLogs();

        return request(app).get('/api/logs')
            .set('Authorization', `Bearer ${getToken()}`)
            .query({ rating: 'liked' })
            .then(res => {
                expect(res.body).toContainEqual(createdLogs[0]);
            });
    });
});
