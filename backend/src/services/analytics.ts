import { GetAnalytics1RequestPayload } from "../models/request";
import { getAllUsers } from "./user";
import { dynamoDB } from "../config/dynamodb-client";
import { dbCallback } from "./schedule";

const TABLE = process.env.APP_MAIN_TABLE || "";

export async function aggregateHoursByUsers({
	startDate,
	endDate,
}: GetAnalytics1RequestPayload) {
	if (!startDate || !endDate || startDate > endDate) {
		throw Error("InvalidPayload");
	}
	const users = (await getAllUsers()) || [];

  const usersMap = Object.assign(
		{},
		...users.map((user: any) => ({ [user.sub]: {...user, totalHours: 0} }))
	);
	const params = {
		TableName: TABLE,
		FilterExpression: "sk BETWEEN :fromDate AND :toDate",
		ExpressionAttributeValues: {
			":fromDate": `day:${startDate}`,
			":toDate": `day:${endDate}`,
		},
	};
	const slots =
		(await dynamoDB.scan(params, dbCallback).promise())["Items"] || [];

    slots.forEach((slot) => {
		const pk = (slot.pk || "") as string;
		const uid = pk.slice(4, pk.length);
		if (usersMap[uid]) {
			usersMap[uid].totalHours =
				(usersMap[uid].totalHours || 0) + slot.hours;
		}
	});
	return Object.values(usersMap);
}
