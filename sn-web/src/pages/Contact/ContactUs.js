import { Helmet } from "react-helmet";
import { apiGET, apiPOST } from "../../utilities/apiHelpers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		message: "",
	});

	const [disableOne, setDisableOne] = useState(false)

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async () => {
		try {
			if (formData?.phone?.length) {
				if (!/^\d*$/.test(formData?.phone)) {
					toast.error("Enter valid phone number");
					return;
				}
			}
			let resp = await apiPOST("/v1/contact-us/add-contact-us", formData);
			if (resp.status === 200) {
				toast.success("Thanks for getting in touch, we aim to reply as soon as possible ");
				setDisableOne(true)
				setFormData({
					name: "",
					email: "",
					phone: "",
					company: "",
					message: "",
				})
			} else {
				toast.error(resp?.data?.data);
			}
		} catch (err) {
			toast.error(err?.data?.message);
		}
	};

	const [metaData, setMetaData] = useState([]);
	let fetchSiteMetadata = async () => {
		try {
			let res = await apiGET(`/v1/site-metadata/get-site-metadata-by-type?type=wholesale page description`);
			let data = res?.data?.data?.data;

			if (data && data?.length > 0) {
				let statements = data[0]?.statements;
				console.log("statements", statements);

				if (res?.status === 200) {
					setMetaData(statements);
				}
			}
		} catch (error) {
			console.error("Error fetching site metadata:", error);
		}
	};

	useEffect(() => {
		if (disableOne) {
			setTimeout(() => {
				setDisableOne(false)
			}, 120000)
		}
	}, [disableOne])

	useEffect(() => {
		fetchSiteMetadata();
	}, []);

	return (
		<>
			<div>
				<Helmet>
					<meta
						name="description"
						content={metaData?.length ? metaData : "We offer wholesale for all brands on our site"}
					/>
				</Helmet>
			</div>
			<div className="container my-5 ">
				<div className="">
					<div className="row ">
						<div className="text-center d-none d-lg-block col-12 col-lg-6">
							<div>
								<div className="text-center">
									<h2
										style={{
											fontSize: "22x",
											fontWeight: "bolder",
											lineHeight: "1.8em",
											color: "black",
										}}
									>
										Wholesale
									</h2>
								</div>
								<div className="text-center">
									<p>
										We Wholesale all brands and flavours seen on our site and even those that aren't
										yet !
									</p>
								</div>
								<div className="d-flex justify-content-center w-100 mt-4 ">
									<span className="border border-dark border-top-0 w-25"> </span>
								</div>
								<div className="text-center mt-3 ">
									<p>
										For any and all wholesale inquiries please fill out this form and we will be in
										touch as soon as possible
									</p>
								</div>
								<div className="text-center mt-4 ">
									<p>
										Please note the minimum order quantity for our wholesale prices is 1 box (240
										pots)
									</p>
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-6">
							<div>
								<div className="text-center">
									<h1
										className="anton"
										style={{
											fontSize: "25px",
											fontWeight: "500",
											letterSpacing: "4px",
											color: "black",
										}}
									>
										CONTACT US{" "}
									</h1>
									<p
										className="anton"
										style={{
											fontSize: "15px",
											fontWeight: "500",
											letterSpacing: "4px",
											color: "black",
										}}
									>
										FOR WHOLESALE INQUIRIES
									</p>
								</div>
								<div className="mt-2 d-flex justify-content-center">
									<div className="px-5">
										<div className="row d-flex justify-content-center     ">
											<div
												className="px-3 mt-1 py-1  col-12 col-md-5 m-md-3 m-lg-2 m-1    "
												style={{
													borderBottomWidth: "2px",
													borderBottomStyle: "solid",
													borderBottomColor: "black",
													backgroundColor: "#FAFAFA",
												}}
											>
												<input
													type="text"
													name="name"
													value={formData.name}
													onChange={handleChange}
													placeholder="Name*"
													className=" w-100 border-0 "
													style={{ outline: "none ", backgroundColor: "#FAFAFA" }}
												></input>
											</div>
											<div
												className="px-3 mt-1 py-1  col-12  col-md-5 m-md-3 m-lg-2  m-1  "
												style={{
													borderBottomWidth: "2px",
													borderBottomStyle: "solid",
													borderBottomColor: "black",
													backgroundColor: "#FAFAFA",
												}}
											>
												<input
													type="text"
													name="email"
													value={formData.email}
													onChange={handleChange}
													className="border-0  w-100"
													placeholder="Email*"
													style={{ outline: "none", backgroundColor: "#FAFAFA" }}
												></input>
											</div>
										</div>
										<div className="row d-flex justify-content-center   ">
											<div
												className="px-3 mt-1  py-1 col-12 col-md-5 m-md-3 m-lg-2  m-1 "
												style={{
													borderBottomWidth: "2px",
													borderBottomStyle: "solid",
													borderBottomColor: "black",
													backgroundColor: "#FAFAFA",
												}}
											>
												<input
													type="text"
													name="phone"
													value={formData.phone}
													onChange={handleChange}
													placeholder="Phone"
													className="border-0  w-100"
													style={{ outline: "none", backgroundColor: "#FAFAFA" }}
												></input>
											</div>
											<div
												className="px-3 mt-1 py-1 col-12 col-md-5 m-md-3 m-lg-2 m-1 "
												style={{
													borderBottomWidth: "2px",
													borderBottomStyle: "solid",
													borderBottomColor: "black",
													backgroundColor: "#FAFAFA",
												}}
											>
												<input
													type="text"
													name="company"
													value={formData.company}
													onChange={handleChange}
													className="border-0  w-100"
													placeholder="Company"
													style={{ outline: "none", backgroundColor: "#FAFAFA" }}
												></input>
											</div>
										</div>
										<div className="row d-flex justify-content-center px-0 px-lg-2   ">
											<div
												className=" mt-3 col-md-11 col-12 col-lg-11      "
												style={{
													backgroundColor: "#FAFAFA",
													borderBottomWidth: "2px",
													borderBottomStyle: "solid",
													borderBottomColor: "black",
												}}
											>
												<div className="px-2 py-1   ">
													<textarea
														rows={5}
														name="message"
														value={formData.message}
														onChange={handleChange}
														placeholder="Type Your Message Here..."
														className="border-0 w-100 "
														style={{
															outline: "none",
															resize: "none",
															backgroundColor: "#FAFAFA",
														}}
													></textarea>
												</div>
											</div>
										</div>
										<div className="mt-4 mb-2 mb-lg-5 px-0 px-lg-2 d-flex justify-content-center">
											<button
												disabled={disableOne}
												onClick={() => console.log("submit")}
												className="bg-gray border-0 px-3 py-2 rounded"
											>
												Submit
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center d-block d-lg-none mt-5 col-12 col-lg-6">
						<div>
							<div className="text-center">
								<h2
									style={{
										fontSize: "22x",
										fontWeight: "bolder",
										lineHeight: "1.8em",
										color: "black",
									}}
								>
									Wholesale
								</h2>
							</div>
							<div className="text-center">
								<p>
									We Wholesale all brands and flavours seen on our site and even those that aren't yet
									!
								</p>
							</div>
							<div className="d-flex justify-content-center w-100 mt-4 ">
								<span className="border border-dark border-top-0 w-25"> </span>
							</div>
							<div className="text-center mt-3 ">
								<p>
									For any and all wholesale inquiries please fill out this form and we will be in
									touch as soon as possible
								</p>
							</div>
							<div className="text-center mt-4 ">
								<p>
									Please note the minimum order quantity for our wholesale prices is 1 box (240 pots)
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactUs;