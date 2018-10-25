const { getUsers } = require('../e2e/mockData');
const createLogs = require('../../lib/util/create-logs');

describe('create logs', () => {

    it('creates logs', () => {
        const users = getUsers();

        createLogs(users[0], { zipcode: 97206 })
            .then(logs => {
                expect(logs).toHaveLength(3);
            });
    });
});

