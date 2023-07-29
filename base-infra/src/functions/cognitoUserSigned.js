const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  console.log('cognito event', event)
    const { userName, request } = event;
    event.response.autoConfirmUser = true;
    return event
};


