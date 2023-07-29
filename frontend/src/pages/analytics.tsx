import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	Stack,
} from "@mui/material";
import Box from "@mui/system/Box";
import { API } from "aws-amplify";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

const AnalyticsPage = () => {
	const [aggregates, setAggregates] = useState<any[]>([]);
	const [error, setError] = useState("");
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();

	const [dateRange, setDateRange] = useState<any>({
		start: undefined,
		end: undefined,
	});

	const getAggregate = useCallback(
		async (startDate: string, endDate: string) => {
			setError("");
			API.post("base_url", "/analytics", {
				body: {
					startDate,
					endDate,
				},
			})
				.then((data) => {
					setAggregates(data);
				})
				.catch((error) => {
					setError(error.message);
				});
		},
		[auth]
	);

	useEffect(() => {
		if (auth.user?.role === "staff-user-role") {
			navigate("/home");
		}
	}, [auth]);

	return (
		<Box marginTop={5}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateRangePicker
					localeText={{
						start: "start",
						end: "end",
					}}
					onChange={(value: any) => {
						if (!value[0] || !value[1]) return;
						console.log(value);
						const start = moment(value[0]["$d"]).format(
							"YYYY-MM-DD"
						);
						const end = moment(value[1]["$d"]).format("YYYY-MM-DD");
						console.log(start, end);
						setDateRange({ start, end });
						getAggregate(start, end);
					}}
				/>
			</LocalizationProvider>
			<Stack direction={"row"} marginTop={1} marginBottom={1}>
				<Button
					size="small"
					variant="outlined"
					sx={{ ml: "auto" }}
					onClick={() =>
						dateRange
							? getAggregate(dateRange.start, dateRange.end)
							: undefined
					}
				>
					Refresh
				</Button>
			</Stack>
			<TableContainer component={Paper} sx={{ marginTop: 2 }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Username</TableCell>
							<TableCell>Full Name</TableCell>
							<TableCell>Total Hours</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{aggregates.map((row) => (
							<TableRow
								key={row.name}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell>{row.username}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.totalHours}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default AnalyticsPage;
