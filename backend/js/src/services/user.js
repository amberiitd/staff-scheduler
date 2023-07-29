"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const lodash_1 = require("lodash");
aws_sdk_1.default.config.update({
    region: process.env.APP_AWS_REGION,
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
});
const cognito = new aws_sdk_1.default.CognitoIdentityServiceProvider();
function getAllUsers() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            UserPoolId: process.env.APP_COGNITO_POOL_ID,
            AttributesToGet: ["name", "sub"],
        };
        return (_a = (yield cognito.listUsers(params).promise()).Users) === null || _a === void 0 ? void 0 : _a.filter((user) => user.UserStatus === "CONFIRMED").map((user) => {
            var _a;
            return (Object.assign({ username: user.Username }, (_a = user.Attributes) === null || _a === void 0 ? void 0 : _a.reduce((p, c) => {
                p[(0, lodash_1.lowerCase)(c.Name)] = c.Value;
                return p;
            }, {})));
        });
    });
}
exports.getAllUsers = getAllUsers;
function deleteUser({ username }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username)
            return;
        const params = {
            UserPoolId: process.env.APP_COGNITO_POOL_ID,
            Username: username,
        };
        yield cognito.adminDeleteUser(params).promise();
        return { success: true };
    });
}
exports.deleteUser = deleteUser;
