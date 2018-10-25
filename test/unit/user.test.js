const { getErrors } = require('../util/helpers');
const User = require('../../lib/models/User');

describe('User Model', () => {
    it('returns a valid User Schema Model', () => {
        const data = {
            name: 'bobby',
            email: 'bobby@bobby.com',
            zipcode: '94061',
            keywords: ['mexian', 'drinks', 'cheap', 'movies']
        };
        const user = new User(data);
        const jsonUser = user.toJSON();
        expect(jsonUser).toEqual({ ...data, _id: expect.any(Object) });
    });

    it('validates that fields are required', () => {
        const user = new User ({});

        const errors =  getErrors(user.validateSync(), 3);
        expect(errors.name.properties.message).toEqual('Name is required');
        expect(errors.email.properties.message).toEqual('Email is required');
        expect(errors.zipcode.properties.message).toEqual('Zip code is required');
        // expect(errors.keywords.properties.message).toEqual('At least one initial preference required');
    });
});
