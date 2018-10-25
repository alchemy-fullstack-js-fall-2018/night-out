const { getUsers, getToken, getEvenings } = require('./mockData');
const request = require('supertest');
const app = require('../../lib/app');



describe('validates a vertical slice of the Evening model', () => {


    it('Posts an evening', () => {

        const createdUsers = getUsers();

        return request(app)
            .post('/api/evenings')
            .set('Authorization', `Bearer ${getToken()}`)
            .send({ zipcode: 97209 })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    user: createdUsers[0]._id.toString(),
                    rating: 'unknown',
                    logs: [{
                        _id:  expect.any(String),
                        place_id: expect.any(String),
                        user: createdUsers[0]._id.toString(),
                        tags: expect.any(Array),
                        name: expect.any(String),
                        price: expect.any(Number),
                        rating: 'unknown',
                    }, 
                    {
                        _id:  expect.any(String),
                        place_id: expect.any(String),
                        user: createdUsers[0]._id.toString(),
                        tags: expect.any(Array),
                        name: expect.any(String),
                        price: expect.any(Number),
                        rating: 'unknown',
                    }, 
                    {
                        _id:  expect.any(String),
                        place_id: expect.any(String),
                        user: createdUsers[0]._id.toString(),
                        tags: expect.any(Array),
                        name: expect.any(String),
                        price: expect.any(Number),
                        rating: 'unknown',
                    }],
                    price: expect.any(Number)

                });
            });
    });

    it('updates an evening', () => {
        const createdEvenings = getEvenings();
        return request(app)
            .put(`/api/evenings/${createdEvenings[0]._id}`)
            .set('Authorization', `Bearer ${getToken()}`)
            .send({ rating: 'liked' })
            .then(res => {
                expect(res.body).toEqual({ ...createdEvenings[0], rating: 'liked' });
            });
    });

    it('gets an evening by id', () => {
        const createdEvenings = getEvenings();
        return request(app)
            .get(`/api/evenings/${createdEvenings[0]._id}`)
            .set('Authorization', `Bearer ${getToken()}`)
            .then(res => {
                expect(res.body).toEqual(createdEvenings[0]);
            });
    });
});
