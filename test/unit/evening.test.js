const Evening = require('../../lib/models/Evening');
const { getErrors } = require('../util/helpers');
const { Types } = require('mongoose');

describe('Evening model', () => {
    it('validated a good evening model', () => {
        const data = {
            user_id: Types.ObjectId(),
            rating: 'liked',
            logs: ['ChIJIfBAsjeuEmsRdgu9Pl1Ps48', 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48', 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48']
        };

        const evening = new Evening(data);
        const jsonEvening = evening.toJSON();
        expect(jsonEvening).toEqual({ ...data, _id: expect.any(Object) });
    });

    it('fails when no required values are given', () => {
        const evening = new Evening ({});

        const errors = getErrors(evening.validateSync(), 3);
        expect(errors.user_id.properties.message).toEqual('user_id required');
        expect(errors.rating.properties.message).toEqual('rating required');
        expect(errors.logs.properties.message).toEqual('Three Google Place Id\'s required');
    });
});
