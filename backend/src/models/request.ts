type Interval = {
	startTimeStamp: number;
	endTimeStamp: number;
};

export type PutScheduleRequestPayload = {
	userId: string;
  date: string;
	slots: Interval | Interval[];
};

export type GetScheduleRequestPayload = {
  userId?: string;
  startTimeStamp?: number;
  endTimeStamp?: number;
  limit?: number;
  offset?: number; 
}
