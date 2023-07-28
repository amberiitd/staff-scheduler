import { Box, Card, Grid, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { navLinks } from "../constants/route";
import { useActiveNav } from "../hooks/useActiveNav";

const productImages = [
	"https://m.media-amazon.com/images/G/39/UAE-hq/2023/img/Apparel/XCM_Manual_1587177_5708983_340x550_2X._CB601158557_.jpg",
	"https://m.media-amazon.com/images/G/39/RBS-PD/XCM_Manual_1587177_5707488_340x550_1._CB601466319_.jpg",
	"https://m.media-amazon.com/images/G/39/UAE-hq/2023/img/Apparel/XCM_Manual_1587177_5707492_340x550_2X._CB601149983_.jpg",
	"https://m.media-amazon.com/images/G/39/UAE-hq/2023/img/Apparel/XCM_Manual_1587177_5707493_340x550_2X._CB601149983_.jpg",
	"https://m.media-amazon.com/images/G/39/UAE-hq/2023/img/Apparel/Sportswear_for_women._CB601457418_.jpg",
	"https://m.media-amazon.com/images/G/39/UAE-hq/2023/img/Apparel/XCM_Manual_1587177_5707490_340x550_2X._CB601149983_.jpg",
	"https://m.media-amazon.com/images/G/39/UAE-hq/2023/img/Apparel/XCM_Manual_1587177_5707484_340x550_2X._CB601149983_.jpg",
	"https://m.media-amazon.com/images/G/39/UAE-hq/2023/img/Apparel/XCM_Manual_1587177_5707474_340x550_2X._CB601149983_.jpg",
	"https://m.media-amazon.com/images/G/39/UAE-hq/2023/img/Apparel/XCM_Manual_1587177_5709044_340x550_2X._CB601160092_.jpg",
];
const Banner: FC<{}> = ({}) => {
	const activeNav = useActiveNav();
	const heignt = 500;
	return (
		<Grid
			container
			spacing={2}
			minHeight={heignt}
			marginTop={5}
			// border="1px solid red"
		>
			<Grid item xs={12} md={3} alignItems={"center"} minHeight={300}>
				<Box
					width={"100%"}
					height={"100%"}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Typography textAlign={"center"} variant="h1" fontWeight={600}>
						{activeNav.label}
					</Typography>
				</Box>
			</Grid>

			<Grid item xs={12} md={9}>
				<Box
					width={"100%"}
					height={"100%"}
					display={"flex"}
					sx={{ overflowX: "auto" }}
					padding={"5px 0 5px 0"}
				>
					{productImages.map((img, index) => (
						<img
							src={img}
							alt={`image-${index}`}
							height={`${heignt - 12}px`}
							style={{ borderRadius: 5, margin: "0 1px 0 1px" }}
						/>
					))}
				</Box>
			</Grid>
		</Grid>
	);
};

export default Banner;
