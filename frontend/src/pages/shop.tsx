import Box from "@mui/material/Box";
import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";
import AppNavBar from "../components/AppNavBar";
import Banner from "../components/Banner";
import { Card, Divider, Grid, IconButton, Modal, Pagination, Stack, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import { max, min, noop, uniq } from "lodash";
import SearchBar from "../components/SearchBar";
import PriceRange from "../components/PriceRange";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ProductCategories from "../components/ProductCategories";
import { useTheme } from "@emotion/react";
import { tokens } from "../contexts/theme";
import ProductModal from "../components/ProductModal";
import { AppContext } from "../contexts/app";

export type ProductModalProps = {show: boolean; selectedProduct?: number | string}
export type PriceRange = { min: number; max: number };
export const ShopPageContext = createContext<{
	searchString: string;
	setSearchString: React.Dispatch<React.SetStateAction<string>>;
	priceRange: PriceRange;
	setPriceRange: React.Dispatch<React.SetStateAction<PriceRange>>;
	selectedCategories: string[];
	setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  productModal: ProductModalProps;
  setProductModal: React.Dispatch<React.SetStateAction<ProductModalProps>>
}>({
	searchString: "",
	setSearchString: noop,
	priceRange: { min: 25, max: 100 },
	setPriceRange: noop,
	selectedCategories: [],
	setSelectedCategories: noop,
  productModal: {show: false},
  setProductModal: noop
});
const ShopPage: FC = () => {
  const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
  const {productList, setProductList} = useContext(AppContext);
	const [searchString, setSearchString] = useState("");
	const [priceRange, setPriceRange] = useState<PriceRange>({
		min: 25,
		max: 100,
	});
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productModal, setProductModal] = useState<ProductModalProps>({show: false})
	useEffect(() => {
		fetch("https://fakestoreapi.com/products?limit=100")
			.then((res) => res.json())
			.then((data) => setProductList(data));
	}, []);

	return (
		<ShopPageContext.Provider
			value={{
				searchString,
				setSearchString,
				priceRange,
				setPriceRange,
				selectedCategories,
				setSelectedCategories,
        productModal,
        setProductModal
			}}
		>
			<main>
				<AppNavBar profile />
				<Banner />
				<Divider sx={{ margin: "20px 0 20px 0" }} />
				<Grid container paddingBottom={3} marginTop={15}>
					<Grid
						item
						xs={12}
						md={3}
						// border="1px solid red"
						minHeight={250}
						// minWidth={300}
						paddingLeft={3}
						paddingRight={3}
						marginBottom={3}
					>
						<Box display={"flex"} paddingBottom={2} paddingTop={2}>
							<FilterAltIcon sx={{ marginLeft: "auto" }} />
						</Box>
						<PriceRange
							min={min(productList.map((p) => p.price))}
							max={max(productList.map((p) => p.price))}
						/>
						<Divider sx={{ margin: "20px 0 20px 0" }} />
						<ProductCategories
							categories={uniq(
								productList.map((p) => p.category)
							)}
						/>
						<Divider sx={{ margin: "20px 0 20px 0" }} />
					</Grid>
					<Grid
						item
						xs={12}
						md={9}
						// border="1px solid red"
						minHeight={250}
					>
						<SearchBar />
						<ProductList data={productList} />
					</Grid>
				</Grid>
				<Divider sx={{ margin: "20px 0 20px 0" }} />
				<Box marginLeft={5} marginRight={5} paddingBottom={20} marginTop={15}>
          <Typography variant="h3" fontWeight={300} marginBottom={3}>Recomended for you</Typography>
					<Grid container spacing={2}>
						{productList.slice(0, 9).map((p: any, index) => (
							<Grid key={`product-recom-${index}`} item>
								<ProductCard
									id={p.id}
									label={p.title}
									image={p.image}
									category={p.category}
									price={p.price}
                  size={0.8}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
			</main>
      <ProductModal productList={productList}/>
		</ShopPageContext.Provider>
	);
};

export default ShopPage;
