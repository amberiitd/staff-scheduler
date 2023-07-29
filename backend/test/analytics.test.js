const assert = require('assert');
const sinon = require('sinon');

// Mocking the dependencies
const userService = require('../js/src/services/user');
const { dynamoDB } = require('../js/src/config/dynamodb-client');
const { dbCallback } = require('../js/src/services/schedule');
const { aggregateHoursByUsers } = require('../js/src/services/analytics');

describe('aggregateHoursByUsers', () => {
  beforeEach(() => {
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should throw "InvalidPayload" error when startDate is missing', async () => {
    try {
      await aggregateHoursByUsers({ endDate: '2023-07-31' });
    } catch (error) {
      assert.strictEqual(error.message, 'InvalidPayload');
    }
  });

  it('should throw "InvalidPayload" error when endDate is missing', async () => {
    try {
      await aggregateHoursByUsers({ startDate: '2023-07-01' } );
    } catch (error) {
      assert.strictEqual(error.message, 'InvalidPayload');
    }
  });

  it('should throw "InvalidPayload" error when startDate is greater than endDate', async () => {
    try {
      await aggregateHoursByUsers({ startDate: '2023-07-31', endDate: '2023-07-01' });
    } catch (error) {
      assert.strictEqual(error.message, 'InvalidPayload');
    }
  });

  it('should return an array of users with total hours aggregated correctly', async () => {
    // Mocking the users data from the user module
    sinon.stub(userService, 'getAllUsers').resolves([
      { sub: 'b72d530a-01ff-46ac-bc40-a2044f30fced', name: 'User 1' },
      { sub: 'ac30a408-6434-4d99-a5b0-c61e23802af4', name: 'User 2' },
    ]);

    const scanStub = sinon.stub(dynamoDB, 'scan');
    scanStub.returns({
      promise: () =>
        Promise.resolve({
          Items: [
            { pk: 'uid:b72d530a-01ff-46ac-bc40-a2044f30fced', sk: 'day:2023-07-10', hours: 6 },
            { pk: 'uid:ac30a408-6434-4d99-a5b0-c61e23802af4', sk: 'day:2023-07-10', hours: 4 },
          ],
        }),
    });

    const result = await aggregateHoursByUsers({
      startDate: '2023-07-01',
      endDate: '2023-07-31',
    });

    assert.deepStrictEqual(result, [
      { sub: 'b72d530a-01ff-46ac-bc40-a2044f30fced', name: 'User 1', totalHours: 6 },
      { sub: 'ac30a408-6434-4d99-a5b0-c61e23802af4', name: 'User 2', totalHours: 4 },
    ]);

    sinon.assert.calledOnce(scanStub);
  });
});