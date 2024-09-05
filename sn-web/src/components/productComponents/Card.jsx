import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiPOST } from "../../utilities/apiHelpers";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CurrencyConvertComp from "../currencyConvertComp";

const Card = ({ productDetail }) => {
	const { userData } = useSelector((s) => s.user);
	const [showQuickView, setShowQuickView] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	const addToCart = async (product) => {
		if (userData !== null) {
			try {
				let payload = { productId: product?._id };
				if (product?.variants?.length > 0) {
					payload.variants = product?.variants[0];
				}
				const response = await apiPOST("v1/cart/add-to-cart", payload);
				if (response?.status === 200) {
					toast.success(response?.data?.data?.data);
				} else {
					toast.error(response?.data?.data);
				}
			} catch (error) {
				toast.error("Error adding to cart");
			}
		} else {
			try {
				let payload = {
					productId: product?._id,
					deviceId: localStorage.getItem("deviceId"),
				};
				if (product?.variants?.length > 0) {
					payload.variants = product?.variants[0];
				}
				const response = await apiPOST("v1/cart/nouser-add-to-cart", payload);
				if (response?.data?.status === true) {
					toast.success(response?.data?.data.data?.data);
				} else {
					toast.error(response?.data?.data);
				}
			} catch (error) {
				toast.error("Error adding to cart");
			}
		}
	};

	const handleMouseEnter = () => {
		setShowQuickView(true);
	};

	const handleMouseLeave = () => {
		setShowQuickView(false);
	};

	const scrollToTop = () => {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	};

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	return (
		<div className="p-2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Link
				to={
					!productDetail?.name.includes("Pick 'n' Mix")
						? `/product-page/${productDetail?.name}`
						: `/mix-match/${productDetail?._id}`
				}
				onClick={scrollToTop}
			>
				<div className="card-container d-flex">
					<LazyLoadImage
						effect="blur"
						placeholderSrc="https://thesnuslife-asset.s3.amazonaws.com/1701775700134_whitebg.png"
						src={productDetail?.productImageUrl}
						alt={productDetail?.imageAltText || productDetail?.name}
						className="img-fluid position-relative"
						afterLoad={handleImageLoad}
					/>
					{!imageLoaded && (
						<img
							src="https://thesnuslife-asset.s3.amazonaws.com/1701775700134_whitebg.png"
							alt="Loading..."
							className="img-fluid position-relative"
						/>
					)}
					<div
						className="quick-view position-absolute d-flex align-items-center justify-content-center"
						style={{ bottom: 0, width: "100%" }}
					>
						{productDetail?.brand !== "Pick 'n' Mix" && showQuickView && (
							<div className="quick-view-content d-flex align-items-center justify-content-center py-2 text-dark">
								Quick View
							</div>
						)}
						{productDetail?.brand === "Pick 'n' Mix" && showQuickView && (
							<div className="quick-view-content d-flex align-items-center justify-content-center py-2 text-dark">
								{productDetail?.name}
							</div>
						)}
					</div>
				</div>
			</Link>
			<div>
				<div
					style={{ fontSize: "16px", whiteSpace: "normal", wordBreak: "break-word" }}
					className="card-title avenir-semibold text-center mt-3 cursor-pointer"
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

				<div className="d-flex justify-content-center mt-2" style={{ height: "40px" }}>
					{!productDetail?.name.includes("Pick 'n' Mix") && showQuickView && (
						<button
							type="button"
							className="bg-black text-white px-3"
							onClick={() => addToCart(productDetail)}
						>
							Add to Cart
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
