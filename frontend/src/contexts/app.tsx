import { create, noop } from "lodash";
import { FC, createContext, useState } from "react";
import { ProductSize } from "../components/ProductSizeSelect";
export type BaseProduct = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};
export type CartProduct = {id: number; count?: number; size?: ProductSize};
export const AppContext = createContext<{
	productsInCart: CartProduct[];
	setProductsInCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
	productList: BaseProduct[];
	setProductList: React.Dispatch<React.SetStateAction<BaseProduct[]>>;
}>({
	productsInCart: [],
	setProductsInCart: noop,
	productList: [],
	setProductList: noop,
});
const AppContextProvider: FC<{ children: any }> = ({ children }) => {
	const [productsInCart, setProductsInCart] = useState<CartProduct[]>([]);
	const [productList, setProductList] = useState<BaseProduct[]>([]);

	return (
		<AppContext.Provider
			value={{
				productList,
				setProductList,
				productsInCart,
				setProductsInCart,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
