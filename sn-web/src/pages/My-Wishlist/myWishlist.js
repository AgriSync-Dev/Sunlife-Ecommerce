import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGET, apiPOST } from "../../utilities/apiHelpers";
import { toast } from "react-toastify";
import ProfileMenu from "../My-Profile/ProfileMenu";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CurrencyConvertComp from "../../components/currencyConvertComp";
import { IoClose } from "react-icons/io5";

const MyWishlist = () => {
	const [wishlist, setWishlist] = useState([]);
	const { userData } = useSelector((s) => s.user);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const getMyWishlist = async () => {
		try {
			setIsLoading(true);
			const response = await apiGET(`/v1/wishlist/get-wishlist-by-userId`);
			setIsLoading(false);
			if (response?.status === 200) {
				setWishlist(response?.data?.data?.data);
			} else {
				setWishlist([])
			}
		} catch (error) {
			setIsLoading(false);
			setWishlist([])
			console.error("Error fetching collection data:", error);
		}
	};

	const removeWishlist = async (product) => {
		try {
			let payload = { productId: product };
			const response = await apiPOST("v1/wishlist/delete", payload);
			getMyWishlist()
			if (response?.data?.status) {
				toast.success(response?.data?.data?.data);
			} else {
				toast.error(response?.data?.data);
			}
		} catch (error) {
			return false;
		}
	};

	useEffect(() => {
		// const interval = setInterval(() => {
		// 	getMyWishlist();
		// }, 2000);

		if (!userData) {
			toast.error("Please login first	");
			navigate("/");
		} else {
			getMyWishlist();
		}
		// return () => {
		// 	clearInterval(interval);
		// };
	}, []);

	return (
		<div className='py-5 d-flex justify-content-center'>
			<div className='container'>
				<div className='row gap-5 gap-lg-0'>
					<div className='col-lg-4'>
						<ProfileMenu />
					</div>
					<div className='col-lg-8'>
						<div className="anton fs-2">
							My Wishlist
						</div>
						<div className='mt-2'>
							View your wishlisted products.
						</div>
						<hr className='' />
						{wishlist?.length > 0 ?
							<div className="mt-4 d-flex flex-wrap gap-4">
								{wishlist?.map((item, wId) =>
									<div key={wId}
										className="position-relative"
										style={{ width: "250px" }}
									>
										<span
											onClick={() => removeWishlist(item?.productDetails[0]?._id)}
											style={{ cursor: "pointer" }}
											data-toggle="tooltip"
											data-placement="top"
											title="Close"
											className="position-absolute end-0 top-0"
										>
											<IoClose />
										</span>
										<LazyLoadImage
											effect="blur"
											className=""
											src={item?.productDetails[0]?.productImageUrl}
											width={120}
											height={120}
										></LazyLoadImage>
										<div className="fw-semibold mt-2" style={{minHeight:48}}>
											{item?.productDetails[0]?.name}
										</div>
										<div className=" mt-2">
											{item?.productDetails[0]?.originalPrice != item?.productDetails[0]?.price ?
												<div className="d-flex gap-2">
													<div className="text-decoration-line-through text-secondary">
														<CurrencyConvertComp amount={item?.productDetails[0]?.originalPrice} />
													</div>
													<div className="">
														<CurrencyConvertComp amount={item?.productDetails[0]?.price} />
													</div>
												</div>
												:
												<div className="">
													<CurrencyConvertComp amount={item?.productDetails[0]?.price} />
												</div>
											}
										</div>
										<Button
											onClick={()=>{
												navigate(`/product-page/${item?.productDetails[0]?.name}`)
											}}
											className="btn btn-dark mt-2 w-100"
										>
											View
										</Button>
									</div>)}
							</div>
							:
							wishlist?.length === 0 && isLoading ?
								<div
									className="d-flex flex-column align-items-center justify-content-center"
									style={{ height: 300 }}
								>
									<Spinner
										animation="border"
										style={{ color: "blue", marginTop: 5 }}
										role="status"
									>
										<span className="visually-hidden">
											Loading...
										</span>
									</Spinner>
								</div>
								:
								<div className='d-flex flex-column align-items-center justify-content-center'
									style={{ height: 300 }}>
									<div>
										You haven't added any products in wishlist yet
									</div>
									<Link className="text-black mt-2" to="/">
										Start Browsing
									</Link>
								</div>}
					</div>
				</div>
			</div>
		</div>
	)
};

export default MyWishlist;
