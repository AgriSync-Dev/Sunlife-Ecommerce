import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Footer = () => {
	let [email, setEmail] = useState("");
	let suscribeMessage = () => {
		if (!email) {
			Swal.fire({
				title: "Error!",
				text: "Please enter email",
				icon: "error",
			});
			return;
		} else if (email) {
			const emailRE =
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			if (!emailRE.test(email)) {
				Swal.fire({
					title: "Error!",
					text: "Please enter valid mail",
					icon: "error",
				});
				return;
			}
		}

		//alert('Thanks for Subscriibing to our email list.Welcome to the family.')
		toast.success("Thanks for Subscriibing to our email list.Welcome to the family. ");
		setEmail("");
	};
	return (
		<div className="bg-dark text-white ">
			<div className="container p-5 ">
				<div className="row">
					<div className="col-5 col-sm-6 col-lg-3">
						<div className="row gap-2 ">
							<Link to="/shop" className="text-decoration-none ">
								Shop
							</Link>
							<Link to="/blog" className="text-decoration-none">
								Blog
							</Link>
							<Link to="/about" className="text-decoration-none">
								About Us
							</Link>
						</div>
					</div>
					<div className="col-7 col-sm-6 col-lg-3">
						<div className="row gap-2 ">
							<Link to="/faq" className="text-decoration-none ">
								FAQs
							</Link>
							<Link to="/terms-of-service" className="text-decoration-none ">
								Terms of service
							</Link>
							<Link to="/privacy-policy" className="text-decoration-none">
								Privacy policy
							</Link>
							<Link to="/medical-disclaimer" className="text-decoration-none">
								Medical Disclaimer{" "}
							</Link>
						</div>
					</div>
					<div className="col-12 col-lg-6 mt-5 mt-lg-0 ">
						<div className="fs-5 ">Subscribe Here *</div>
						<input
							value={email}
							placeholder="Your email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							className="p-1 bg-dark mt-2"
							style={{ width: "100%", maxWidth: 300, borderBottom: "2px solid white", borderRight: 0 }}
						/>
						<div className="fs-6 mt-2 ">subscribe to our mail list for monthly discounts and offers</div>
						<button
							className="btn-secondary mt-5 px-3 py-2 bg-white border-0  "
							onClick={() => {
								console.log("subscribe")
							}}
							style={{ letterSpacing: "2px" }}
						>
							SUBSCRIBE
						</button>
					</div>
				</div>
				<div className="d-flex gap-3 align-items-center justify-content-center mt-5">
					<a href="#" target="_blank">
						<FaInstagram style={{ color: "white" }} className="fs-5 mr-2" />
					</a>
					<a href="#" target="_blank">
						<FaFacebook style={{ color: "white" }} className="fs-5 mr-2" />
					</a>
					<a href="#" target="_blank">
						<FaTiktok style={{ color: "white" }} className="fs-5" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
