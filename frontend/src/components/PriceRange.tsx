import { Box, Slider, Stack, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { ShopPageContext } from "../pages/shop";
import { useTheme } from "@emotion/react";
import { tokens } from "../contexts/theme";

const PriceRange: FC<{min: number | undefined; max: number | undefined}> = ({min, max}) => {
	const { priceRange, setPriceRange } = useContext(ShopPageContext);
  const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	// const min = 10;
	// const max = 500;
	return (
		<Stack>
			<Box>
				<Typography marginBottom={2} variant="h4" fontWeight={600}>Price</Typography>
				<Slider
					size="small"
					defaultValue={Object.values(priceRange)}
					min={min || 10}
					max={(max || 500)+ 10}
					valueLabelDisplay="auto"
					onChange={(e, value) => {
            value = (value as number[]);
						setPriceRange({ min: value[0], max: value[1] });
					}}
          // color='primary'
          sx={{color: colors.primary[300]}}
				/>
			</Box>
			<Box display={"flex"}>
				<Typography>Range</Typography>
				<Typography marginLeft={"auto"}>
					{priceRange.min}${" - "}
					{priceRange.max}$
				</Typography>
			</Box>
		</Stack>
	);
};

export default PriceRange;
