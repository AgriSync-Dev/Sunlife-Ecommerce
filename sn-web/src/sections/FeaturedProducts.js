import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiGET, apiPOST } from "../utilities/apiHelpers";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CurrencyConvertComp from "../components/currencyConvertComp";

const FeaturedProducts = () => {
	const [products, setProducts] = useState([]);
	const { userData } = useSelector((s) => s.user);

	const responsive = {
		desktop: {
			breakpoint: { max: 5000, min: 1024 },
			items: products?.length > 5 ? 6 : 5,
		},
		tablet: {
			breakpoint: { max: 1023, min: 768 },
			items: 4,
		},
		mobile: {
			breakpoint: { max: 768, min: 0 },
			items: 2,
		},
	};

	//update cart without logged in
	useEffect(() => {
		let deviceId = localStorage.getItem("deviceId");

		if (deviceId == null) {
			if (typeof userData == "undefined" || userData == null) {
				console.log("before adding device id----", localStorage.getItem("deviceId"));
				const userAgent = window.navigator.userAgent;
				const platform = window.navigator.platform;

				const randomString =
					Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);
				const timeStamp = new Date().getTime();

				const deviceID = `${userAgent}-${platform}-${randomString}-${timeStamp}`;
				console.log("device id----", deviceID);
				localStorage.setItem("deviceId", deviceID);
			}
		} else {
			console.log("device id already exisits", deviceId);
		}
	}, [userData]);

	// const getRandomProducts = (items, count) => {
	//   const shuffled = items.sort(() => 0.5 - Math.random());
	//   const selectedProducts = shuffled.slice(0, count);
	//   return selectedProducts;
	// };

	const getMyProducts = async () => {
		try {
			const res = await apiGET("/v1/products/getfeatured");
			if (res?.data?.data?.status) {
				const data = res?.data?.data?.data;
				setProducts(data);
			} else {
				console.error("Error fetching data:", res.error);
			}
		} catch (error) {
			console.error("Error fetching  data:", error);
		}
	};

	const addToCart = async (product) => {
		if (userData != null) {
			try {
				let payload = { productId: product };
				const response = await apiPOST("v1/cart/add-to-cart", payload);
				if (response?.data?.status) {
					toast.success(response?.data?.data);
				} else {
					toast.error(response?.data?.data);
				}
			} catch (error) {
				return false;
			}
		} else {
			try {
				let payload = {
					productId: product,
					deviceId: localStorage.getItem("deviceId"),
				};

				const response = await apiPOST("v1/cart/nouser-add-to-cart", payload);
				if (response?.data?.status === true) {
					toast.success(response?.data?.data?.message);
				} else {
					toast.error(response?.data?.data?.msg);
				}
			} catch (error) {
				return false;
			}
		}
	};

	useEffect(() => {
		getMyProducts();
	}, []);

	const navigate = useNavigate();

	return (
		<div
			className=""
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div>
				<h1 className="text-center anton my-4 fw-medium" style={{ fontSize: "44px" }}>
					<strong>Featured Products</strong>
				</h1>

				<div className="container d-none d-md-block overflow-hidden ">
					<Carousel
						responsive={responsive}
						autoPlay={true}
						arrows={true}
						infinite
						showDots={false}
						stopOnHover={true}
						swipeable={true}
						keyBoardControl={true}
						autoPlaySpeed={3000}
						className="w-100"
					>
						{products?.map((item, index) => (
							<div key={index} className="px-2" style={{}}>
								<div key={index} className="mt-2 mb-2 justify-content-between">
									<div
										className="cursor-pointer"
										onClick={() => {
											navigate(`/product-page/${item?.name}`, {
												state: products,
											});
										}}
									>
										<LazyLoadImage
											effect="blur"
											src={item?.productImageUrl}
											className="mw-100 "
											style={{ objectFit: "cover" }}
											alt={item?.imageAltText || item?.name}
										/>
									</div>
									<div class="card-body justify-center p-0 mt-4">
										<div
											className="cursor-pointer"
											onClick={() => {
												navigate(`/product-page/${item?.name}`, {
													state: products,
												});
											}}
										>
											<div style={{}}>
												<div
													className="text-dark avenir-bold "
													style={{
														whiteSpace: "normal",
														wordBreak: "normal",
													}}
												>
													{item?.name}
												</div>
												<CurrencyConvertComp amount={item?.price} />
											</div>
										</div>
										<div className="m-auto" style={{ height: "42px" }}>
											<button
												type="button"
												class="bg-black text-white border-1 rounded-2 hidden-btn m-auto px-3 py-2"
												onClick={() => {
													addToCart(item?.id);
												}}
											>
												Add to cart
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</Carousel>
				</div>

				<div className="d-block d-md-none container mt-5">
					{products?.length ? (
						<div className="row ">
							{products?.map((item, index) => (
								<div key={index} className="col-6" style={{}}>
									<div key={index} className="mt-2 mb-2 justify-content-between">
										<div
											className="cursor-pointer"
											onClick={() => {
												navigate(`/product-page/${item?.name}`, {
													state: products,
												});
											}}
										>
											<LazyLoadImage
												effect="blur"
												src={item?.productImageUrl}
												className="mw-100 "
												style={{ objectFit: "cover" }}
												alt={item?.imageAltText || item?.name}
											/>
										</div>
										<div class="card-body justify-center p-0 mt-4">
											<div
												className="cursor-pointer"
												onClick={() => {
													navigate(`/product-page/${item?.name}`, {
														state: products,
													});
												}}
											>
												<div style={{}}>
													<div
														className="text-dark avenir-bold "
														style={{
															whiteSpace: "normal",
															wordBreak: "normal",
														}}
													>
														{item?.name}
													</div>
													{item?.price ? <p><CurrencyConvertComp amount={item?.price} /></p> : ""}
												</div>
											</div>
											<div className="m-auto" style={{ height: "42px" }}>
												<button
													type="button"
													class="bg-black text-white border-1 rounded-2 hidden-btn m-auto px-3 py-2"
													onClick={() => {
														addToCart(item?.id);
													}}
												>
													Add to cart
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						""
					)}
				</div>

				<div className="d-flex justify-content-center mt-2">
					<button
						className="bg-black text-white border-1 rounded-2 px-3 py-2"
						style={{ fontSize: "14px" }}
						onClick={() => navigate("/shop")}
					>
						Shop All
					</button>
					<></>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
