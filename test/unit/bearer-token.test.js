const bearerToken = require('../../lib/util/bearer-token');

describe('bearer-token middleware', () => {
    it('adds bearer-token to request', () => {
        const token = 'ghost';
        const req = {
            get: () => {
                return `bearer ${token}`;
            }
        };

        let called = false;
        const next = () => {
            called = true;
        };

        bearerToken(req, null, next);

        expect(called).toBeTruthy();
        expect(req.token).toEqual(token);
    });
    it('does not add auth token if no auth header provided', () => {
        const req = {
            get: () => {
                return null;
            }
        };  

        let called = false;
        const next = () => {
            called = true;
        };

        bearerToken(req, null, next);

        expect(called).toBeTruthy();
        expect(req.token).toBeUndefined();
    });
});
