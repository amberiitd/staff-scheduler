import { useTheme } from "@emotion/react";
import IconButton from "@mui/material/IconButton";
import { FC, useContext, useMemo } from "react";
import { ColorModeContext, tokens } from "../contexts/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Link } from "@mui/material";
import UserDropdown from "./UserDropdown";
import { useLocation } from "react-router-dom";
import { navLinks } from "../constants/route";
import { useActiveNav } from "../hooks/useActiveNav";

const AppNavBar: FC<{ search?: boolean; profile?: boolean }> = (props) => {
	const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const colorMode = useContext(ColorModeContext);
	const activeNav = useActiveNav();

	return (
		<Box
			display="flex"
			p={2}
			position="sticky"
			top={0}
			sx={{ backgroundColor: colors.primary[400] }}
			zIndex={11}
			boxShadow={1}
			alignItems={"center"}
		>
			<Box>
				{navLinks.map((link) => (
					<Link
						sx={{
							pointerEvents: link.disabled ? "none" : "all",
							color: colors.primary[100],
							fontWeight:
								activeNav.href == link.href ? "600" : "400",
						}}
						margin="0 10px 0 10px"
						href={link.href}
						aria-disabled={link.disabled}
					>
						{link.label}
					</Link>
				))}
			</Box>
			<Box display="flex" marginLeft={"auto"}>
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === "dark" ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
				{props.profile && <UserDropdown />}
			</Box>
		</Box>
	);
};

export default AppNavBar;
