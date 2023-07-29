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
exports.deleteSchedule = exports.getSchedule = exports.createSchedule = void 0;
const lodash_1 = require("lodash");
const dynamodb_client_1 = require("../config/dynamodb-client");
const validations_1 = require("../util/validations");
const moment_1 = __importDefault(require("moment"));
const TABLE = process.env.APP_MAIN_TABLE || "";
const dbCallback = (err, data) => {
    if (err) {
        throw err;
    }
    return data;
};
function createSchedule({ userId, hours, date } = { hours: 0 }) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, lodash_1.isEmpty)(userId) || !(0, validations_1.validateDateString)(date)) {
            throw Error("IncorrectPayload");
        }
        const parsedDate = moment_1.default
            .unix(Date.parse(date) / 1000)
            .format("YYYY-MM-DD");
        var params = {
            TableName: TABLE,
            Item: {
                pk: `uid:${userId}`,
                sk: `day:${parsedDate}`,
                scheduleDate: parsedDate,
                hours,
                itemType: "schedule",
            },
        };
        yield dynamodb_client_1.dynamoDB.put(params, dbCallback).promise();
        return { sucess: true };
    });
}
exports.createSchedule = createSchedule;
function getSchedule({ userId, startDate, endDate } = {
    userId: "",
    startDate: (0, moment_1.default)().format("YYYY-MM-DD"),
    endDate: (0, moment_1.default)().add("days", 360).format("YYYY-MM-DD"),
}) {
    return __awaiter(this, void 0, void 0, function* () {
        var params = {
            TableName: TABLE,
        };
        if ((0, lodash_1.isEmpty)(userId) || startDate > endDate) {
            return [];
        }
        else {
            params = Object.assign(Object.assign({}, params), { KeyConditionExpression: "pk= :pk and sk BETWEEN :fromDate AND :toDate", ExpressionAttributeValues: {
                    ":pk": `uid:${userId}`,
                    ":fromDate": `day:${startDate}`,
                    ":toDate": `day:${endDate}`,
                } });
            console.log("params", params);
            return (yield dynamodb_client_1.dynamoDB.query(params, dbCallback).promise())["Items"];
        }
    });
}
exports.getSchedule = getSchedule;
function deleteSchedule({ userId, scheduleDate }) {
    return __awaiter(this, void 0, void 0, function* () {
        var params = {
            TableName: TABLE,
        };
        if ((0, lodash_1.isEmpty)(userId) || !scheduleDate) {
            return [];
        }
        else {
            const params = {
                TableName: TABLE,
                Key: {
                    pk: `uid:${userId}`,
                    sk: `day:${scheduleDate}`,
                },
            };
            yield dynamodb_client_1.dynamoDB.delete(params).promise();
            return { success: true };
        }
    });
}
exports.deleteSchedule = deleteSchedule;
