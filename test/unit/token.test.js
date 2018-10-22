const { tokenize, untokenize } = require('../../lib/util/tokenizer');

describe('tokenizer', () => {
    it('create token for a payload', () => {
        const token = tokenize({ name: 'paul' });
        expect(token).toEqual(expect.any(String));
    });

    it('decodes a token with payload', () => {
        const token = tokenize({ name: 'paul' });
        const decodedToken = untokenize(token);
        expect(decodedToken).toEqual({ name: 'paul' });
    });
});
