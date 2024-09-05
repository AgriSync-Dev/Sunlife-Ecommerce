import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

import { apiPOST } from "../utilities/apiHelpers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContactUsForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		message: "",
	});
	const [validationErrors, setValidationErrors] = useState({
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
		setValidationErrors({ ...validationErrors, [name]: "" });
	};

	const handleSubmit = async () => {
		try {
			// Validation
			let errors = {};

			if (!formData.name) {
				errors.name = "Name is required";
			}

			if (!formData.email) {
				errors.email = "Email is required";
			} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
				errors.email = "Enter a valid email address";
			}

			if (formData.phone?.length && !/^\d*$/.test(formData.phone)) {
				errors.phone = "Enter a valid phone number";
			}

			if (!formData.message) {
				errors.message = "Message is required";
			}

			if (Object.keys(errors)?.length > 0) {
				// Display validation errors
				setValidationErrors(errors);
				return;
			}
			let resp = await apiPOST("/v1/contact-us/add-contact-us", formData);
			if (resp.status == 200) {
				toast.success("Thanks for getting in touch, we aim to reply as soon as possible.");
				setFormData({
					name: "",
					email: "",
					phone: "",
					company: "",
					message: "",
				});
				setDisableOne(true)
			} else {
				toast.error(resp?.data?.data);
			}
		} catch (err) {
			toast.error(err?.data?.message);
		}
	};


	useEffect(() => {
		if (disableOne) {
			setTimeout(() => {
				setDisableOne(false)
			}, 120000)
		}
	}, [disableOne])

	return (
		<div>
			<div className="container-fluid  p-0 m-0">
				<div class="row  w-100 m-0 ">
					<div class="col-sm-12 col-md-5 col-lg-4 bg-prime pt-md-5  m-0 text-white ">
						<div class="w-50 ms-lg-5 mt-5 mb-3 mx-auto">
							<div class="fs-3  fw-bold text-black anton">Get in touch</div>
							<div className="lg-fs-1 text-black">Dylan - Sales Manager @ info@thesnuslife.com</div>
							<div class="d-none d-md-flex   gap-2 mt-3 ">
								<div>
									<a href="#" target="_blank">
										<FaInstagram style={{ color: "black" }} />
									</a>
								</div>
								<div style={{ color: "black" }}>
									<a
										href="#"
										target="_blank"
									>
										<FaFacebook style={{ color: "black" }} />
									</a>
								</div>
								<div style={{ color: "black" }}>
									<a href="#" target="_blank">
										<FaTiktok style={{ color: "black" }} />
									</a>
								</div>
							</div>
						</div>
						<div class="d-flex d-md-none w-25 m-auto mb-3 mt-3 gap-2 mt-3 ">
							<div>
								<a href="#" target="_blank">
									{" "}
									<img
										src="https://static.wixstatic.com/media/11062b_084cbbff6ae446c1b03dc3637193e77a~mv2.png/v1/fill/w_25,h_25,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_084cbbff6ae446c1b03dc3637193e77a~mv2.png"
										alt=""
									/>
								</a>
							</div>
							<div>
								<a
									href="#"
									target="_blank"
								>
									{" "}
									<img
										src="https://static.wixstatic.com/media/11062b_362ef89dec51403eb0ee59a21bde967c~mv2.png/v1/fill/w_25,h_25,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_362ef89dec51403eb0ee59a21bde967c~mv2.png"
										alt=""
									/>
								</a>
							</div>
							<div>
								<a href="#" target="_blank">
									{" "}
									<img
										src="https://static.wixstatic.com/media/11062b_4b88b89fe4694d949be4919c81f194b4~mv2.png/v1/fill/w_25,h_25,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_4b88b89fe4694d949be4919c81f194b4~mv2.png"
										alt=""
									/>
								</a>
							</div>
						</div>
					</div>
					<div className=" d-sm-none d-md-block col-md-1 col-lg-1 "> </div>
					<div class="col-sm-12 col-md-6 col-lg-6  mt-lg-5 mb-5 ">
						<div className=" mt-lg-5 p-3 m-auto">
							<div class="mb-3  row justify-content-between ">
								<div class="col-sm-6 ">
									<div>
										{" "}
										<label for="exampleInputEmail1" class="form-label">
											Name*
										</label>
										<input
											type="text"
											name="name"
											class="form-control w-100 border border-1 border-gray rounded-0"
											value={formData.name}
											onChange={handleChange}
											id="exampleInputEmail1"
											aria-describedby="emailHelp"
										/>
										<div className="text-danger " style={{ fontSize: "13px" }}>
											{validationErrors?.name}
										</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div>
										{" "}
										<label for="exampleInputEmail1" class="form-label">
											Email*
										</label>
										<input
											type="text"
											name="email"
											class="form-control border border-1 border-gray rounded-0"
											value={formData.email}
											onChange={handleChange}
											id="exampleInputEmail1"
											aria-describedby="emailHelp"
										/>
										<div className="text-danger" style={{ fontSize: "13px" }}>
											{validationErrors?.email}
										</div>
									</div>
								</div>
							</div>

							<div class="mb-3  row justify-content-between ">
								<div class="col-sm-6 ">
									<div>
										{" "}
										<label for="exampleInputEmail1" class="form-label">
											Phone
										</label>
										<input
											type="text"
											name="phone"
											class="form-control w-100 border border-1 border-gray rounded-0"
											value={formData.phone}
											onChange={handleChange}
											id="exampleInputEmail1"
											aria-describedby="emailHelp"
										/>
										<div className="text-danger" style={{ fontSize: "13px" }}>
											{validationErrors?.phone}
										</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div>
										{" "}
										<label for="exampleInputEmail1" class="form-label">
											Company
										</label>
										<input
											type="text"
											name="company"
											class="form-control border border-1 border-gray rounded-0"
											value={formData.company}
											onChange={handleChange}
											id="exampleInputEmail1"
											aria-describedby="emailHelp"
										/>
										<div className="text-danger" style={{ fontSize: "13px" }}>
											{validationErrors?.company}
										</div>
									</div>
								</div>
							</div>

							<div class="mb-3 ">
								<label for="exampleInputPassword1" class="form-label">
									Message*
								</label>
								<textarea
									type="text-area"
									name="message"
									class="form-control border border-1 border-gray rounded-0"
									value={formData.message}
									onChange={handleChange}
									id="exampleInputPassword1"
								/>
								<div className="text-danger" style={{ fontSize: "13px" }}>
									{validationErrors?.message}
								</div>
							</div>
							<div class="mb-5">
								<button
									class=" btn text-white container rounded-2 border-0 border-black py-1"
									style={{ backgroundColor: "#0396FF" }}
									onClick={() => console.log("submit")}
									disabled={disableOne}
								>
									Send
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUsForm;
