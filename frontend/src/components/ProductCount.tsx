import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ThemeButton from "./ThemeButton";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";
import { IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductCount: FC<{
	value: number;
	onChange: (e: any, val: number) => void;
	min?: number;
	max?: number;
  sx?: any;
}> = ({ value, onChange, min = 0, max = 5, sx={} }) => {
	return (
		<Box display={"flex"} alignItems={"center"} {...sx}>
			<IconButton
				onClick={(e: any) => onChange(e, Math.max(value - 1, 0))}
				disabled={value === min}
			>
				<RemoveIcon />
			</IconButton>
			<Typography margin={"0 10px 0 10px"}>{value}</Typography>
			<IconButton
				onClick={(e: any) => onChange(e, Math.min(value + 1, max))}
				disabled={value === max}
			>
				<AddIcon />
			</IconButton>
		</Box>
	);
};

export default ProductCount;
