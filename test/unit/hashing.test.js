const { hash, compare } = require('../../lib/util/hashing');

describe('password helper', () => {
    it('hash a password', () => {
        const hashedPassword = hash('pumpkin');
        expect(hashedPassword).not.toEqual('pumpkin');
    });
});
