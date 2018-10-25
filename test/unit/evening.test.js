const Evening = require('../../lib/models/Evening');
const { getErrors } = require('../util/helpers');
const { Types } = require('mongoose');

describe('Evening model', () => {
    it('validated a good evening model', () => {
        const data = {
            user: Types.ObjectId(),
            rating: 'liked',
            logs: []
        };

        const evening = new Evening(data);
        const jsonEvening = evening.toJSON();
        expect(jsonEvening).toEqual({ ...data, _id: expect.any(Object) });
    });

    it('fails when no required values are given', () => {
        const evening = new Evening ({});

        const errors = getErrors(evening.validateSync(), 2);
        expect(errors.user.properties.message).toEqual('user required');
        expect(errors.price.properties.message).toEqual('price required 0-4');

    });
});

