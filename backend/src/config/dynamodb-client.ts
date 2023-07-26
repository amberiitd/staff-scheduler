import AWS from "aws-sdk";

console.log("config loaded")
console.log('env', process.env.APP_AWS_REGION, process.env.APP_AWS_ACCESS_KEY_ID)
export const dynamoDB = new AWS.DynamoDB.DocumentClient({
	region: process.env.APP_AWS_REGION,
	accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
});
