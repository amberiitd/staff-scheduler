import { isEmpty } from "lodash";
import { dynamoDB } from "../config/dynamodb-client";
import {
	DeleteScheduleRequestPayload,
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
	{ userId, hours, date }: PutScheduleRequestPayload = { hours: 0 } as any
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
			scheduleDate: parsedDate,
			hours,
      gsi_pk_1: `day:${parsedDate}`,
      gsi_sk_1: 'schedule',
			itemType: "schedule",
		},
	};
	await dynamoDB.put(params, dbCallback).promise();
	return { sucess: true };
}

export async function getSchedule(
	{ userId, startDate, endDate }: GetScheduleRequestPayload = {
		userId: "",
		startDate: moment().format("YYYY-MM-DD"),
		endDate: moment().add("days", 360).format("YYYY-MM-DD"),
	}
) {
	var params: any = {
		TableName: TABLE,
	};

	if (isEmpty(userId) || startDate > endDate) {
		return [];
	} else {
		params = {
			...params,
			KeyConditionExpression:
				"pk= :pk and sk BETWEEN :fromDate AND :toDate",
			ExpressionAttributeValues: {
				":pk": `uid:${userId}`,
				":fromDate": `day:${startDate}`,
				":toDate": `day:${endDate}`,
			},
		};
		console.log("params", params);
		return (await dynamoDB.query(params, dbCallback).promise())["Items"];
	}
}

export async function deleteSchedule({
	userId,
	scheduleDate
}: DeleteScheduleRequestPayload) {
	var params: any = {
		TableName: TABLE,
	};

	if (isEmpty(userId) || !scheduleDate) {
		return [];
	} else {
		const params = {
      TableName: TABLE,
      Key: {
        pk: `uid:${userId}`, 
        sk: `day:${scheduleDate}`,
      },
    };

    await dynamoDB.delete(params).promise();
    return {success: true}
	}
}
