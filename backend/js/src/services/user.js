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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = void 0;
const lodash_1 = require("lodash");
const cognito_client_1 = require("../config/cognito-client");
function getAllUsers() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            UserPoolId: process.env.APP_COGNITO_POOL_ID,
            AttributesToGet: ["name", "sub"],
        };
        return (_a = (yield cognito_client_1.cognito.listUsers(params).promise()).Users) === null || _a === void 0 ? void 0 : _a.filter((user) => user.UserStatus === "CONFIRMED").map((user) => {
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
        yield cognito_client_1.cognito.adminDeleteUser(params).promise();
        return { success: true };
    });
}
exports.deleteUser = deleteUser;
