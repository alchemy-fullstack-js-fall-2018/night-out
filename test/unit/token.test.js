const { tokenize, untokenize } = require('../../lib/util/tokenizer');

describe('tokenizer', () => {
    it('create token for a payload', () => {
        const token = tokenize({ name: 'paul' });
        expect(token).toEqual(expect.any(String));
    });
});
