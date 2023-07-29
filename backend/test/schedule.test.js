const sinon = require('sinon');
const { expect } = require('chai');
const moment = require('moment');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { createSchedule, getSchedule, deleteSchedule } = require('../js/src/services/schedule');

// Mocking the DynamoDB client
const { dynamoDB } = require('../js/src/config/dynamodb-client');


// Mocking the DynamoDB response for the getSchedule function
const dynamoDBResponse = {
  Items: [
    {
      pk: 'uid:b72d530a-01ff-46ac-bc40-a2044f30fced',
      sk: 'day:2023-07-10',
      scheduleDate: '2023-07-10',
      hours: 6,
      gsi_pk_1: 'day:2023-07-10',
      gsi_sk_1: 'schedule',
      itemType: 'schedule',
    },
  ],
};

chai.use(chaiAsPromised);

describe('Schedule Layer', () => {
  beforeEach(() => {
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createSchedule', () => {
    it('should create a schedule entry', async () => {
      // Arrange
      const userId = 'b72d530a-01ff-46ac-bc40-a2044f30fced';
      const hours = 4;
      const date = '2023-07-15';
      const parsedDate = moment.unix(Date.parse(date) / 1000).format('YYYY-MM-DD');

      // Mocking the DynamoDB put method to resolve with a success message
      const putStub = sinon.stub(dynamoDB, 'put');
      putStub.returns({
        promise: () =>
          Promise.resolve({ success: true }),
      });
      // dynamoDB.put.resolves({ success: true });

      // Actx
      const result = await createSchedule({ userId, hours, date });

      // Assert
      expect(result).to.deep.equal({ success: true });
      sinon.assert.calledOnce(putStub);
    });

    it('should throw "IncorrectPayload" error with invalid payload', async () => {
      // Arrange
      const invalidPayload = { userId: '', hours: 4, date: '2023-07-15' };

      // Stubbing the DynamoDB put method to resolve with a success message
      const putStub = sinon.stub(dynamoDB, 'put');
      putStub.returns({
        promise: () => Promise.resolve({ success: true }),
      });

      // Act and Assert using chai-as-promised syntax
      await expect(createSchedule(invalidPayload)).to.be.rejectedWith(Error, 'IncorrectPayload');
    });
  });

  describe('getSchedule', () => {
    it('should return the schedule for a user within the date range', async () => {
      // Arrange
      const userId = 'b72d530a-01ff-46ac-bc40-a2044f30fced';
      const startDate = '2023-07-01';
      const endDate = '2023-07-31';

      // Mocking the DynamoDB query method to resolve with the test data
      const queryStub = sinon.stub(dynamoDB, 'query');
      queryStub.returns({
        promise: () => Promise.resolve(dynamoDBResponse),
      });

      // Act
      const result = await getSchedule({ userId, startDate, endDate });

      // Assert
      expect(result).to.deep.equal(dynamoDBResponse.Items);
      sinon.assert.calledOnce(queryStub);
    });

    it('should return an empty array with invalid payload', async () => {
      // Arrange
      const invalidPayload = { userId: '', startDate: '2023-07-31', endDate: '2023-07-01' };

      // Act
      const result = await getSchedule(invalidPayload);

      // Assert
      expect(result).to.deep.equal([]);
    });
  });

  describe('deleteSchedule', () => {
    it('should delete the schedule entry for a user', async () => {
      // Arrange
      const userId = 'b72d530a-01ff-46ac-bc40-a2044f30fced';
      const scheduleDate = '2023-07-10';

      // Mocking the DynamoDB delete method to resolve with a success message
      const deleteStub = sinon.stub(dynamoDB, 'delete');
      deleteStub.returns({
        promise: () => Promise.resolve({success: true}),
      });

      // Act
      const result = await deleteSchedule({ userId, scheduleDate });

      // Assert
      expect(result).to.deep.equal({ success: true });
      sinon.assert.calledOnce(deleteStub);
    });

    it('should return an empty object with invalid payload', async () => {
      // Arrange
      const invalidPayload = { userId: '', scheduleDate: '2023-07-10' };

      // Act
      const result = await deleteSchedule(invalidPayload);

      // Assert
      expect(result).to.deep.equal([]);
    });
  });
});