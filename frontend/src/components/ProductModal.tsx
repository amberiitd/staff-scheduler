import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { ShopPageContext } from "../pages/shop";
import { useTheme } from "@emotion/react";
import { tokens } from "../contexts/theme";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import { startCase } from "lodash";
import ProductSizeSelect, { ProductSize } from "./ProductSizeSelect";
import ProductCount from "./ProductCount";
import { AppContext, BaseProduct } from "../contexts/app";
import ThemeButton from "./ThemeButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const style = {
	position: "absolute",
	top: 200,
	left: "50%",
	transform: "translate(-50%, 0%)",
	width: "50rem",
	borderRadius: 3,
	boxShadow: 24,
};

const ProductModal: FC<{ productList: BaseProduct[] }> = ({ productList }) => {
	const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const { productModal, setProductModal } = useContext(ShopPageContext);
	const { productsInCart, setProductsInCart } = useContext(AppContext);
	const [size, setSize] = useState<ProductSize>();
	const [count, setCount] = useState(0);
	const productOnView = useMemo(
		() =>
			productModal.selectedProduct
				? productList.find((p) => p.id === productModal.selectedProduct)
				: undefined,
		[productList, productModal.selectedProduct]
	);
	const cartInfo = useMemo(
		() => productsInCart.find((p) => p.id === productOnView?.id),
		[productsInCart, productOnView]
	);

  useEffect(() => {
    console.log('cartInfo', cartInfo)
  },[cartInfo])

	return (
		<Modal
			open={productModal.show}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
		>
			<Box
				sx={{
					...style,
					backgroundColor: colors.blueAccent[800],
					padding: "10px 10px 20px 10px",
				}}
			>
				<Box
					display="flex"
					alignItems="start"
					padding={"15px 0 15px 0"}
					sx={{
						px: 4,
					}}
				>
					<IconButton
						onClick={() => {
							setProductModal({ show: false });
							setSize(undefined);
							setCount(0);
						}}
						sx={{ marginLeft: "auto" }}
					>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box display={"flex"}>
					<img
						src={productOnView?.image}
						width={"55%"}
						style={{ maxHeight: "30rem", borderRadius: 10 }}
					/>
					<Box marginLeft={2} width={"100%"}>
						<Typography>
							{startCase(productOnView?.category)}
						</Typography>
						<Typography
							variant="h3"
							fontWeight={200}
							fontSize={`180%`}
						>
							{productOnView?.title}
						</Typography>
						<Typography>{productOnView?.description}</Typography>
						<Typography fontWeight={600}>
							${productOnView?.price}
						</Typography>

						<Box display={"flex"} marginTop={2}>
							<ProductSizeSelect
								onChange={(e, value) => {
									if (cartInfo && productOnView) {
										setProductsInCart((list) => {
											const index =
												productsInCart.findIndex(
													(p) => p.id === cartInfo.id
												);
											list.splice(index, 1, {
												...list[index],
												size: value,
											});
											return [...list];;
										});
									}
									setSize(value);
								}}
								value={cartInfo ? cartInfo.size : size}
							/>
							<ProductCount
								value={cartInfo ? cartInfo.count || 0 : count}
								onChange={(e, val) => {
									if (cartInfo && productOnView) {
										setProductsInCart((list) => {
											const index =
												productsInCart.findIndex(
													(p) => p.id === cartInfo.id
												);
											list.splice(index, 1, {
												...list[index],
												count: val,
											});
											return [...list];
										});
									}
									setCount(val);
								}}
								sx={{ marginLeft: 3 }}
							/>
						</Box>
						<Box marginTop={5}>
							<ThemeButton
								onClick={() => {
									if (!productOnView) return;
									setProductsInCart((list) => [
										...list,
										{
											id: productOnView.id,
											count: count,
											size: size,
										},
									]);
								}}
								disabled={(!size && !count) || cartInfo}
							>
								Add to cart
								<ShoppingCartIcon sx={{ marginLeft: 1 }} />
							</ThemeButton>
						</Box>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default ProductModal;
