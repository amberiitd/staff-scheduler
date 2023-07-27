"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamoDB = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
console.log("config loaded");
console.log('env', process.env.APP_AWS_REGION, process.env.APP_AWS_ACCESS_KEY_ID);
exports.dynamoDB = new aws_sdk_1.default.DynamoDB.DocumentClient({
    region: process.env.APP_AWS_REGION,
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
});
