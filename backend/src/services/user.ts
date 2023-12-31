import AWS from "aws-sdk";
import { lowerCase } from "lodash";
import { DeleteUserRequestPayload } from "../models/request";
import { cognito } from "../config/cognito-client";

export async function getAllUsers() {
	const params: any = {
		UserPoolId: process.env.APP_COGNITO_POOL_ID,
		AttributesToGet: ["name", "sub"],
	};
	return (await cognito.listUsers(params).promise()).Users?.filter(
		(user) => user.UserStatus === "CONFIRMED"
	).map((user) => ({
		username: user.Username,
		...user.Attributes?.reduce((p: any, c: any) => {
			p[lowerCase(c.Name)] = c.Value;
			return p;
		}, {}),
	}));
}

export async function deleteUser({ username }: DeleteUserRequestPayload) {
	if (!username) return;

	const params: any = {
		UserPoolId: process.env.APP_COGNITO_POOL_ID,
		Username: username,
	};

	await cognito.adminDeleteUser(params).promise();
	return { success: true };
}
