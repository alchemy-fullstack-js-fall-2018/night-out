const { getUsers } = require('../e2e/mockData');
const createLogs = require('../../lib/util/create-logs');

// Use your mock here so we can do more interesting tests
jest.mock('../../lib/util/google-map-service');

describe('create logs', () => {

    it('creates logs', () => {
        const users = getUsers();

        createLogs(users[0], { zipcode: 97206 })
            .then(logs => {
                expect(logs).toHaveLength(3);
            });
    });

    it('creates logs', () => {
        const users = getUsers();

        createLogs(users[0], { zipcode: 97206 })
            .then(logs => {
                expect(logs).toHaveLength(3);
            });
    });
});

