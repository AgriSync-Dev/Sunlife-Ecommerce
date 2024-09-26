import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	userData: null,
	cartupdate: null,
	address: null,
	access: { expires: null, token: null },
	refresh: { expires: null, token: null },
	cartCount: 0,
	currency: "GBP",
	currencyConvertedRate: 1,
	lastpath: "/",
	wallet: { address: null, balance: null, chainId: null },
};

export const userSlice = createSlice({
	name: "userReducer",
	initialState,
	reducers: {
		setUser: (state, action) => {
			return {
				...state,
				userData: action.payload.user,
				access: action.payload.access,
				refresh: action.payload.refresh,
			};
		},
		removeUser: (state, action) => {
			return {
				userData: null,
				access: { expires: null, token: null },
				refresh: { expires: null, token: null },
				wallet: {
					address: null,
					balance: null,
					chainId: null,
				},
			};
		},
		setWallet: (state, action) => {
			return {
				...state,
				wallet: {
					...state.wallet,
					...action.payload,
				},
			};
		},
		clearWallet: (state, action) => {
			return {
				...state,
				wallet: {
					address: null,
					balance: null,
					chainId: null,
				},
			};
		},
		setCartCount: (state, action) => {
			return {
				cartCount: state.payload.cartCount,
			};
		},
		setCurrency: (state, action) => {
			return {
				...state,
				currency: action.payload.currency,
			};
		},
		setCurrencyConvertedRate: (state, action) => {
			return {
				...state,
				currencyConvertedRate: Number(action.payload.currencyConvertedRate),
			};
		},
		setCartUpdate: (state, action) => {
			return {
				...state,
				cartupdate: action.payload,
			};
		},
		setlastpath: (state, action) => {
			return {
				...state,
				lastpath: action.payload,
			};
		},
		setAddress: (state, action) => {
			return {
				...state,
				address: action.payload,
			};
		},
		updateUser: (state, action) => {
			return {
				...state,
				userData: action.payload.user,
			};
		},
	},
});
// Action creators are generated for each case reducer function
export const {
	setUser,
	removeUser,
    setWallet,
    clearWallet,
	setCartCount,
	updateUser,
	setCartUpdate,
	setAddress,
	setlastpath,
	setCurrency,
	setCurrencyConvertedRate,
} = userSlice.actions;
export default userSlice.reducer;
