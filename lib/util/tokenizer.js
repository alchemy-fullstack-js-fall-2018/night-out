const { sign, verify } = require('jsonwebtoken');
const APP_SECRET = 'some_password';

const tokenize = payload => {
    return sign({ payload }, APP_SECRET, { expiresIn: '1hr' });
};

module.exports = {
    tokenize
}
