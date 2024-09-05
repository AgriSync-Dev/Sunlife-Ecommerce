import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGET, apiPOST, apiPUT } from "../../utilities/apiHelpers";
import { Table } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";
import { Document, Page, View, Text, StyleSheet, Image, pdf } from "@react-pdf/renderer";
import { toast } from "react-toastify";

const Thankyou = () => {
	const [myOrders, setMyorders] = useState({});
	const [loading, setLoading] = useState(false);
	const [orderStatus, setOrderStatus] = useState(true);
	const [fileUrl, setFileUrl] = useState("");
	const [uploadProgress, setUploadProgress] = useState(0);
	const navigate = useNavigate();
	const params = useParams();

	const getOrderById = async () => {
		const response = await apiGET(`/v1/order/getOrderbyIdUser/${params.orderId}`);
		if (response?.data?.status) {
			setMyorders(response.data.data);
		} else {
			// toast.error("Payment Failed. Please try again.")
			// navigate("/cart")
		}
	};

	useEffect(() => {
		if (myOrders) {
			// Delay the execution of getOrderById by 100 milliseconds
			const timeoutId = setTimeout(() => {
				openPDFInNewTab();
			}, 2000);

			// Clear the timeout if the component unmounts or if orderId changes before the timeout
			return () => clearTimeout(timeoutId);
		}
	}, [myOrders]);

	useEffect(() => {
		if (params?.orderId) {
			let callCount = 0; // Initialize a counter to track the number of calls

			// Set up an interval to call getOrderById every 4 seconds
			const intervalId = setInterval(() => {
				getOrderById(); // Call the function

				callCount += 1; // Increment the call counter

				// If the function has been called 3 times, clear the interval
				if (callCount >= 3) {
					setOrderStatus(false);
					clearInterval(intervalId);
				}
			}, 4000); // Set the interval to 4 seconds

			// Clear the interval if the component unmounts or if orderId changes before all calls have been made
			return () => clearInterval(intervalId);
		}
	}, [params?.orderId]);

	const styles = StyleSheet.create({
		page: {
			flexDirection: "column",
			backgroundColor: "white",
		},
		row: {
			flexDirection: "row",
			width: "94%",
			alignSelf: "center",
		},
		section2: {
			margin: 3,
			padding: 3,
			flexGrow: 1,
			width: "80%",
		},
		section: {
			margin: 5,
			padding: 5,
			width: "90%",

			flexGrow: 1,
		},
		txt: {
			//textAlign:"right",
			fontWeight: "normal",
			fontSize: 11,
		},
		txtbold: {
			//textAlign:"right",
			fontWeight: "bold",
			fontSize: 12,
		},
		linethroughtxtbold: {
			//textAlign:"right",
			fontWeight: "bold",
			fontSize: 12,
			textDecoration: "line-through",
		},
		heading: {
			fontWeight: "bold",
			fontSize: 16,
			marginTop: 10,
			color: "black",
		},

		tableheading: {
			fontWeight: "bold",
			fontSize: 12,

			color: "grey",
		},
		line: {
			borderBottomColor: "grey",
			height: 3,
			width: "94%",
			alignSelf: "center",
			borderBottomWidth: 0.5,
		},
		lineright: {
			borderBottomColor: "grey",
			height: 3,
			width: "34%",
			marginRight: "3%",
			alignSelf: "flex-end",
			borderBottomWidth: 0.5,
		},
	});

	const generatePDF = (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.row}>
					<View style={styles.section}>
						<View style={{ marginTop: 10 }}></View>
						<Image
							style={{ height: 45, width: 140 }}
							src={"https://thesnuslife-asset.s3.amazonaws.com/logosnus.png"}
						/>
						<View style={{ marginTop: 10 }}></View>
					</View>
					<View style={styles.section}>
						<View style={{ marginTop: 10 }}></View>
						<View style={{ alignSelf: "flex-end" }}>
							<Text style={styles.txtbold}>THE SNUS LIFE</Text>
							<Text style={styles.txt}>New Road New Hall</Text>PAYMENT METHODS
							<Text style={styles.txt}>Essex Romford</Text>
							<Text style={styles.txt}>RM4 1AJ</Text>
							<View style={{ marginTop: 10 }}></View>
						</View>
					</View>
				</View>

				<View style={styles.line} />
				<View style={{ width: "90%", alignSelf: "center" }}>
					<Text style={styles.heading}>INVOICE</Text>
				</View>
				<View style={styles.row}>
					<View style={styles.section}>
						<Text style={styles.txtbold}>Reference</Text>
						<Text style={styles.txt}>{myOrders && myOrders?.orderNo}</Text>
					</View>
					<View style={styles.section}>
						<Text style={styles.txtbold}>Amount Due</Text>
						<Text style={styles.txt}>
							{currencySymbol(myOrders?.currency)} {myOrders && myOrders?.amountToPay}
						</Text>
					</View>
					<View style={styles.section}>
						<Text style={styles.txtbold}>Due Date</Text>
						<Text style={styles.txt}>None</Text>
					</View>
					<View style={styles.section}>
						<Text style={styles.txtbold}>To</Text>
						<Text style={styles.txt}>
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.firstName}{" "}
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.lastName}
						</Text>
						<Text style={styles.txt}>
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.address}
						</Text>
						<Text style={styles.txt}>
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.city}{" "}
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.country}
						</Text>
						<Text style={styles.txt}>
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.zip}
						</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.section}></View>
					<View style={styles.section}></View>
					<View style={styles.section}>
						<Text style={styles.txtbold}>Issue Date</Text>
						<Text style={styles.txt}>{moment(myOrders && myOrders?.createdAt).format("DD/MM/YYYY")}</Text>
					</View>
					<View style={styles.section}>
						<Text style={styles.txt}>
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.firstName}{" "}
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.lastName}
						</Text>
						<Text style={styles.txt}>
							{myOrders && myOrders?.shippingAdderess?.shippingAddressObj?.email}
						</Text>
					</View>
				</View>

				<View style={styles.line} />
				<View style={styles.row}>
					<View style={styles.section}>
						<Text style={styles.tableheading}>Description</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.section2}>
							<Text style={styles.tableheading}>Qty</Text>
						</View>
						<View style={styles.section2}>
							<Text style={styles.tableheading}>Unit cost</Text>
						</View>
						<View style={styles.section2}>
							<Text style={styles.tableheading}>VAT</Text>
						</View>
						<View style={styles.section2}>
							<Text style={styles.tableheading}>Amount</Text>
						</View>
					</View>
				</View>

				<View style={styles.line} />

				{/* add loop */}
				{myOrders &&
					myOrders?.productDetail?.map((item, i) => {
						return (
							<View>
								<View style={styles.row}>
									<View style={{ width: "90%", margin: 5, padding: 5 }}>
										<Text style={styles.txtbold}>{item?.productDetailsObj?.name}</Text>
										{item?.productDetailsObj?.selectedVariant?.pots ?
											(<Text style={styles.txt}>
												({item?.productDetailsObj?.selectedVariant?.pots}{" pots"})
											</Text>)
											: item?.productDetailsObj?.selectedVariant?.size ?
											(<Text style={styles.txt}>
												({item?.productDetailsObj?.selectedVariant?.size}{" size"})
											</Text>)
											:
											""
										}
									</View>

									<View style={styles.row}>
										<View style={styles.section2}>
											<Text style={styles.txtbold}>{item?.quantity}</Text>
										</View>

										<View style={styles.section2}>
											{item?.productDetailsObj?.discountedSalePrice ? (
												<View>
													<Text style={styles.linethroughtxtbold}>
														{/* {(item?.productDetailsObj?.originalPrice).toFixed(2)} */}
														{conversionWithoutCurrency({
															payAmount: item?.productDetailsObj?.originalPrice,
															payCurrencyRate: myOrders?.currencyRate
														})}
													</Text>
													<Text style={styles.txtbold}>
														{/* {(item?.productDetailsObj?.discountedSalePrice).toFixed(2)} */}
														{conversionWithoutCurrency({
															payAmount: item?.productDetailsObj?.discountedSalePrice,
															payCurrencyRate: myOrders?.currencyRate
														})}
													</Text>
												</View>
											) : (
												<Text style={styles.txtbold}>
													{/* {item?.productDetailsObj?.price?.toFixed(2)} */}
													{conversionWithoutCurrency({
														payAmount: item?.productDetailsObj?.price,
														payCurrencyRate: myOrders?.currencyRate
													})}
												</Text>
											)}
										</View>

										<View style={styles.section2}>
											<Text style={styles.txtbold}>-</Text>
										</View>
										<View style={styles.section2}>
											{item?.productDetailsObj?.discountedSalePrice ? (
												<Text style={styles.txtbold}>
													{currencyConversion({
														payAmount: (item?.quantity * item?.productDetailsObj?.discountedSalePrice),
														payCurrency: myOrders?.currency,
														payCurrencyRate: myOrders?.currencyRate
													})}
												</Text>
											) : (
												<Text style={styles.txtbold}>
													{currencyConversion({
														payAmount: (item?.quantity * item?.productDetailsObj?.price),
														payCurrency: myOrders?.currency,
														payCurrencyRate: myOrders?.currencyRate
													})}
												</Text>
											)}
										</View>
									</View>
								</View>
								{item?.subProduct?.length ? (
									<View>
										{item?.subProduct.map((subItem, j) => (
											<View>
												<View style={styles.row}>
													<View style={{ width: "90%", margin: 5, padding: 5 }}>
														<Text style={styles.txtbold}>
															{subItem?.productDetailsObj?.name}
														</Text>
													</View>
													<View style={styles.row}>
														<View style={styles.section2}>
															<Text style={styles.txtbold}>{subItem?.quantity}</Text>
														</View>
														<View style={styles.section2}>
															<Text style={styles.txtbold}>-</Text>
														</View>
													</View>
												</View>
											</View>
										))}
									</View>
								) : (
									""
								)}
							</View>
						);
					})}
				<View style={styles.line} />
				<View style={styles.row}>
					<View style={styles.section}>
						<View style={styles.section}></View>
					</View>
					<View style={styles.row}>
						<View style={styles.section}></View>

						<View style={styles.section}>
							<Text style={styles.tableheading}>SubTotal:</Text>
							<View style={{ marginTop: 10 }}></View>
							<Text style={styles.tableheading}>Delivery Charge:</Text>
							<View style={{ marginTop: 10 }}></View>

							<Text style={styles.tableheading}>VAT</Text>
						</View>
						<View style={styles.section}></View>
						<View style={styles.section}>
							<View style={{ alignSelf: "flex-end" }}>
								<Text style={styles.txtbold}>
									{currencySymbol(myOrders?.currency)}{" "}
									{(parseFloat(myOrders && myOrders?.amountToPay) -
										parseFloat(myOrders && myOrders?.deliveryCharge)?.toFixed(2)).toFixed(2)}
								</Text>
								<View style={{ marginTop: 10 }}></View>
								<Text style={styles.txtbold}>{currencySymbol(myOrders?.currency)} {myOrders && myOrders?.deliveryCharge}</Text>

								<View style={{ marginTop: 10 }}></View>
								<Text style={styles.txtbold}>
									{myOrders &&
										myOrders?.shippingAdderess?.shippingAddressObj?.country === "United Kingdom"
										? "20%"
										: "--"}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.lineright} />

				<View style={styles.row}>
					<View style={styles.section}>
						<View style={styles.section}></View>
					</View>
					<View style={styles.row}>
						<View style={styles.section}></View>

						<View style={styles.section}></View>
						<View style={styles.section}>
							<View style={{ alignSelf: "flex-end" }}>
								<Text style={styles.txtbold}>Total</Text>
								<View style={{ marginTop: 10 }}></View>
								<Text style={styles.txtbold}>{currencySymbol(myOrders?.currency)} {myOrders && myOrders?.amountToPay}</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.line} />
				<View style={{ ...styles.row, alignItems: "center", gap: 10 }}>
					<Text style={styles.heading}>
						PAYMENT STATUS : &nbsp;
						<Text style={{ color: "black", fontSize: 16, textTransform: "capitalize" }}>
							{myOrders.paymentStatus}{" "}
						</Text>
					</Text>
				</View>
				{/* <View style={styles.row}>
					<View style={styles.section}>
                          Paid
					
					</View>
					
				</View> */}
			</Page>
		</Document>
	);

	const uploadToCloud = async (file) => {
		if (loading) return;

		try {
			setLoading(true);
			const payload = {
				key: "uploads/" + new Date().getTime() + `${myOrders && myOrders?.orderNo}.pdf`,
				content: "application/pdf",
			};
			const response = await apiPOST("/v1/upload-file", payload);
			if (!response) return;
			var url = response?.data?.data;
			const fileObj = file;
			// console.log("file obj--------", fileObj, file, url)
			const handleProgress = (evt) => {
				let p = `${evt.type}: ${evt.loaded} bytes transferred\n`;
				var progress = Math.ceil((evt.loaded / evt.total) * 100);
				setUploadProgress(progress);
			};

			setLoading(true);

			setUploadProgress(0);

			var xhr = new XMLHttpRequest();
			xhr.open("PUT", url, true);
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.setRequestHeader("x-amz-acl", "public-read");
			xhr.setRequestHeader("Caches", false);
			xhr.setRequestHeader("Content-Type", "application/pdf");
			xhr.upload.addEventListener("progress", handleProgress, false);
			xhr.onload = function () {
				setLoading(false);
				if (xhr.readyState === 4) {
					let file_Url = url.split("?")[0];
					setFileUrl(file_Url);
					// console.log("fileurl---------------", file_Url)
					/* 	updateOrder({ orderSlipUrl: file_Url }) */

					// const iframe = document.createElement('iframe');

					// // Set the source URL for the iframe
					// iframe.src = file_Url;
					// iframe.width = '100%';
					// iframe.height = '100%';

					// let newTab = window.open(``, '_blank');
					// newTab.document.write(iframe.outerHTML);
					// newTab.document.close();
				} else {
					console.log("Could not upload image please try again---", "asset image");
				}
			};
			xhr.onerror = function (error) {
				setLoading(false);
				console.log("Could not upload image please try again", "asset image");
			};
			xhr.send(fileObj);
		} catch (error) {
			setLoading(false);
			setUploadProgress(0);
		}
	};

	// Function to open the PDF in a new tab
	const openPDFInNewTab = async () => {
		const blob = await pdf(generatePDF).toBlob();
		const url = URL.createObjectURL(blob);
		uploadToCloud(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${myOrders && myOrders?.orderNo}.pdf`;
	};

	const updateOrder = async () => {
		let id = myOrders && myOrders?._id;
		try {
			let payload = {
				invoice: fileUrl,
			};
			const response = await apiPUT(`/v1/order/updateorderbyid/${params?.orderId}`, payload);
			if (response.status === 200) {
			} else {
				Swal.fire({
					title: "Error!",
					text: response?.data?.data || "Something went wrong !",
					icon: "error",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Error",
				text: error,
				icon: "error",
			});
		} finally {
		}
	};

	function currencySymbol(payCurrency = "GBP") {
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: payCurrency || "GBP",
			minimumFractionDigits: 0
		});
		
		// Extract the currency symbol by formatting zero and removing the "0"
		const formattedCurrency = formatter.format(0).replace(/\d/g, '').trim();
		return formattedCurrency
	}

	function currencyConversion({ payCurrency = "GBP", payAmount = 0, payCurrencyRate = 1 }) {
		let convertedAmt = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: payCurrency || "GBP",
			minimumFractionDigits: 0
		}).format(Number(payAmount * payCurrencyRate).toFixed(2) || 0)
		let amt = convertedAmt.match(/[\d\.\,]+/g)
	
		let withSpace= convertedAmt.replace(amt, ` ${amt}`)
	
		return (
			<span>{withSpace}</span>
		)
	}
	function conversionWithoutCurrency({ payAmount = 0, payCurrencyRate = 1 }) {
		return <>{Number(payAmount * payCurrencyRate).toFixed(2)}</>
	}

	useEffect(() => {
		if (fileUrl && fileUrl.length > 0) {
			updateOrder(fileUrl);
		}
	}, [fileUrl]);

	return (
		<>
			{myOrders && Object.keys(myOrders).length > 0 ? (
				<div className=" container ">
					<div className="d-flex justify-content-center my-5">
						<div className="border border-1 border-dark p-3 col-12 col-lg-8">
							<div>
								{myOrders?.paymentType === "pay360" &&
									myOrders?.transaction[0]?.trxnResponse?.transaction?.status === "SUCCESS" ? (
									<div>
										<div className="fs-2 anton text-center">
											Thank You, {myOrders?.shippingAdderess?.shippingAddressObj?.firstName}
										</div>
										<p className="text-center mt-2 fw-medium">You will receive confirmation soon</p>
									</div>
								) : (
									<div>Order Failed</div>
								)}
							</div>
							<hr className="w-100" style={{ height: "2px" }} />
							<div className="">
								<div>
									<div className="bg-light fs-5 fw-semibold border-1 border-success d-flex justify-content-between p-2">
										<div>Order No. <span id="sn_order_no">{myOrders?.orderNo}</span></div>
										<div>Date : {moment(myOrders.createdAt).format("L")}</div>
									</div>

									<div>
										<Table responsive className="mb-0">
											<thead>
												<tr>
													<th style={{ minWidth: "350px" }}>Name</th>
													<th style={{ minWidth: "100px" }}>Quantity</th>
													<th style={{ minWidth: "150px" }}>Price</th>
													<th style={{ minWidth: "100px" }}>Product</th>
												</tr>
											</thead>
											<tbody>
												{myOrders?.productDetail?.map((item, i) => (
													<tr key={i}>
														<td>
															<div>{item?.productDetailsObj?.name}</div>
															<div>
																{item?.productDetailsObj?.selectedVariant?.pots ? (
																	<div
																		className=""
																		style={{ fontSize: "13px", color: "#0396ff" }}
																	>
																		(
																		{item?.productDetailsObj?.selectedVariant?.pots}{" "}
																		pots)
																	</div>
																) : item?.productDetailsObj?.selectedVariant?.size ? (
																	<div
																		className=""
																		style={{ fontSize: "13px", color: "#0396ff" }}
																	>
																		(
																		{item?.productDetailsObj?.selectedVariant?.size}{" "}
																		size)
																	</div>
																) : (
																	<div style={{ height: "24px" }}></div>
																)}
															</div>
															{item?.subProduct?.length ? (
																<div>
																	{item?.subProduct.map((subItem, j) => (
																		<div key={j} style={{ minHeight: "50px" }}>
																			{subItem?.productDetailsObj?.name}
																		</div>
																	))}
																</div>
															) : (
																""
															)}
														</td>
														<td>
															<div>{item?.quantity}</div>
															<div style={{ height: "24px" }}></div>
															{item?.subProduct?.length ? (
																<div>
																	{item?.subProduct.map((subItem, j) => (
																		<div key={j} style={{ minHeight: "50px" }}>
																			{subItem?.quantity}
																		</div>
																	))}
																</div>
															) : (
																""
															)}
														</td>
														<td>
															{item?.productDetailsObj?.discountedSalePrice ? (
																<div>
																	<div>
																		<div className="line-through-text" id="sn_order_product_original_price">
																			{currencyConversion({
																				payAmount: item?.productDetailsObj?.price,
																				payCurrency: myOrders?.currency,
																				payCurrencyRate: myOrders?.currencyRate
																			})}
																			
																		</div>
																		<div className="" id="sn_order_product_discounted_price">
																			{currencyConversion({
																				payAmount: item?.productDetailsObj?.discountedSalePrice,
																				payCurrency: myOrders?.currency,
																				payCurrencyRate: myOrders?.currencyRate
																			})}
																		</div>
																	</div>
																</div>
															) : (
																<div>
																	<div id="sn_order_product_price">
																		{currencyConversion({
																			payAmount: item?.productDetailsObj?.price,
																			payCurrency: myOrders?.currency,
																			payCurrencyRate: myOrders?.currencyRate
																		})}
																	</div>
																	<div style={{ height: "24px" }}></div>
																	{/* {item?.subProduct?.length ? (
																		<div>
																			{item?.subProduct.map((subItem, j) => (
																				<div
																					key={j}
																					style={{ minHeight: "50px" }}
																				>
																					{currencyConversion({
																						payAmount: subItem?.productDetailsObj?.price,
																						payCurrency: myOrders?.currency,
																						payCurrencyRate: myOrders?.currencyRate
																					})}
																				</div>
																			))}
																		</div>
																	) : (
																		""
																	)} */}
																</div>
															)}
														</td>
														<td>
															<img
																style={{ width: "50px", height: "50px" }}
																src={item?.productDetailsObj?.productImageUrl}
															/>
															{item?.subProduct?.length ? (
																<div>
																	{item?.subProduct.map((subItem, j) => (
																		<div key={j}>
																			<img
																				style={{
																					width: "50px",
																					height: "50px",
																				}}
																				src={
																					subItem?.productDetailsObj
																						?.productImageUrl
																				}
																			/>
																		</div>
																	))}
																</div>
															) : (
																""
															)}
														</td>
													</tr>
												))}
											</tbody>
										</Table>
									</div>
									<hr className="w-100" style={{ height: "2px" }} />
									<div className="mt-3">
										<h4 className="fw-semibold fs-5">Shipping Address : </h4>
										<div>
											<div className="d-flex gap-1">
												<span>
													{myOrders?.shippingAdderess?.shippingAddressObj?.firstName || ""}
												</span>
												<span>
													{myOrders?.shippingAdderess?.shippingAddressObj?.lastName || ""}
												</span>
											</div>
											{myOrders?.shippingAdderess?.shippingAddressObj?.email ? (
												<div>{myOrders?.shippingAdderess?.shippingAddressObj?.email}</div>
											) : (
												""
											)}
											{myOrders?.shippingAdderess?.shippingAddressObj?.address ? (
												<div>{myOrders?.shippingAdderess?.shippingAddressObj?.address}</div>
											) : (
												""
											)}
											{myOrders?.shippingAdderess?.shippingAddressObj?.addressLine2 ? (
												<div>
													{myOrders?.shippingAdderess?.shippingAddressObj?.addressLine2}
												</div>
											) : (
												""
											)}
											<div className="d-flex gap-1">
												<span>
													{myOrders?.shippingAdderess?.shippingAddressObj?.city || ""}
												</span>
												<span>
													{myOrders?.shippingAdderess?.shippingAddressObj?.state || ""}
												</span>
												<span>{myOrders?.shippingAdderess?.shippingAddressObj?.zip || ""}</span>
											</div>
											{myOrders?.shippingAdderess?.shippingAddressObj?.country ? (
												<div>{myOrders?.shippingAdderess?.shippingAddressObj?.country}</div>
											) : (
												""
											)}
											{myOrders?.shippingAdderess?.shippingAddressObj?.phone ? (
												<div>{myOrders?.shippingAdderess?.shippingAddressObj?.phone}</div>
											) : (
												""
											)}
										</div>
									</div>

									{myOrders?.shippingAdderess?.shippingAddressObj?.orderNotes ? (
										<div className="border-top mt-2 pt-2 border-secondary">
											Order Notes : {myOrders?.shippingAdderess?.shippingAddressObj?.orderNotes}
										</div>
									) : (
										""
									)}

									<hr className="w-100" style={{ height: "2px" }} />
									<div className="mt-3">
										<h4 className="fw-semibold fs-5">Payment Details : </h4>
										<div
											className="d-flex justify-content-between gap-2 mb-2"
											style={{ flexWrap: "wrap" }}
										>
											<div>
												Subtotal : <span id="sn_order_subtotal">{currencySymbol(myOrders?.currency)} {(myOrders?.amountToPay - myOrders?.deliveryCharge).toFixed(2)}</span>
											</div>
											<div className="d-flex gap-2">
												Shipping Charge :
												{myOrders?.couponType && myOrders?.couponType === "free_shipping" ? (
													<div className="d-flex gap-1">
														<span className="line-through-text text-secondary " id="sn_order_delivery_discount">
															{currencySymbol(myOrders?.currency)}{myOrders?.couponDiscount}
														</span>
														<span className="" id="sn_order_discounted_delivery_charge">{currencySymbol(myOrders?.currency)}{myOrders?.deliveryCharge}</span>
													</div>
												) : (
													<duv id="sn_order_delivery_charge">{currencySymbol(myOrders?.currency)}{myOrders?.deliveryCharge}</duv>
												)}
											</div>
											{myOrders?.couponName && myOrders?.couponName !== "" ? (
												<div>
													Coupon{" "}
													<span className="text-success fw-semibold">
														{myOrders?.couponName}
													</span>{" "}
													: - <span id="sn_order_discount">{currencySymbol(myOrders?.currency)}{myOrders?.couponDiscount}</span>
												</div>
											) : (
												""
											)}
											<div>Total : <span id="sn_order_amount_paid">{currencySymbol(myOrders?.currency)}{myOrders?.amountToPay}</span></div>
										</div>
										<div>
											<span>Payment Status : </span>
											<span>
												{myOrders?.paymentType === "pay360" &&
													myOrders?.transaction[0]?.trxnResponse?.transaction?.status ===
													"SUCCESS" ? (
													<span className="text-success fw-semibold">
														{myOrders?.transaction[0]?.trxnResponse?.transaction?.status}
													</span>
												) : (
													<span className="text-danger fw-semibold">
														{myOrders?.transaction[0]?.trxnResponse?.transaction?.status}
													</span>
												)}
												{myOrders?.paymentType === "paypal" &&
													myOrders?.transaction[0]?.trxnResponse?.status === "COMPLETED" ? (
													<span className="text-success fw-semibold">
														{myOrders?.transaction[0]?.trxnResponse?.status}
													</span>
												) : (
													<span className="text-danger fw-semibold">
														{myOrders?.transaction[0]?.trxnResponse?.status}
													</span>
												)}
											</span>
										</div>
										<div>
											<span>Delivery Type : </span>
											<span>{myOrders?.deliveryMethod}</span>
										</div>
										<div>
											<span>Delivery Time : </span>
											<span>{myOrders?.deliveryTime}</span>
										</div>
										{myOrders?.transaction[0]?.trxnResponse?.transaction?.transactionId ? (
											<div>
												Transaction ID :{" "}
												<span id="sn_order_transaction_id">{myOrders?.transaction[0]?.trxnResponse?.transaction?.transactionId}</span>
											</div>
										) : (
											""
										)}
									</div>
									<hr className="w-100" style={{ height: "2px" }} />
									<div className="text-center mt-2">
										<Link to="/">Continue Shopping</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : orderStatus ? (
				<div
					className="container py-5 d-flex flex-column justify-content-center align-items-center"
					style={{
						minHeight: "calc(100vh - 450px)",
						fontSize: "24px",
						fontWeight: 600,
					}}
				>
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					Getting transaction results ...
				</div>
			) : (
				<div
					className="container py-5 d-flex flex-column justify-content-center align-items-center"
					style={{
						minHeight: "calc(100vh - 450px)",
						fontSize: "24px",
						fontWeight: 600,
					}}
				>
					Transaction error, please try to refresh page once.
				</div>
			)}
		</>
	);
};

export default Thankyou;
