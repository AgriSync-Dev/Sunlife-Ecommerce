import React, { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { AiOutlineLeft } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { htmlToDOM } from "html-react-parser";
import { currencyConversion, currencySymbol } from "../../utilities/currencyConversion";

const OrderDetails = ({ item, index }) => {
	const [open, setOpen] = useState(false);
	const [ShoeAddress, setShoeAddress] = useState(false);
	const [SubTotal, setSubTotal] = useState(0);
	const [openIndexes, setOpenIndexes] = useState([]);

	const toggleOrder = (clickedIndex) => {
		const currentIndexes = [...openIndexes];

		// Check if the clicked index is already in the openIndexes array
		const indexPosition = currentIndexes.indexOf(clickedIndex);

		// If the clicked index is already open, remove it from the array
		if (indexPosition !== -1) {
			currentIndexes.splice(indexPosition, 1);
		} else {
			// If the clicked index is not open, add it to the array
			currentIndexes.push(clickedIndex);
		}

		// Update the state with the new array of openIndexes
		setOpenIndexes(currentIndexes);
	};

	const toggleCollapse = () => {
		setOpen(!open); // Toggle the state of the collapse
	};

	useEffect(() => {
		let total = 0;
		item?.productDetail.forEach((product) => {
			const price = product?.productDetailsObj?.discountedSalePrice
				? product?.productDetailsObj?.discountedSalePrice
				: product?.productDetailsObj?.price;
			total += product?.quantity * price;
		});
		setSubTotal(total);
	}, [item]);
	return (
		<div className="text-black">
			<div class=" accordion d-none d-sm-block mb-2" id={`name${index}`}>
				{
					<div class="accordion-item">
						<h2 class="accordion-header" id={`name${index}`}>
							<button
								class="accordion-button collapsed"
								type="button"
								onClick={() => toggleOrder(index)} // Toggle the clicked item
								aria-expanded={openIndexes.includes(index)}
								aria-controls={`Name${index}`}
							>
								<div
									className="d-flex justify-content-between align-items-center w-100"
									style={{ cursor: "pointer" }}
									key={index}
								>
									<ul
										className="nav colomn mt-3 w-100  "
										style={{ gap: "10px" }}
									>
										<li className="nav-item col-3 col-md-3 col-lg-3 ">
											{item?.createdAt.slice(0, 10)}
										</li>
										<li className="nav-item col-3 col-md-2 col-lg-3 no-wrap">
											{item?.orderNo}
										</li>
										<li className="nav-item col-3 col-md-3 col-lg-2 text-capitalize">
											{item?.orderStatus == "fulfilled" ? (
												<span> Order Sent</span>
											) : item?.orderStatus == "unfulfilled" ||
												item?.orderStatus == "partiallyfulfilled" ? (
												<span>Order Received</span>
											) : item?.orderStatus == "canceled" ? (
												<span>Order Canceled</span>
											) : (
												""
											)}
										</li>
										<li className="nav-item col-2 col-md-2 ">
											{currencySymbol(item?.currency)} {item?.amountToPay}
										</li>
									</ul>
								</div>
							</button>
						</h2>
						<div
							id={`Name${index}`}
							class={`accordion-collapse collapse ${openIndexes.includes(index) ? "show" : ""
								}`}
							aria-labelledby={`#name${index}`}
							data-bs-parent={`#name${index}`}
						>
							<div class="accordion-body  style={{ overflow: 'auto' }}">
								{item?.productDetail.map((product) => {
									console.log(product, "myproduct123");
									return (
										<>
											<div className="d-flex justify-content-between py-3 flex-wrap fl px-1">
												<div className=" d-flex flex-wrap gap-3 ">
													<LazyLoadImage
														effect="blur"
														className="border"
														src={product?.productDetailsObj?.productImageUrl}
														width={170}
														height={170}
													></LazyLoadImage>
													<div>
														<p>{product?.productDetailsObj?.name}</p>
														<div className="d-flex h6">
															{product?.productDetailsObj?.selectedVariant
																?.pots ? (
																<div>
																	<p className="px-1 text-secondary h6 ">
																		( Pots:
																		{
																			product?.productDetailsObj
																				?.selectedVariant?.pots
																		}
																		)
																	</p>
																</div>
															) : (
																<div> </div>
															)}

															{product?.productDetailsObj?.selectedVariant
																?.size ? (
																<div>
																	<p className="px-1 text-secondary h6">
																		( Size:
																		{
																			product?.productDetailsObj
																				?.selectedVariant?.size
																		}
																		)
																	</p>
																</div>
															) : (
																<div> </div>
															)}
														</div>
														<div className="d-flex">
															<p
																className={`opacity-50 ${product?.productDetailsObj
																	?.discountedSalePrice
																	? "text-decoration-line-through ms-2"
																	: ""
																	}`}
															>
																{currencyConversion(item?.currency,
																	product?.productDetailsObj?.price,
																	item?.currencyRate
																)}
															</p>
															{product?.productDetailsObj
																?.discountedSalePrice ? (
																<p className="opacity-40 ms-2 text-success">
																	{currencyConversion(item?.currency,
																		product?.productDetailsObj?.discountedSalePrice,
																		item?.currencyRate
																	)}
																</p>
															) : (
																""
															)}
														</div>
														{product?.productDetailsObj?.discountedSalePrice ? (
															<p className="opacity-40 text-info">
																{product?.productDetailsObj?.couponName}
															</p>
														) : (
															""
														)}

														<div className="d-flex">
															{" "}
															<div className="d-flex text-nowrap">
																Invoice :{" "}
															</div>{" "}
															{item?.invoice ? (
																<Link
																	className="ms-1  text-decoration-underline text-primary"
																	to={item?.invoice}
																	target="_blank"
																	style={{ textDecorationColor: "black" }}
																>
																	{" "}
																	<p className="text-primary">
																		Download Invoice{" "}
																	</p>{" "}
																</Link>
															) : null}{" "}
														</div>

														<div className="d-flex">
															{" "}
															<div className="d-flex text-nowrap">
																Tracking URL :{" "}
															</div>{" "}
															{item?.trackingURL ? (
																<Link
																	className="ms-1"
																	to={item?.trackingURL}
																	target="_blank"
																	style={{ textDecorationColor: "black" }}
																>
																	{" "}
																	<p className="text-dark">Track Item </p>{" "}
																</Link>
															) : (
																<div className="ms-1">Not assigned </div>
															)}{" "}
														</div>
													</div>
												</div>
												<div>
													<p>Qty : {product?.quantity}</p>
												</div>
												<div>
													<p
														className={`opacity-50 ${product?.productDetailsObj?.discountedSalePrice
															? "text-decoration-line-through "
															: ""
															}`}
													>
														{currencyConversion(item?.currency,
															(product?.quantity * product?.productDetailsObj?.price),
															item?.currencyRate
														)}
													</p>
													{product?.productDetailsObj?.discountedSalePrice ? (
														<p>
															{currencyConversion(item?.currency,
																(product?.quantity * product?.productDetailsObj?.discountedSalePrice),
																item?.currencyRate
															)}
														</p>
													) : (
														""
													)}
												</div>
											</div>

											{product.hasOwnProperty("subProduct") ? (
												<p>Products:</p>
											) : null}
											{product?.subProduct?.map((item, index) => (
												<div
													style={{ marginLeft: 18 }}
													className="d-flex justify-content-between py-2 px-1"
												>
													<div className=" d-flex gap-4">
														<LazyLoadImage
															effect="blur"
															className="border"
															src={item?.productDetailsObj?.productImageUrl}
															width={90}
															height={90}
														></LazyLoadImage>
														<div>
															<p>{item?.productDetailsObj?.name}</p>
														</div>
													</div>
													<div>
														<p>Qty : {item?.quantity}</p>
													</div>
												</div>
											))}
											<div className="border border-1  border-top-0 mt-1 mx-1 "></div>
										</>
									);
								})}
								<div id="example-collapse-text">
									<div className="d-flex  justify-content-center  justify-content-md-end ">
										<div className="w-50">
											<div className="mt-4 ">
												<div className="d-flex justify-content-between gap-5">
													<p>Subtotal</p>
													<p className="px-1">
														{currencySymbol(item?.currency)} {(item?.amountToPay - item?.deliveryCharge).toFixed(2)}
													</p>
												</div>
												<div className="d-flex justify-content-between gap-5">
													<p>Shipping</p>
													{item.couponType === "free_shipping" ? (
														<p className="px-1 ">{currencySymbol(item?.currency)} {item?.couponDiscount} </p>
													) : (
														<p className="px-1">{currencySymbol(item?.currency)} {item?.deliveryCharge}</p>
													)}
												</div>

												<div className="d-flex justify-content-between gap-2">
													{item.couponName && <p>Coupon</p>}
												</div>
												{item.couponName && (
													<div className="d-flex justify-content-between gap-2">
														<p className="px-1 text-info">{item.couponName}</p>
														<p className="text-success">
															-{currencySymbol(item?.currency)} {item?.couponDiscount}
														</p>
													</div>
												)}

												<div className="d-flex justify-content-between gap-5">
													<p>Tax</p>
													<p className="px-1">{currencySymbol(item?.currency)}00</p>
												</div>
											</div>
											<div className="border border-1  border-top-0 mt-1 mx-1"></div>

											<div className="mt-4 ">
												<div className="d-flex justify-content-between gap-5">
													<p style={{ fontSize: "20px" }}>Total</p>
													<p style={{ fontSize: "20px" }} className="px-1">
														{currencySymbol(item?.currency)} {item?.amountToPay}
													</p>
												</div>
											</div>
											<div className="border border-1  border-top-0 mt-1 mx-1"></div>

											<div className="mt-4 ">
												<div className="d-flex justify-content-between gap-5">
													<p style={{ fontSize: "20px" }}>Paid</p>
													<p style={{ fontSize: "20px" }} className="px-1">
														{currencySymbol(item?.currency)}
														{item?.paymentStatus != "unpaid"
															? item?.amountToPay
															: "00"
														}
													</p>
												</div>
												<div className="d-flex justify-content-between gap-5">
													<p>Balance due</p>
													<p className="px-1">
														{currencySymbol(item?.currency)}
														{item?.paymentStatus == "unpaid"
															? `${item?.amountToPay}`
															: "00"
														}
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="border border-1  border-top-0 mt-1 mx-1"></div>

									<div className="d-flex justify-content-between">
										<div className="w-50">
											<div className="mt-5">
												<div style={{ fontSize: "15px" }}>
													Billing Information
												</div>
												<div className="mt-2" style={{ fontSize: "15px" }}>
													{item?.paymentStatus != "unpaid"
														? "Paid with 360"
														: "Payment Due"}
												</div>
											</div>
											<div className="mt-4">
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{
														item?.shippingAdderess?.shippingAddressObj
															?.firstName
													}{" "}
													{item?.shippingAdderess?.shippingAddressObj?.lastName}
												</div>
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{item?.shippingAdderess?.shippingAddressObj?.address}{" "}
												</div>
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{
														item?.shippingAdderess?.shippingAddressObj
															?.addressLine2
													}{" "}
												</div>
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{item?.shippingAdderess?.shippingAddressObj?.city}{" "}
													{item?.shippingAdderess?.shippingAddressObj?.country}{" "}
												</div>
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{item?.shippingAdderess?.shippingAddressObj?.phone}{" "}
												</div>
											</div>
										</div>
										<div className="w-50">
											<div className="mt-5">
												<div style={{ fontSize: "15px" }}>
													Shipping Information
												</div>
												<div className="mt-2" style={{ fontSize: "15px" }}>
													{item?.paymentStatus != "unpaid"
														? "Paid with 360"
														: "Payment Due"}
												</div>
											</div>
											<div className="mt-4">
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{
														item?.shippingAdderess?.shippingAddressObj
															?.firstName
													}{" "}
													{item?.shippingAdderess?.shippingAddressObj?.lastName}
												</div>
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{item?.shippingAdderess?.shippingAddressObj?.address}{" "}
												</div>
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{
														item?.shippingAdderess?.shippingAddressObj
															?.addressLine2
													}{" "}
												</div>
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{item?.shippingAdderess?.shippingAddressObj?.city}{" "}
													{item?.shippingAdderess?.shippingAddressObj?.country}{" "}
												</div>
												<div
													style={{ fontSize: "15px" }}
													className="opacity-50"
												>
													{item?.shippingAdderess?.shippingAddressObj?.phone}{" "}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</div>

			<div className="d-sm-none">
				{open ? (
					""
				) : (
					<div
						className="d-flex justify-content-between"
						onClick={() => setOpen(!open)}
					>
						<div>
							<div className="p-3">
								<h5 className="opacity-50">
									Date : {item?.createdAt.slice(0, 10)}{" "}
								</h5>
								<h5 className="opacity-75">Order No : {item?.orderNo} </h5>
								<h5 className="opacity-50">
									Status :{" "}
									{item?.orderStatus == "fulfilled" ? (
										<span> Order Sent</span>
									) : item?.orderStatus == "unfulfilled" ||
										item?.orderStatus == "partiallyfulfilled" ? (
										<span>Order Received</span>
									) : item?.orderStatus == "canceled" ? (
										<span>Order Canceled</span>
									) : (
										""
									)}
								</h5>
								<h5 className="opacity-50">Total : {currencySymbol(item?.currency)} {item?.amountToPay} </h5>
							</div>
						</div>
						<div>
							<div className=" " style={{ marginTop: "10px" }}>
								{open ? (
									<div>
										<FaAngleUp />
									</div>
								) : (
									<div>
										<FaAngleDown />
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				<div className="border border-1 border-dark border-top-0 "></div>
				<div>
					<Collapse in={open}>
						<div id="example-collapse-text">
							<div
								onClick={toggleOrder}
								className="d-flex align-items-center mt-4"
							>
								<h4
									onClick={() => setOpen(!open)}
									aria-controls="example-collapse-text"
									aria-expanded={open}
								>
									{" "}
									<AiOutlineLeft /> Back
								</h4>
							</div>
							<div>
								<div className="p-0 my-4">
									<h5 className="opacity-50 p-1">
										Date : {item?.createdAt.slice(0, 10)}{" "}
									</h5>
									<h5
										className="opacity-75 anton p-1"
										style={{ fontSize: "26px" }}
									>
										Order No : {item?.orderNo}{" "}
									</h5>
									<h5 className="opacity-50 p-1">
										Status :{" "}
										{item?.orderStatus == "fulfilled" ? (
											<span> Order Sent</span>
										) : item?.orderStatus == "unfulfilled" ||
											item?.orderStatus == "partiallyfulfilled" ? (
											<span>Order Received</span>
										) : item?.orderStatus == "canceled" ? (
											<span>Order Canceled</span>
										) : (
											""
										)}
									</h5>
									<h5 className="opacity-50 p-1">
										Total : {currencySymbol(item?.currency)} {item?.amountToPay}{" "}
									</h5>
								</div>
								<div className="border border-1 border-top-0 "></div>
								<div></div>
							</div>
							<div className="border border-1 border-dark border-top-0 opacity-50 "></div>
							{item?.productDetail.map((product) => {
								return (
									<>
										<div className="mt-2 p-2 my-3">
											<h4 className="my-3">
												{product?.productDetailsObj?.name}
											</h4>
											<h5 className="d-flex h6">
												{product?.productDetailsObj?.selectedVariant?.pots ? (
													<div>
														<h6 className="px-1 text-secondary h6 ">
															(pots:
															{
																product?.productDetailsObj?.selectedVariant
																	?.pots
															}
															)
														</h6>
													</div>
												) : (
													<div> </div>
												)}

												{product?.productDetailsObj?.selectedVariant?.size ? (
													<div>
														<h6 className="px-1 text-secondary h6">
															(size:
															{
																product?.productDetailsObj?.selectedVariant
																	?.size
															}
															)
														</h6>
													</div>
												) : (
													<div> </div>
												)}
											</h5>
											<div className="d-flex  gap-4">
												<div>
													<LazyLoadImage
														effect="blur"
														className="border"
														src={product?.productDetailsObj?.productImageUrl}
														width={100}
													></LazyLoadImage>
												</div>
												<div>
													<div className="d-flex">
														<p
															className={`opacity-50 ${product?.productDetailsObj?.discountedSalePrice
																? "text-decoration-line-through ms-2"
																: ""
																}`}
														>
															{currencyConversion(
																item?.currency,
																product?.productDetailsObj.price,
																item?.currencyRate
															)}
														</p>
														{product?.productDetailsObj?.discountedSalePrice ? (
															<p className="opacity-40 ms-2 text-success">
																{currencyConversion(
																	item?.currency,
																	product?.productDetailsObj?.discountedSalePrice,
																	item?.currencyRate
																)}
															</p>
														) : (
															""
														)}
													</div>
													{product?.productDetailsObj?.discountedSalePrice ? (
														<p className="opacity-40 text-info">
															{product?.productDetailsObj?.couponName}
														</p>
													) : (
														""
													)}
												</div>
											</div>
											<div className="d-flex justify-content-between mt-3">
												<div>
													<p>Qty : {product?.quantity}</p>
												</div>
												<div className="">
													<p
														className={`opacity-50 ${product?.productDetailsObj?.discountedSalePrice
															? "text-decoration-line-through "
															: ""
															}`}
													>
														{currencyConversion(
															item?.currency,
															(product?.quantity * product?.productDetailsObj
																?.price),
															item?.currencyRate
														)}
													</p>
													{product?.productDetailsObj?.discountedSalePrice ? (
														<p>
															Total : {" "}
															{currencyConversion(
																item?.currency,
																(product?.quantity * product?.productDetailsObj
																	?.discountedSalePrice),
																item?.currencyRate
															)}
														</p>
													) : (
														""
													)}
												</div>
											</div>
											<div className="d-flex">
												{" "}
												<div>Tracking URL : </div>{" "}
												{item?.trackingURL ? (
													<Link
														className="ms-1"
														to={item?.trackingURL}
														target="_blank"
														style={{ textDecorationColor: "black" }}
													>
														{" "}
														<p className="text-dark">Track Item </p>{" "}
													</Link>
												) : (
													<div className="ms-1">Not assigned </div>
												)}{" "}
											</div>
										</div>
									</>
								);
							})}
							<div className="border border-1 border-dark border-top-0  opacity-50"></div>
							<div className="mt-4  ">
								<div className="d-flex justify-content-between gap-5">
									<p>Subtotal</p>

									<p className="px-1">{currencySymbol(item?.currency)} {(item?.amountToPay - item?.deliveryCharge).toFixed(2)}</p>
								</div>
								<div className="d-flex justify-content-between gap-5">
									<p>Shipping</p>
									{item.couponType === "free_shipping" ? (
										<p className="px-1 text-decoration-line-through">
											{currencySymbol(item?.currency)} {item?.couponDiscount}
										</p>
									) : (
										<p className="px-1">{currencySymbol(item?.currency)} {item?.deliveryCharge}</p>
									)}
								</div>

								<div className="d-flex justify-content-between gap-2">
									<p>Coupon</p>
								</div>

								<div className="d-flex justify-content-between gap-2">
									{item.couponName ? (
										<>
											<p className="px-1 text-info">{item.couponName} </p>
											<p className="text-success">-{currencySymbol(item?.currency)} {item?.couponDiscount}</p>
										</>
									) : (
										<p className="px-1"></p>
									)}
								</div>
								<div className="d-flex justify-content-between gap-5">
									<p>Tax</p>
									<p className="px-1"> {currencySymbol(item?.currency)} 00</p>
								</div>
							</div>
							<div className="border border-1 border-dark border-top-0 opacity-50 "></div>
							<div className="d-flex justify-content-between py-4">
								<h5>Total : </h5>
								<h5>{currencySymbol(item?.currency)} {item?.amountToPay}</h5>
							</div>
							<div className="border border-1 border-dark border-top-0  opacity-50"></div>
							<div
								className="border border-1 border-dark border-top-0 opacity-50 "
								style={{ marginTop: "15px" }}
							></div>
							<div className="d-flex justify-content-between py-4">
								<h5>Paid : </h5>
								<h5>
									{currencySymbol(item?.currency)} {item?.paymentStatus != "unpaid" ? item?.amountToPay : "00"}
								</h5>
							</div>
							<div className="border border-1 border-dark border-top-0 opacity-50"></div>
							<div className="d-flex justify-content-between py-4">
								<h6>Balance Due : </h6>
								<h6>
									{currencySymbol(item?.currency)} {item?.paymentStatus == "unpaid" ? item?.amountToPay : "00"}
								</h6>
							</div>
							<div>
								<div
									onClick={() => setShoeAddress(!ShoeAddress)}
									className="d-flex justify-content-between align-items-center"
								>
									<h6> Shipping & Billing Info </h6>
									<p>{ShoeAddress ? <FaAngleUp /> : <FaAngleDown />}</p>
								</div>
								<Collapse in={ShoeAddress}>
									<div id="example-collapse-text">
										<div className="" style={{ marginBottom: "10px" }}>
											<div className="">
												<div className="">
													<div style={{ fontSize: "15px" }}>
														Billing Information
													</div>
													<div className="mt-2" style={{ fontSize: "15px" }}>
														{item?.paymentStatus != "unpaid"
															? "Paid with 360"
															: "Payment Due"}
													</div>
												</div>
												<div className="mt-2">
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{
															item?.shippingAdderess?.shippingAddressObj
																?.firstName
														}{" "}
														{
															item?.shippingAdderess?.shippingAddressObj
																?.lastName
														}
													</div>
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{
															item?.shippingAdderess?.shippingAddressObj
																?.address
														}{" "}
													</div>
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{
															item?.shippingAdderess?.shippingAddressObj
																?.addressLine2
														}{" "}
													</div>
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{item?.shippingAdderess?.shippingAddressObj?.city}{" "}
														{
															item?.shippingAdderess?.shippingAddressObj
																?.country
														}{" "}
													</div>
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{item?.shippingAdderess?.shippingAddressObj?.phone}{" "}
													</div>
												</div>
											</div>
											<div className=" mt-3">
												<div className="">
													<div style={{ fontSize: "15px" }}>
														Shipping Information
													</div>
													<div className="mt-2" style={{ fontSize: "15px" }}>
														{item?.paymentStatus != "unpaid"
															? "Paid with 360"
															: "Payment Due"}
													</div>
												</div>
												<div className="mt-2">
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{
															item?.shippingAdderess?.shippingAddressObj
																?.firstName
														}{" "}
														{
															item?.shippingAdderess?.shippingAddressObj
																?.lastName
														}
													</div>
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{
															item?.shippingAdderess?.shippingAddressObj
																?.address
														}{" "}
													</div>
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{
															item?.shippingAdderess?.shippingAddressObj
																?.addressLine2
														}{" "}
													</div>
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{item?.shippingAdderess?.shippingAddressObj?.city}{" "}
														{
															item?.shippingAdderess?.shippingAddressObj
																?.country
														}{" "}
													</div>
													<div
														style={{ fontSize: "15px" }}
														className="opacity-50"
													>
														{item?.shippingAdderess?.shippingAddressObj?.phone}{" "}
													</div>
												</div>
											</div>
										</div>
									</div>
								</Collapse>
								<div className="border border-1 border-dark border-top-0  "></div>
							</div>
						</div>
					</Collapse>
				</div>
			</div>
		</div>
	);
};
export default OrderDetails;
