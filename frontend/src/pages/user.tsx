import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
} from "@mui/material";
import Box from "@mui/system/Box";
import { API } from "aws-amplify";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router";

const UserPage = () => {
	const [users, setUsers] = useState<any[]>([]);
	const [error, setError] = useState("");
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();

	const getUser = useCallback(async () => {
		setError("");
		API.get("local", "/user", {})
			.then((data) => {
				setUsers(
					data.filter((u: any) => u.username !== auth.user?.username)
				);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, [auth]);

	useEffect(() => {
		if (auth.user?.role === "staff-user-role") {
			navigate("/home");
		}
		getUser();
	}, [auth]);

	return (
		<Box>
			<TableContainer component={Paper} sx={{ marginTop: 2 }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Username</TableCell>
							<TableCell>Full Name</TableCell>
              <TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((row) => (
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
								<TableCell>
									<Button
										variant="outlined"
										size="small"
										onClick={() => {
											setError("");
											API.del("local", "/user", {
												body: {
													username: row.username,
												},
											})
												.then(() => {
													toast.info(
														"User deleted successfully."
													);
													getUser();
												})
												.catch((error) => {
													setError(error.message);
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
	);
};

export default UserPage;
