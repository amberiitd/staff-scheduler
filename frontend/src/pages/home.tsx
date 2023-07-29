import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { API } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/auth";

const HomePage = () => {
	const [users, setUsers] = useState<any[]>([]);
	const [selectedUser, setSelectedUser] = useState<any>();
	const [slots, setSlots] = useState<any[]>([]);
	const [error, setError] = useState("");
	const [dateRange, setDateRange] = useState<any>({
		start: undefined,
		end: undefined,
	});
	const { auth } = useContext(AuthContext);
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		control,
		watch,
	} = useForm({
		defaultValues: { date: moment().format("YYYY-MM-DD"), hours: 5 },
	});
	const formValues = watch();

	const getSlots = (start: string, end: string) => {
		setError("");
		API.post("base_url", "/schedule", {
			body: {
				userId: selectedUser,
				startDate: start,
				endDate: end,
			},
		})
			.then((data) => {
				setSlots(data);
			})
			.catch((error) => {
				setError(error.message);
			});
	};
	useEffect(() => {
		setError("");
		API.get("base_url", "/user", {})
			.then((data) => {
				setUsers(data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);
	return (
		<Box marginTop={5}>
			<FormControl
				size="small"
				sx={{
					minWidth: "120px",
				}}
			>
				<InputLabel id="size-select-label" size="small">
					User
				</InputLabel>
				<Select
					labelId="size-select-label"
					label="User"
					value={selectedUser}
					onChange={(e) => {
						setSelectedUser(e.target.value);
						setSlots([]);
					}}
					size="small"
				>
					{users.map((u, index) => (
						<MenuItem key={`user${index}`} value={u.sub}>
							{u.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{selectedUser && (
				<>
					{auth.user?.role === "staff-admin-role" && (
						<Box
							marginTop={5}
							component="form"
							noValidate
							autoComplete="off"
							onSubmit={handleSubmit((data) => {
								console.log(data);
								setError("");
								API.put("base_url", "/schedule", {
									body: {
										userId: selectedUser,
										date: data.date,
										hours: data.hours,
									},
								})
									.then(() => {
										toast.success("Schedule created/updated.");
                    getSlots(dateRange.start, dateRange.end)
									})
									.catch((error) => {
										setError(error.message);
									});
							})}
						>
							<Typography variant="h4">CREATE/UPDATE</Typography>
							<Stack spacing={2} width={300}>
								<Controller
									control={control}
									name="date"
									rules={{ required: true }}
									render={({ field: { value } }) => {
										return (
											<LocalizationProvider
												dateAdapter={AdapterDayjs}
											>
												<DatePicker
													onChange={(
														value: any,
														context
													) => {
														if (!value) return;
														const day = moment(
															value["$d"]
														).format("YYYY-MM-DD");
														setValue("date", day);
														console.log(day);
													}}
												/>
											</LocalizationProvider>
										);
									}}
								/>
								<Controller
									control={control}
									name="hours"
									rules={{ min: 0, max: 10 }}
									render={(field) => {
										return (
											<TextField
												{...field}
												onChange={(e) => {
													setValue(
														"hours",
														parseInt(e.target.value)
													);
												}}
												type="number"
												inputProps={{ min: 0, max: 10 }}
												error={Boolean(errors.hours)}
											/>
										);
									}}
								/>
							</Stack>
							<Button
								type="submit"
								size="small"
								variant="outlined"
								sx={{ marginTop: 2 }}
							>
								{slots.findIndex(
									(s) => s.scheduleDate === formValues.date
								) >= 0
									? "Update"
									: "Create"}
							</Button>
						</Box>
					)}

					<Box marginTop={5} width={300}>
						<Typography variant="h4" marginBottom={2}>
							VIEW
						</Typography>
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
									const end = moment(value[1]["$d"]).format(
										"YYYY-MM-DD"
									);
									console.log(start, end);
									setDateRange({ start, end });
									getSlots(start, end);
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
										? getSlots(
												dateRange.start,
												dateRange.end
										  )
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
										<TableCell>Date</TableCell>
										<TableCell>Hours</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{slots.map((row) => (
										<TableRow
											key={row.name}
											sx={{
												"&:last-child td, &:last-child th":
													{ border: 0 },
											}}
										>
											<TableCell>
												{row.scheduleDate}
											</TableCell>
											<TableCell>{row.hours}</TableCell>
											<TableCell>
												<Button
													variant="outlined"
													size="small"
													onClick={() => {
														setError("");
														API.del(
															"base_url",
															"/schedule",
															{
																body: {
																	userId: selectedUser,
																	scheduleDate:
																		row.scheduleDate,
																},
															}
														)
															.then(() => {
																toast.info(
																	"Schedule deleted successfully."
																);

                                getSlots(dateRange.start, dateRange.end)
															})
															.catch((error) => {
																setError(
																	error.message
																);
															});
													}}
												>
													Delete
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</>
			)}

			{error && (
				<Box
					borderRadius={3}
					border={1}
					sx={{ backgroundColor: "whitesmoke", color: "red" }}
					marginTop={10}
					width={400}
					minHeight={200}
					padding={3}
				>
					{error}
				</Box>
			)}
		</Box>
	);
};

export default HomePage;
