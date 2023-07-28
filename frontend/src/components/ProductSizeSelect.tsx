import { useTheme } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useMemo } from "react";
import { tokens } from "../contexts/theme";
export type ProductSize = "xs" | "s" | "l" | "xl" | "xxl";
const ProductSizeSelect: FC<{
	value?: ProductSize;
	onChange: (e: any, value: ProductSize) => void;
	sx?: any;
}> = ({ value, onChange, sx = {} }) => {
	const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	return (
		<FormControl
			size="small"
			sx={{
				...sx,
				minWidth: "120px",
				"& .Mui-focused.MuiInputLabel-root": {
					color: colors.primary[100],
				},
			}}
		>
			<InputLabel id="size-select-label" size="small">
				Size
			</InputLabel>
			<Select
				labelId="size-select-label"
				label="Size"
				value={value}
				onChange={(e) => onChange(e, e.target.value as any)}
				size="small"
			>
				<MenuItem value={"xs"}>XS</MenuItem>
				<MenuItem value={"s"}>S</MenuItem>
				<MenuItem value={"l"}>L</MenuItem>
				<MenuItem value={"xl"}>XL</MenuItem>
				<MenuItem value={"xxl"}>XXL</MenuItem>
			</Select>
		</FormControl>
	);
};

export default ProductSizeSelect;
