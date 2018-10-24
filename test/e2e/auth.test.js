const { getUsers, getToken } = require('./mockData');
const app = require('../../lib/app');
const request = require('supertest');


const checkStatus = statusCode => res => {
    expect(res.status).toEqual(statusCode);
};

const checkOk = res => checkStatus(200)(res);


describe('user routes', () => {
   

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

    it('verifies a signed in user', () => {
        return request(app)
            .get('/api/auth/verify')
            .set('Authorization', `Bearer ${getToken()}`)
            .then(res => {
                expect(res.body).toEqual({ success: true });
            });
    });

});
