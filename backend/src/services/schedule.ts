import { isEmpty } from "lodash";
import { dynamoDB } from "../config/dynamodb-client";
import {
	GetScheduleRequestPayload,
	PutScheduleRequestPayload,
} from "../models/request";
import { validateDateString } from "../util/validations";
import moment from "moment";

const TABLE = process.env.APP_MAIN_TABLE || "";

const dbCallback = (err: any, data: any) => {
	if (err) {
		throw err;
	}
	return data;
};

export async function createSchedule(
	{ userId, slots, date }: PutScheduleRequestPayload = {} as any
) {
	if (isEmpty(userId) || !validateDateString(date)) {
		throw Error("IncorrectPayload");
	}

	const parsedDate = moment
		.unix(Date.parse(date) / 1000)
		.format("YYYY-MM-DD");
	var params = {
		TableName: TABLE,
		Item: {
			pk: `uid:${userId}`,
			sk: `day:${parsedDate}`,
			slots: isEmpty(slots)
				? []
				: !Array.isArray(slots)
				? [slots]
				: slots,
			itemType: "schedule",
		},
	};
	await dynamoDB.put(params, dbCallback).promise();
	return { sucess: true };
}

export async function getSchedule({ userId }: GetScheduleRequestPayload = {}) {
	var params: any = {
		TableName: TABLE,
	};

	if (isEmpty(userId)) {
		params = {
			...params,
			FilterExpression: "itemType = :itemType",
			ExpressionAttributeValues: { ":itemType": "schedule" },
			Limit: 20,
		};
		console.log("params", params);
		return await dynamoDB.scan(params, dbCallback).promise();
	} else {
		params = {
			...params,
			KeyConditionExpression: "pk= :pk",
			ExpressionAttributeValues: {
				":pk": `uid:${userId}`,
			},
		};
		console.log("params", params);
		return await dynamoDB.query(params, dbCallback).promise();
	}
}
