import React, { useEffect, useState } from "react";
import CartItem from "../../components/cart/cartItem";
import { apiGET, apiPOST } from "../../utilities/apiHelpers";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../../redux/users/users";
import CurrencyConvertComp from "../../components/currencyConvertComp";

const MyCart = () => {
	const navigate = useNavigate();
	const [subTotal, setSubTotal] = useState(0);
	const [tempTotal, setTempTotal] = useState(0);
	const [autoDiscount, setAutoDiscount] = useState(false);
	const [cartLoading, setCartLoading] = useState(true);
	const [MyCartData, setMyCartData] = useState([]);
	const { userData } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const checkProductsAvailable = async () => {
		navigate("/checkout");
	};

	const renewToken = async () => {
		try {
			let payload = {
				refreshToken: localStorage.getItem("refreshToken"),
			};
			const response = await apiPOST(`/v1/auth/renew-token`, payload);
			if (response?.status === 200) {
				dispatch(
					setUser({
						user: userData,
						...response?.data,
					})
				);
				localStorage.setItem("refreshToken", response?.data?.refresh?.token);
				localStorage.setItem("accessToken", response?.data?.access?.token);
			} else {
				handleLogout();
			}
		} catch (error) {
			console.error("Error renew token:", error);
		}
	};

	const handleLogout = (e) => {
		dispatch(removeUser());
		localStorage.clear();
		navigate("/");
		window.location.reload();
	};
	const getMyCart = async () => {
		if (userData != null) {
			try {
				const response = await apiGET(`/v1/cart/get-my-cart`);
				setCartLoading(false);
				if (response?.status === 200) {
					setMyCartData(response?.data?.data?.data?.cart);
					setAutoDiscount(response?.data?.data?.data?.auto_discount);
					let carts = response?.data?.data?.data?.cart;
					let totalPrice = 0;
					let TotalPrice = 0;
					if (carts?.length) {
						for (let i = 0; i < carts.length; i++) {
							TotalPrice += carts[i]?.productDetails[0]?.price * carts[i]?.quantity;
							totalPrice +=
								Number(carts[i]?.sale_price || carts[i]?.productDetails[0]?.price) *
								Number(carts[i]?.quantity);
						}
					}
					setTempTotal(TotalPrice);
					setSubTotal(totalPrice.toFixed(2));
				} else {
					renewToken();
					console.error("Error fetching Cart data:", response.error);
				}
			} catch (error) {
				setCartLoading(false);
				console.error("Error fetching collection data:", error);
			}
		} else {
			try {
				let paylod = {
					deviceId: localStorage.getItem("deviceId"),
				};
				const response = await apiPOST(`/v1/cart/nouser-get-my-cart`, paylod);
				setCartLoading(false);
				if (response?.status === 200) {
					setMyCartData(response?.data?.data?.data?.cart);
					setAutoDiscount(response?.data?.data?.data?.auto_discount);

					let carts = response?.data?.data?.data?.cart;
					let totalPrice = 0;
					let TotalPrice = 0;
					if (carts.length) {
						for (let i = 0; i < carts.length; i++) {
							TotalPrice += carts[i]?.productDetails[0]?.price * carts[i]?.quantity;
							totalPrice +=
								Number(carts[i]?.sale_price || carts[i]?.productDetails[0]?.price) *
								Number(carts[i]?.quantity);
						}
					}

					setTempTotal(TotalPrice);
					setSubTotal(totalPrice.toFixed(2));
				} else {
					console.error("Error fetching Cart data:", response.error);
				}
			} catch (error) {
				setCartLoading(false);
				console.error("Error fetching collection data:", error);
			}
		}
	};

	useEffect(() => {
		getMyCart();
	}, []);

	return (
		<div className="container py-5 px-3" style={{ minHeight: "calc(100vh - 450px)" }}>
			{!cartLoading ? (
				<>
					{MyCartData?.length > 0 ? (
						<div>
							<div className="row mx-2">
								<div className="col-12 col-lg-8">
									<div className="fw-bold fs-4">Cart Items</div>
									<hr />
									{MyCartData.length > 0 ? (
										<div className="d-flex flex-column mt-3" style={{ gap: "10px" }}>
											{MyCartData.map((item, index) => (
												<>
													<CartItem cartDetail={item} getMyCart={getMyCart} />
													<hr />
												</>
											))}
										</div>
									) : (
										""
									)}
								</div>

								<div className="col"></div>
								<div className="col-12 col-lg-3 mt-5 mt-lg-2">
									<div className="fs-5 fw-bold">Order Summary</div>
									<div
										className="d-flex justify-content-between mt-2 flex-wrap"
										style={{ gap: "12px" }}
									>
										<span className="fs-6 fw-semibold">Total : </span>
										{autoDiscount ? (
											<div>
												<span className="line-through-text">
													<CurrencyConvertComp amount={tempTotal} />
												</span>
												<span className="ms-2">
													<CurrencyConvertComp amount={subTotal} />
												</span>
											</div>
										) : (
											<span>
												<CurrencyConvertComp amount={subTotal} />
											</span>
										)}
									</div>
									{autoDiscount ? (
										<div
											className="d-flex justify-content-between mt-2 flex-wrap"
											style={{ gap: "12px" }}
										>
											<span className="fs-6 fw-semibold">Discount : </span>
											<div>
												<span className="">
													<CurrencyConvertComp
														amount={Number(tempTotal) - Number(subTotal)}
													/>
												</span>
											</div>
										</div>
									) : (
										""
									)}
									<div className="d-flex justify-content-center">
										<button
											type="button"
											onClick={() => {
												checkProductsAvailable();
											}}
											style={{ width: "100%", maxWidth: "320px" }}
											className="btn btn-dark rounded-0 mt-3 "
										>
											Checkout
										</button>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div
							className="w-100 border border-dark d-flex flex-column justify-content-center align-items-center"
							style={{ height: "calc(100vh - 500px)" }}
						>
							<div className="fs-4 fw-bold">Your cart is empty</div>
							<Link to={"/"} className="fw-semibold">
								Continue to shopping
							</Link>
						</div>
					)}
				</>
			) : (
				<div
					style={{
						height: "calc(100vh - 450px)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						fontSize: "24px",
						fontWeight: 600,
						flexDirection: "column",
					}}
				>
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					Loading Cart ...
				</div>
			)}
		</div>
	);
};

export default MyCart;
