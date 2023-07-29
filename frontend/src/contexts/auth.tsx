import { FC, createContext, useEffect, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { useLocation, useNavigate } from "react-router-dom";
import AppNavBar from "../components/AppNavBar";
import { noop } from "lodash";
import { parseJwt } from "../util/jwt";

type AuthUser = {
	status: "loading" | "authenticated" | "unauthenticated";
	user:
		| {
				username: string;
				role: "staff-user-role" | "staff-admin-role";
        name: string;
        sub: string;
		  }
		| undefined;
};

Amplify.configure({
	Auth: {
		region: "ap-south-1",
		//   authenticationFlowType: 'CUSTOM_AUTH',
		userPoolId: process.env.REACT_APP_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
		identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
	},
	API: {
		endpoints: [
			{
				name: "base_url",
				endpoint: `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_STAGE}`,
				region: "ap-south-1",
			},
      {
				name: "local",
				endpoint: `http://localhost:8080`,
				region: "ap-south-1",
			},
		],
	},
});
const getRole = (data: any) => {
	const roleParts = data.signInUserSession?.idToken?.jwtToken
		? parseJwt(data.signInUserSession.idToken.jwtToken)[
				"cognito:roles"
		  ]?.[0]?.split("/") || []
		: [];
	const role =
		roleParts.length > 0
			? roleParts[roleParts.length - 1]
			: "staff-user-role";
	console.log("role", role);
	return role;
};
export const AuthContext = createContext<{
	auth: AuthUser;
	login: (data: any) => Promise<void>;
	signup: (data: any) => void;
	logout: () => void;
}>({
	auth: {
		status: "loading",
		user: undefined,
	},
	login: async () =>{},
	signup: noop,
	logout: noop,
});

const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
	const [auth, setAuth] = useState<AuthUser>({
		status: "loading",
		user: undefined,
	});
	const navigate = useNavigate();
	const location = useLocation();

	const login = (data: any) => {
		return Auth.signIn(data.username, data.password)
			.then(async () => {
				const user = await Auth.currentAuthenticatedUser();
				setAuth({
					status: "authenticated",
					user: {
            username: user.username,
						sub: user.attributes?.sub,
						role: getRole(user),
            name: user.attributes?.name,
					},
				});
			})
			.catch((error) => {
				console.log(error);
        throw error;
			});
	};

	const signup = (data: any) => {
		Auth.signUp({
			username: data.username,
			password: data.password,
			attributes: { name: data.name },
		})
			.then(() => {
				navigate("/login");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const logout = () => {
		Auth.signOut().then(() => {
			console.log("userlogged out");
			setAuth({ status: "unauthenticated", user: undefined });
		});
	};

	useEffect(() => {
		if (auth.status === "loading") {
			Auth.currentAuthenticatedUser()
				.then((data) => {
          console.log(data)
					setAuth({
						status: "authenticated",
						user: {
              username: data.username,
							sub: data.attributes?.sub,
							role: getRole(data),
              name: data.attributes?.name
						},
					});
				})
				.catch((error) => {
					console.log(error);
					setAuth({
						status: "unauthenticated",
						user: undefined,
					});
					navigate("/login");
				});
		}
	}, [auth]);
	return (
		<AuthContext.Provider value={{ auth, login, signup, logout }}>
			<AppNavBar
				profile={!["/login", "/signup"].includes(location.pathname)}
			/>
			<main style={{ padding: "0 200px 0 200px" }}>{children}</main>
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
