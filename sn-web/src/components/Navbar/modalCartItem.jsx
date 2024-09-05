import React, { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import { apiPOST } from "../../utilities/apiHelpers";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CurrencyConvertComp from "../currencyConvertComp";

const ModalCartItem = ({ cartDetail, getMyCart }) => {
	const { userData } = useSelector((state) => state.user);
	const [count, setCount] = useState(cartDetail?.quantity);

	useEffect(() => {
		setCount(cartDetail?.quantity);
	}, [cartDetail]);

	const addToCart = async (product) => {
		try {
			let payload = {
				productId: product?.productId,
				cartId: product?._id,
			};
			const response = await apiPOST("v1/cart/add-to-cart", payload);
			getMyCart();
			if (response?.data?.status) {
				// toast.success(response?.data?.data)
				// return true
			} else {
				toast.error(response?.data?.data);
				return false;
			}
		} catch (error) {
			return false;
		}
	};

	const nouseraddToCart = async (product) => {
		try {
			let payload = {
				productId: product?.productId,
				deviceId: localStorage.getItem("deviceId"),
				cartId: product?._id,
			};
			const response = await apiPOST("v1/cart/nouser-add-to-cart", payload);
			getMyCart();
			if (response?.data?.status) {
				// toast.success(response?.data?.data)
				// return true
			} else {
				toast.error(response?.data?.data);
				return false;
			}
		} catch (error) {
			return false;
		}
	};

	const removeFromCart = async (product) => {
		try {
			let payload = {
				productId: product?.productId,
				cartId: product?._id,
			};
			const response = await apiPOST("v1/cart/remove-from-cart", payload);
			getMyCart();
			if (response?.data?.code) {
				// return true
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	};

	const noUserRemoveItemFromCart = async (product) => {
		try {
			let payload = {
				productId: product?.productId,
				deviceId: localStorage.getItem("deviceId"),
				cartId: product?._id,
			};
			const response = await apiPOST("v1/cart/nouser-remove-from-cart", payload);
			getMyCart();
			if (response?.data?.status) {
				toast.success(response?.data?.data);
			} else {
				toast.error("Error while Product removing!");
			}
		} catch (error) {}
	};

	const noUserRemoveCart = async () => {
		try {
			let payload = {
				productId: cartDetail?.productId,
				deviceId: localStorage.getItem("deviceId"),
				cartId: cartDetail?._id,
			};

			const response = await apiPOST("v1/cart/nouser-remove-cart", payload);
			getMyCart();
			if (response?.data?.code) {
				toast.success("Cart Removed Successfully");
			} else {
				toast.error("Error while Product removing!");
			}
		} catch (error) {}
	};

	function increment() {
		setCount(function (prevCount) {
			const res = userData ? addToCart(cartDetail) : nouseraddToCart(cartDetail);

			if (res) {
				return (prevCount += 1);
			} else {
				toast.error("Getting error while  adding to cart");
			}
		});
	}

	function decrement() {
		setCount(function (prevCount) {
			const res = userData ? removeFromCart(cartDetail) : noUserRemoveItemFromCart(cartDetail);
			if (prevCount > 0) {
				if (res) {
					return (prevCount -= 1);
				} else {
					toast.error("getting error while removing to cart");
				}
			} else {
				return (prevCount = 0);
			}
		});
	}

	const removeCart = async () => {
		try {
			let payload = { productId: cartDetail?.productId };
			const response = await apiPOST("v1/cart/remove-cart", payload);
			getMyCart();
			if (response?.data?.code) {
				toast.success("Cart Item Removed Successfully");
			} else {
				toast.error("Error while Product removing!");
			}
		} catch (error) {}
	};

	return (
		<>
			<div>
				<div onClick={() => {}} className="d-flex  justify-content-between m-2 mt-5 ">
					<div>
						<LazyLoadImage
							effect="blur"
							alt={cartDetail?.productDetails[0]?.imageAltText || cartDetail?.productDetails[0]?.name}
							src={cartDetail?.productDetails[0]?.productImageUrl}
							height={100}
							width={100}
						/>
					</div>
					<div style={{ width: "200px" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							{cartDetail?.productDetails[0]?.name}
							{cartDetail?.variants?.pots
								? `(${cartDetail?.variants?.pots} Pots)`
								: cartDetail?.variants?.size
								? `(${cartDetail?.variants?.size} size) `
								: ""}
							<div className="col-2 col-lg-3">
								<div className="w-100 d-flex justify-content-end fs-4 cursor-pointer ">
									<X onClick={userData ? removeCart : noUserRemoveCart} />
								</div>
							</div>
						</div>

						{cartDetail?.couponName ? (
							<div className="" style={{ fontSize: "13px", color: "#0396ff" }}>
								{cartDetail?.couponName}
							</div>
						) : (
							""
						)}

						<div className="mt-2">
							{" "}
							{cartDetail?.sale_price ? (
								<span>
									<span className="line-through-text">
										<CurrencyConvertComp
											amount={cartDetail?.productDetails[0]?.price * cartDetail?.quantity}
										/>
									</span>{" "}
									<CurrencyConvertComp amount={cartDetail?.sale_price * cartDetail?.quantity} />
								</span>
							) : (
								<span>
									<CurrencyConvertComp
										amount={cartDetail?.productDetails[0]?.price * cartDetail?.quantity}
									/>
								</span>
							)}
						</div>

						{!cartDetail?.productDetail[0]?.subProduct ? (
							<div
								className="border  border-black d-flex justify-content-between mt-2"
								style={{ width: "70px" }}
							>
								<div onClick={decrement} className=" text-center mx-2 cursor-pointer ">
									-
								</div>
								<div className="text-center">{count}</div>
								<div onClick={increment} className=" text-center mx-2 cursor-pointer">
									+
								</div>
							</div>
						) : (
							<div
								className="border  border-black d-flex justify-content-center mt-2"
								style={{ minWidth: "30px", width: "max-content" }}
							>
								<div className="text-center">{count}</div>
							</div>
						)}
					</div>
				</div>
				{cartDetail?.productDetail[0]?.subProduct ? <p>Products:</p> : null}
				{cartDetail?.productDetail[0]?.subProduct.map((item, index) => (
					<div onClick={() => {}} className="d-flex  justify-content-between m-2 mt-2 ">
						<div>
							<LazyLoadImage
								effect="blur"
								alt={cartDetail?.productDetails[0]?.imageAltText || cartDetail?.productDetails[0]?.name}
								src={item?.productDetailsObj?.productImageUrl}
								height={100}
								width={100}
							/>
						</div>
						<div style={{ width: "200px" }}>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								{item?.productDetailsObj?.name}
								<div className="col-2 col-lg-3"></div>
							</div>

							<div className="mt-2">Quantity {item?.quantity}</div>
						</div>
					</div>
				))}
				<hr />
			</div>
		</>
	);
};

export default ModalCartItem;
