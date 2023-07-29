const sinon = require('sinon');
const { expect } = require('chai');
const { deleteUser } = require('../js/src/services/user');
const { cognito } = require('../js/src/config/cognito-client');
// Stubbing AWS CognitoIdentityServiceProvider

describe('User Layer', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('deleteUser', () => {
    it('should delete the user with the specified username', async () => {
      // Arrange
      const username = 'userToDelete';
      const deleteUserStub = sinon.stub(cognito, 'adminDeleteUser');
      deleteUserStub.returns({
        promise: () =>
          Promise.resolve({ success: true }),
      });

      // Act
      const result = await deleteUser({ username });

      // Assert
      expect(result).to.deep.equal({ success: true });
      sinon.assert.calledOnce(deleteUserStub);
    });

    it('should return undefined when no username provided', async () => {
      // Act
      const result = await deleteUser({ username: '' });

      // Assert
      expect(result).to.be.undefined;
    });
  });
});