import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { startCase } from "lodash";
import { FC, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../contexts/theme";
import { ShopPageContext } from "../pages/shop";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppContext } from "../contexts/app";

const ProductCard: FC<{
	id: number;
	label: string;
	image: string;
	category: string;
	price: number;
	size?: number;
}> = (props) => {
	const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const { productsInCart } = useContext(AppContext);
	const ratio = Math.min(props.size || 1, 1);
	const height = 30 * ratio;
	const width = 20 * ratio;
	const maxLabelChar = Math.ceil(40 * ratio);
	const { setProductModal } = useContext(ShopPageContext);
	const cartInfo = useMemo(
		() => productsInCart.find((p) => p.id === props.id),
		[productsInCart]
	);
	return (
		<Card
			sx={{
				width: `${width}rem`,
				height: `${height}rem`,
				"&:hover": {
					boxShadow: `3px 3px 10px 10px ${colors.primary[200]}`,
				},
				cursor: "pointer",
				backgroundColor: colors.primary[400],
				paddingTop: 1,
				position: "relative",
			}}
			onClick={() =>
				setProductModal({ show: true, selectedProduct: props.id })
			}
		>
			<Box display={"flex"} justifyContent={"center"}>
				<img
					src={props.image}
					style={{ height: `${Math.ceil(0.7 * height)}rem` }}
				/>
			</Box>
			<CardContent sx={{ paddingTop: `${15 * ratio}px` }}>
				<Typography textAlign={"center"}>
					{startCase(props.category)}
				</Typography>
				<Typography
					variant="h3"
					textAlign={"center"}
					fontWeight={200 * ratio}
					fontSize={`${180 * ratio}%`}
				>
					{props.label.length > maxLabelChar
						? props.label.slice(0, maxLabelChar - 3) + "..."
						: props.label}
				</Typography>
				<Typography textAlign={"center"}>${props.price}</Typography>
			</CardContent>
			{cartInfo && (
				<Box position={"absolute"} top={5} right={5}>
					<Box
						display={"flex"}
						alignItems={"center"}
						padding={1}
						sx={{ backgroundColor: colors.primary[900], borderRadius: 2 }}

					>
						<ShoppingCartIcon />
						<Typography marginLeft={1}>{cartInfo.count}</Typography>
					</Box>
				</Box>
			)}
		</Card>
	);
};

export default ProductCard;
