import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { Auth } from "aws-amplify";

const LoginPage = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: { username: "", password: "" },
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { auth, login } = useContext(AuthContext);
	useEffect(() => {
		if (auth.status !== "loading" && auth.user) {
			navigate("/home");
		}
	}, [auth]);
	return (
		<Box
			component="form"
			// sx={{
			// 	"& > :not(style)": { m: 1, width: "25ch" },
			// }}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit((data) => {
				setError("");
				login(data).catch((error) => {
					setError(error.message);
				});
			})}
			marginTop={10}
		>
			<Stack width={300} spacing={2}>
				<Controller
					control={control}
					name="username"
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							size="small"
							{...field}
							type="text"
							label="Username"
							variant="outlined"
							error={Boolean(errors.username)}
						/>
					)}
				/>

				<Controller
					control={control}
					name="password"
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							size="small"
							{...field}
							type="password"
							label="Password"
							variant="outlined"
							error={Boolean(errors.password)}
						/>
					)}
				/>
			</Stack>
			<Box sx={{ marginTop: 2 }}>
				<Button size="small" type="submit" variant="outlined">
					Login
				</Button>
				<Link to={"/signup"} style={{ marginLeft: 10 }}>
					Sign Up
				</Link>
			</Box>

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

export default LoginPage;
