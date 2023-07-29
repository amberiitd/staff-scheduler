type Interval = {
	startTimeStamp: number;
	endTimeStamp: number;
};

export type PutScheduleRequestPayload = {
	userId: string;
  date: string;
	hours: number;
};

export type GetScheduleRequestPayload = {
  userId: string;
  startDate: string;
  endDate: string;
  limit?: number;
  offset?: number; 
}

export type DeleteScheduleRequestPayload = {
  userId: string;
  scheduleDate: string;
}

export type DeleteUserRequestPayload = {
  username: string;
}

export type GetAnalytics1RequestPayload = {
  startDate: string;
  endDate: string;
}