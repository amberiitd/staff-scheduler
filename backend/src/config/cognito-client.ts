import AWS from "aws-sdk";

AWS.config.update({
	region: process.env.APP_AWS_REGION,
	accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
});

export const cognito = new AWS.CognitoIdentityServiceProvider();