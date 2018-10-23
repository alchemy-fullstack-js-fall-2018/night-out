
const request = require('supertest');
const app = require('../../lib/app');
const { getUsers } = require('./mockData');

describe('validates a vertical slice of the Evening model', () => {

    it('Posts an evening', () => {
        const createdUsers = getUsers();

        return request(app)
            .post('/api/evening')
            .send({
                user_id: createdUsers[1]._id,
                rating: 'unknown',
                logs: ['ChIJIfBAsjeuEmsRdgu9Pl1Ps23', 'ChIJIfBAsjeuEmsRdgu9Pl1Ps98', 'ChIJIfBAsjeuEmsRdgu9Pl1Ps65' ],
                price: 3
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    user_id: createdUsers[1]._id,
                    rating: 'unknown',
                    logs: ['ChIJIfBAsjeuEmsRdgu9Pl1Ps23', 'ChIJIfBAsjeuEmsRdgu9Pl1Ps98', 'ChIJIfBAsjeuEmsRdgu9Pl1Ps65' ],
                });
            
            });






    });
});
