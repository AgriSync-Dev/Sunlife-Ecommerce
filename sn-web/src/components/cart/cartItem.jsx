import React, { useEffect, useState } from "react";
import { apiPOST } from "../../utilities/apiHelpers";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CurrencyConvertComp from "../currencyConvertComp";

const CartItem = ({ cartDetail, getMyCart }) => {
	const [count, setCount] = useState(cartDetail?.quantity);
	const { userData } = useSelector((state) => state.user);
	const [cartUpdating, setCartUpdating] = useState(false);

	const noUserRemoveItemFromCart = async (product) => {
		try {
			setCartUpdating(true);

			let payload = {
				productId: product?.productId,
				deviceId: localStorage.getItem("deviceId"),
				cartId: product?._id,
			};
			const response = await apiPOST("v1/cart/nouser-remove-from-cart", payload);
			setCartUpdating(false);
			if (response?.data?.status) {
				toast.success(response?.data?.data);
				getMyCart();
			} else {
				getMyCart();
				toast.error("Error while Product removing!");
			}
		} catch (error) {
			setCartUpdating(false);
		}
	};

	const noUserAddToCart = async (product) => {
		try {
			setCartUpdating(true);
			let payload = {
				productId: product?.productId,
				deviceId: localStorage.getItem("deviceId"),
				cartId: product?._id,
			};
			const response = await apiPOST("v1/cart/nouser-add-to-cart", payload);
			setCartUpdating(false);
			if (response?.data?.status) {
				toast.success(response?.data?.data);
				getMyCart();
			} else {
				getMyCart();
				toast.error(response?.data?.data);
			}
		} catch (error) {
			setCartUpdating(false);
			toast.error(error?.message);
		}
	};

	const addToCart = async (product) => {
		try {
			setCartUpdating(true);
			let payload = {
				productId: product?.productId,
				cartId: product?._id,
			};
			const response = await apiPOST("v1/cart/add-to-cart", payload);
			setCartUpdating(false);
			if (response?.data?.status) {
				getMyCart();
				toast.success(response?.data?.data?.data);
				return true;
			} else {
				getMyCart();
				toast.error(response?.data?.data);
				return false;
			}
		} catch (error) {
			setCartUpdating(false);
			return false;
		}
	};

	const removeFromCart = async (product) => {
		try {
			setCartUpdating(true);
			let payload = {
				productId: product?.productId,
				cartId: product?._id,
			};
			const response = await apiPOST("v1/cart/remove-from-cart", payload);
			setCartUpdating(false);
			if (response?.data?.status) {
				toast.success(response?.data?.data?.data);
				getMyCart();
				return true;
			} else {
				getMyCart();
				toast.error(response?.data?.data?.data);
				return false;
			}
		} catch (error) {
			setCartUpdating(false);
			return false;
		}
	};

	function increment() {
		setCount(function (prevCount) {
			const res = userData ? addToCart(cartDetail) : noUserAddToCart(cartDetail);
			if (res) {
				return (prevCount += 1);
			} else {
				toast.error("getting error while  adding to cart");
			}
		});
	}

	const removeCart = async () => {
		try {
			let payload = {
				productId: cartDetail?.productId,
				cartId: cartDetail?._id,
			};

			const response = await apiPOST("v1/cart/remove-cart", payload);
			if (response?.data?.code) {
				toast.success("Cart Removed Successfully");
				getMyCart();
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
			if (response?.data?.code) {
				toast.success("Cart Removed Successfully");
				getMyCart();
			} else {
				toast.error("Error while Product removing!");
			}
		} catch (error) {}
	};

	const handleClickRemoveCart = async () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				removeCart();
				Swal.fire("Deleted!", "Your product has been deleted.", "success");
			}
		});
	};

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

	return (
		<div className=" ">
			<div className="row">
				<div
					className="col-11 d-flex flex-wrap gap-3 p-2"
					style={{
						maxWidth: "calc(100% - 36px)",
						// boxShadow: "-2px -2px 2px rgba(0,0,0, 0.2), 2px 2px 2px rgba(0,0,0, 0.2), 2px 2px 2px rgba(0,0,0, 0.2)",
						// gap: "12px"
					}}
				>
					<div className="col-2 mb-1">
						<LazyLoadImage
							effect="blur"
							src={cartDetail?.productDetails[0]?.productImageUrl}
							alt={cartDetail?.productDetails[0]?.imageAltText || cartDetail?.productDetails[0]?.name}
							style={{ width: "100%" }}
						/>
					</div>
					<div className="d-flex col-9 col-sm-7 col-md-4 justify-content-between " style={{ gap: "20px" }}>
						<div>
							<div className="fw-bold">{cartDetail?.productDetails[0]?.name}</div>
							{cartDetail?.couponName ? (
								<div className="" style={{ fontSize: "14px", color: "#0396ff" }}>
									{cartDetail?.couponName}
								</div>
							) : (
								""
							)}
							<div style={{ fontSize: "14px", color: "#7f7f7f" }}>
								{cartDetail?.variants?.pots
									? `(${cartDetail?.variants?.pots} Pots)`
									: cartDetail?.variants?.size
									? `(${cartDetail?.variants?.size} size) `
									: ""}
							</div>

							<div className="mt-1">
								<p>
									{cartDetail?.sale_price ? (
										<span>
											<span className="line-through-text me-2">
												<CurrencyConvertComp amount={cartDetail?.productDetails[0]?.price} />
											</span>
											<CurrencyConvertComp amount={cartDetail?.sale_price} />
										</span>
									) : (
										<span>
											<CurrencyConvertComp amount={cartDetail?.productDetails[0]?.price} />
										</span>
									)}
								</p>
							</div>
						</div>
					</div>

					{!cartDetail?.productDetail[0]?.subProduct?.length ? (
						<div
							className="d-flex col-12 col-sm-8 col-md-5 gap-2 justify-content-between align-items-center"
							style={{ height: "max-content" }}
						>
							<div
								className="d-flex align-items-center border border-secondary"
								style={{ gap: "12px", height: "max-content" }}
							>
								<svg
									onClick={decrement}
									style={{ cursor: "pointer" }}
									width="28"
									height="28"
									fill="currentColor"
									class="bi bi-dash"
									viewBox="0 0 16 16"
								>
									<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
								</svg>
								{cartUpdating ? (
									<div
										aria-hidden="true"
										className="placeholder rounded"
										style={{ width: "28px", height: "30px" }}
									></div>
								) : (
									<div className="fs-5">{cartDetail?.quantity}</div>
								)}
								<svg
									onClick={increment}
									style={{ cursor: "pointer" }}
									width="28"
									height="28"
									fill="currentColor"
									class="bi bi-plus"
									viewBox="0 0 16 16"
								>
									<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
								</svg>
							</div>
							<div className="">
								{cartDetail?.couponName && cartDetail?.sale_price ? (
									<span>
										<span className="line-through-text me-2">
											<CurrencyConvertComp
												amount={cartDetail?.quantity * cartDetail?.productDetails[0]?.price}
											/>
										</span>
										<span className="">
											<CurrencyConvertComp
												amount={cartDetail?.quantity * cartDetail?.sale_price}
											/>
										</span>
									</span>
								) : (
									<span>
										<CurrencyConvertComp
											amount={cartDetail?.quantity * cartDetail?.productDetails[0]?.price}
										/>
									</span>
								)}
							</div>
						</div>
					) : (
						<div
							className="d-flex col-12 col-sm-8 col-md-5 gap-2 justify-content-between align-items-center"
							style={{ gap: "12px", height: "max-content" }}
						>
							<div
								className="fs-4 border border-secondary px-2 "
								style={{ height: "32px", minWidth: "28px" }}
							>
								{cartDetail?.quantity}
							</div>
							<div className="">
								<CurrencyConvertComp
									amount={cartDetail?.quantity * cartDetail?.productDetails[0]?.price}
								/>
							</div>
						</div>
					)}
				</div>
				<div className="" style={{ width: 28, paddingRight: 0, paddingLeft: 0 }}>
					<svg
						className="mt-2 bi bi-x"
						onClick={userData ? removeCart : noUserRemoveCart}
						style={{ cursor: "pointer" }}
						width="28"
						height="28"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
					</svg>
				</div>
			</div>

			{cartDetail?.productDetail[0]?.subProduct?.length ? (
				<div className="mt-1">
					<div className="fw-bold fs-5">Sub Products :- </div>
					{cartDetail?.productDetail[0]?.subProduct.map((subItem, sIndex) => (
						<div
							key={sIndex}
							className="d-flex p-1 border-bottom border-bottom-secondary"
							style={{ gap: "12px" }}
						>
							<div className="">
								<LazyLoadImage
									effect="blur"
									src={subItem?.productDetailsObj?.productImageUrl}
									alt={subItem?.productDetailsObj?.imageAltText || subItem?.productDetailsObj?.name}
									width={70}
								/>
							</div>
							<div>
								<div className="fw-semibold" style={{ wordBreak: "normal" }}>
									{subItem?.productDetailsObj?.name}
								</div>
								<div className="fw-medium">Qty : {subItem?.quantity}</div>
							</div>
						</div>
					))}
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default CartItem;
