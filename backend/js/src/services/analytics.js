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
exports.aggregateHoursByUsers = void 0;
const user_1 = require("./user");
const dynamodb_client_1 = require("../config/dynamodb-client");
const schedule_1 = require("./schedule");
const TABLE = process.env.APP_MAIN_TABLE || "";
function aggregateHoursByUsers({ startDate, endDate, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!startDate || !endDate || startDate > endDate) {
            throw Error("InvalidPayload");
        }
        const users = (yield (0, user_1.getAllUsers)()) || [];
        const usersMap = Object.assign({}, ...users.map((user) => ({ [user.sub]: user })));
        const params = {
            TableName: TABLE,
            FilterExpression: "sk BETWEEN :fromDate AND :toDate",
            ExpressionAttributeValues: {
                ":fromDate": `day:${startDate}`,
                ":toDate": `day:${endDate}`,
            },
        };
        const slots = (yield dynamodb_client_1.dynamoDB.scan(params, schedule_1.dbCallback).promise())["Items"] || [];
        slots.forEach((slot) => {
            const pk = (slot.pk || "");
            const uid = pk.slice(4, pk.length);
            if (usersMap[uid]) {
                usersMap[uid].totalHours =
                    (usersMap[uid].totalHours || 0) + slot.hours;
            }
        });
        return Object.values(usersMap);
    });
}
exports.aggregateHoursByUsers = aggregateHoursByUsers;
