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
export type CartProduct = { id: number; count?: number; size?: ProductSize };
export const AppContext = createContext<{}>({});
const AppContextProvider: FC<{ children: any }> = ({ children }) => {
	return (
		<AppContext.Provider value={{}}>
				{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
