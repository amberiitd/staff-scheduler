import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ShopPageContext } from "../pages/shop";
import {
	Grid,
	Box,
	Pagination,
	Typography,
	Select,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import ProductCard from "./ProductCard";
import { isEmpty, sortBy } from "lodash";
import { useTheme } from "@emotion/react";
import { tokens } from "../contexts/theme";
import { BaseProduct } from "../contexts/app";

type TopPanelParam = {
	view: "grid" | "list";
	sortBy: string;
};

const ProductList: FC<{ data: BaseProduct[] }> = ({ data }) => {
	const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const [productGridPageNumber, setProductGridPageNumber] = useState(1);
  const panelRef = useRef<HTMLDivElement>();
	const [topPanelParam, setTopPanelParam] = useState<TopPanelParam>({
		view: "grid",
		sortBy: "none",
	});
	const { searchString, selectedCategories, priceRange } =
		useContext(ShopPageContext);
	const arrangedData = useMemo(() => {
		const filtered = data.filter(
			(p) =>
				priceRange.min <= p.price &&
				p.price <= priceRange.max &&
				(!searchString ||
					p.title
						.toLowerCase()
						.includes(searchString.toLowerCase())) &&
				(isEmpty(selectedCategories) ||
					selectedCategories.includes(p.category))
		);
		return topPanelParam.sortBy === "none" || !topPanelParam.sortBy
			? filtered
			: sortBy(filtered, [topPanelParam.sortBy]);
	}, [topPanelParam, searchString, selectedCategories, priceRange, data]);

	useEffect(() => {
		if (arrangedData.length < (productGridPageNumber - 1) * 9) {
			setProductGridPageNumber(1);
		}
	}, [arrangedData]);
	return (
		<Box ref={panelRef}>
			<TopPanel
				onChange={(param) => setTopPanelParam(param)}
				pageSize={9}
				offset={(productGridPageNumber - 1) * 9}
				total={arrangedData.length}
			/>
			{topPanelParam.view === "grid" && (
				<Grid
					sx={{ overflowy: "auto" }}
					minHeight={500}
					container
					spacing={2}
					margin={0}
					width="100%"
					padding="0 0 16px 0"
					justifyContent={"center"}
				>
					{arrangedData
						.slice(
							(productGridPageNumber - 1) * 9,
							productGridPageNumber * 9
						)
						.map((p: any, index) => (
							<Grid key={`product-${index}`} item>
								<ProductCard
									id={p.id}
									label={p.title}
									image={p.image}
									category={p.category}
									price={p.price}
								/>
							</Grid>
						))}
				</Grid>
			)}
			{topPanelParam.view === "list" && (
				<TableContainer
					component={Paper}
					sx={{
						width: `calc(100% - 160px)`,
						margin: "0 80px 0 80px",
						backgroundColor: colors.primary[400],
					}}
				>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableHeaderCell>Title</TableHeaderCell>
								<TableHeaderCell>Description</TableHeaderCell>
								<TableHeaderCell align="right">
									Price($)
								</TableHeaderCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{arrangedData
								.slice(
									(productGridPageNumber - 1) * 9,
									productGridPageNumber * 9
								)
								.map((row) => (
									<TableRow
										key={row.id}
										sx={{
											"&:last-child td, &:last-child th":
												{
													border: 0,
												},
										}}
									>
										<TableCell component="th" scope="row">
											{row.title}
										</TableCell>
										<TableCell>{row.description}</TableCell>
										<TableCell align="right">
											{row.price}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			{arrangedData.length && (
				<Box marginTop={3} display={"flex"} justifyContent={"center"}>
					<Pagination
						page={productGridPageNumber}
						count={Math.ceil(arrangedData.length / 9)}
						variant="outlined"
						shape="rounded"
						onChange={(e, page) => {setProductGridPageNumber(page); panelRef.current?.scrollIntoView({behavior: 'smooth'})}}
					/>
				</Box>
			)}
		</Box>
	);
};

export default ProductList;

const TableHeaderCell: FC<{ children: any; align?: string }> = ({
	children,
	align,
}) => {
	return (
		<TableCell sx={{ fontWeight: 600 }} align={align as any}>
			{children}
		</TableCell>
	);
};

const TopPanel: FC<{
	onChange: (params: TopPanelParam) => void;
	defaultValue?: TopPanelParam;
	pageSize?: number;
	offset?: number;
	total?: number;
}> = ({ onChange, defaultValue, pageSize, offset, total }) => {
	const theme: any = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const [view, setView] = useState<"grid" | "list">(
		defaultValue?.view || "grid"
	);
	const [sortBy, setSortBy] = useState(defaultValue?.sortBy || "none");

	useEffect(() => {
		onChange({ view, sortBy });
	}, [view, sortBy]);

	return (
		<Box
			display={"flex"}
			marginLeft={10}
			marginRight={10}
			paddingTop={3}
			paddingBottom={3}
		>
			{pageSize && offset !== undefined && (
				<Box display={"flex"} alignItems={"center"}>
					<Typography variant="h6" fontWeight={600}>
						Showing {offset + 1} - {Math.min(offset + pageSize, total || (offset + pageSize))} of total{" "}
						{total} results
					</Typography>
				</Box>
			)}
			<Box marginLeft={"auto"}>
				<Box display={"flex"}>
					<Box display={"flex"} alignItems={"center"} marginRight={2}>
						<Typography marginRight={3}>Sort by:</Typography>
						<Select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							size="small"
							sx={{ minWidth: "7rem" }}
						>
							<MenuItem value={"price"}>Price</MenuItem>
							<MenuItem value={"title"}>Title</MenuItem>
							<MenuItem value={"none"}>None</MenuItem>
						</Select>
					</Box>
					<IconButton
						onClick={() => setView("list")}
						color={view === "list" ? "success" : "default"}
						sx={{
							marginRight: 2,
							backgroundColor:
								view === "list" ? colors.primary[400] : "unset",
						}}
					>
						<FormatListBulletedIcon />
					</IconButton>
					<IconButton
						onClick={() => setView("grid")}
						color={view === "grid" ? "success" : "default"}
						sx={{
							backgroundColor:
								view === "grid" ? colors.primary[400] : "unset",
						}}
					>
						<GridViewIcon />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};
