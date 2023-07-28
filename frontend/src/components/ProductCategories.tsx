import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FC, useContext, useEffect, useMemo } from "react";
import { tokens } from "../contexts/theme";
import { ShopPageContext } from "../pages/shop";
import { startCase } from "lodash";

const ProductCategories: FC<{ categories: string[] }> = ({ categories }) => {
	const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const { selectedCategories, setSelectedCategories } =
		useContext(ShopPageContext);
	return (
		<Box>
			<Box marginBottom={2}>
				<Typography variant="h4" fontWeight={600}>Categories</Typography>
			</Box>
			<Grid container display={"flex"} spacing={1}>
				{categories.map((cat, index) => (
					<Grid item key={`categ-${index}`}>
						<CatButton selected={selectedCategories.includes(cat)} category={cat} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

const CatButton: FC<{ selected?: boolean; category: string }> = ({
	selected,
	category,
}) => {
	const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const { selectedCategories, setSelectedCategories } =
		useContext(ShopPageContext);
	return (
		<Button
			variant="outlined"
			sx={{
				color: colors.primary[100],
				borderColor: colors.primary[300],
				backgroundColor: selected ? colors.blueAccent[700] : "unset",
				"&:hover": {
					borderColor: colors.primary[100],
          backgroundColor: selected ? colors.blueAccent[700] : "unset",
				},
			}}
			onClick={() =>
				setSelectedCategories(
					selected
						? selectedCategories.filter((cat) => cat !== category)
						: [...selectedCategories, category]
				)
			}
		>
			{startCase(category)}
		</Button>
	);
};

export default ProductCategories;
