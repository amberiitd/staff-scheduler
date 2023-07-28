import { useTheme } from "@emotion/react";
import Button from "@mui/material/Button"
import { FC, useMemo } from "react"
import { tokens } from "../contexts/theme";

const ThemeButton: FC<any> = ({children, ...rest}) => {
  const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
  return <Button
			variant="outlined"
			sx={{
				color: colors.primary[100],
				borderColor: colors.primary[300],
				"&:hover": {
					borderColor: colors.primary[100],
				},
			}}
			{...rest}
		>
			{children}
		</Button>
}

export default ThemeButton;