const { hash, compare } = require('../../lib/util/hashing');

describe('password helper', () => {
    it('hash a password', () => {
        const hashedPassword = hash('pumpkin');
        expect(hashedPassword).not.toEqual('pumpkin');
    });

    it('compare password', () => {
        const hashedPassword = hash('pumpkin');
        const comparePassword = compare('pumpkin', hashedPassword);
        expect(comparePassword).toBeTruthy();
    });

    it('compares a bad password', () => {
        const hashedPassword = hash('pumpkin');
        const comparePassword = compare('pumpkins', hashedPassword);
        expect(comparePassword).toBeFalsy();
    });
});
