import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiPOST } from "../../utilities/apiHelpers";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CurrencyConvertComp from "../currencyConvertComp";

const CardCategory = ({ productDetail }) => {
	const { userData } = useSelector((s) => s.user);
	const [showQuickView, setShowQuickView] = useState(false);

	const addToCart = async (product) => {
		if (userData != null) {
			console.log(product);
			try {
				let payload = { productId: product };
				const response = await apiPOST("v1/cart/add-to-cart", payload);
				if (response?.data?.status) {
					// toast.success(response?.data?.data)
				} else {
					toast.error(response?.data?.data);
				}
			} catch (error) {
				return false;
			}
		} else {
			try {
				let payload = { productId: product, deviceId: localStorage.getItem("deviceId") };

				const response = await apiPOST("v1/cart/nouser-add-to-cart", payload);
				if (response?.data?.status == true) {
					toast.success(response?.data?.data?.message);
				} else {
					toast.error(response?.data?.data?.msg);
				}
			} catch (error) {
				return false;
			}
		}
	};

	const handleMouseEnter = () => {
		setShowQuickView(true);
	};

	const handleMouseLeave = () => {
		setShowQuickView(false);
	};

	return (
		<div className="p-2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Link to={`/product-page/${productDetail?.name}`}>
				<div className="card-container d-flex ">
					<LazyLoadImage
						effect="blur"
						src={productDetail?.productImageUrl}
						alt={productDetail?.imageAltText || productDetail?.name}
						className="img-fluid position-relative"
					/>
					<div
						className="quick-view position-absolute d-flex align-items-center justify-content-center"
						style={{ bottom: 0, width: "100%" }}
					>
						{showQuickView && (
							<div className="quick-view-content d-flex align-items-center justify-content-center py-2 ">
								Quick View
							</div>
						)}
					</div>
				</div>
			</Link>
			<div>
				<div
					style={{ fontSize: "16px", whiteSpace: "normal", wordBreak: "normal" }}
					className="card-title avenir-semibold text-center mt-3"
				>
					{productDetail?.name}
				</div>
				{productDetail?.originalPrice !== productDetail?.price && (
					<div className="card-text mt-2 text-center line-through-text">
						<CurrencyConvertComp amount={productDetail?.originalPrice} />
					</div>
				)}
				<div
					className={`card-text mt-${
						productDetail?.originalPrice !== productDetail?.price ? "1" : "2"
					} text-center`}
				>
					<CurrencyConvertComp amount={productDetail?.price} />
				</div>
				{/* 	<div className="d-flex justify-content-center mt-2" style={{ height: "40px" }}>
					{showQuickView && (
						<button type="button" class="bg-black text-white px-3" onClick={() => { addToCart(productDetail?._id) }} data-bs-toggle="offcanvas" data-bs-target="#Backdrop" >
							Add to Cart
						</button>
					)}
				</div> */}
			</div>
		</div>
	);
};

export default CardCategory;
