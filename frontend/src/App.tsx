import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useMode, ColorModeContext } from "./contexts/theme";
import {
	BrowserRouter,
	Routes,
	Navigate,
	Route,
	useNavigate,
} from "react-router-dom";
import HomePage from "./pages/home";
import AppContextProvider from "./contexts/app";
import { useContext, useEffect } from "react";
import AuthContextProvider, { AuthContext } from "./contexts/auth";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import UserPage from "./pages/user";

const AuthGuard = ({ children }: { children: any }) => {
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();
  useEffect(() => {
    if (auth.status === "unauthenticated") {
      navigate("/login");
    }
  }, [auth])
	
  return children;
};

function App() {
	const { theme, toggleColorMode } = useMode();
	return (
		<ColorModeContext.Provider value={{ toggleColorMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppContextProvider>
					<BrowserRouter>
						<AuthContextProvider>
							<Routes>
								<Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
								<Route
									path="home"
									element={
										<AuthGuard>
											<HomePage />
										</AuthGuard>
									}
								/>
                <Route
									path="user"
									element={
										<AuthGuard>
											<UserPage />
										</AuthGuard>
									}
								/>
								<Route
									path="*"
									element={<Navigate to="/home" />}
								/>
							</Routes>
						</AuthContextProvider>
					</BrowserRouter>
				</AppContextProvider>
				<ToastContainer theme={theme.palette.mode} />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
