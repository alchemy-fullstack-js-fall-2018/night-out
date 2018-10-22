const ensureAuth = require('../../lib/util/ensure-auth');
const { tokenize } = require('../../lib/util/tokenizer');

describe('ensure auth middleware', () => {
    it('checks a bearer token', done => {
        const token = tokenize({ name: 'Al' });
        const req = {
            token
        };

        const next = () => {
            expect(req.user).toEqual({ name: 'Al' });
            done();
        };

        ensureAuth(req, null, next);
    });
});
