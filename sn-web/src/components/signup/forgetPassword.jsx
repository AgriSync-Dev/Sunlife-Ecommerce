import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { apiPOST } from "../../utilities/apiHelpers";
import { toast } from "react-toastify";
import { MdMarkEmailRead } from "react-icons/md";

const ForgetPassword = ({ show, handleClose, handleShowSignup }) => {
	const [formData, setFormData] = useState({
		email: "",
	});
	const [success, setSuccess] = useState(false);

	const [emailError, setEmailError] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
		setEmailError(false);
	};

	const handleSignUp = async () => {
		if (!formData.email) {
			setEmailError(true);
			return;
		}

		try {
			let resp = await apiPOST("/v1/user/reset-password-link-generate", { email: formData?.email });
			if (resp.status === 200) {
				toast.success("Verfication link successfully sent on your mail !!");
				setSuccess(true);
			} else if (resp.status === 400) {
				toast.error(resp?.data?.data);
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<Modal show={show} onHide={handleClose} className="w-100" centered size="xl">
			<Modal.Header closeButton className="border-0"></Modal.Header>
			<Modal.Body>
				{!success ? (
					<div className="text-center m-auto md-p-4 border-0 col-md-12 col-lg-3 col-sm-12">
						<h2 className="fs-1 anton mb-4">Reset password</h2>
						<div className="text-18 pb-3 d-flex m-auto text-center gap-2 justify-content-center pointer-event">
							Enter your login email, and we'll send you a link to reset your password.
						</div>

						<div className={`mb-3 ${emailError ? "was-validated" : ""}`}>
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<div className="form-group">
								<input
									type="email"
									className={`pb-2 form-control text-center border border-bottom border-top-0 border-end-0 border-start-0  input-outline-none rounded-0 ${
										emailError ? "is-invalid border-danger" : ""
									}`}
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									onClick={() => setEmailError(false)}
								/>
							</div>
						</div>
						{emailError && <p className="text-danger">Email is required</p>}
						<Button
							className="btn-lg bg-primary  border-0 rounded-0 w-100 pb-2 mb-5"
							onClick={handleSignUp}
						>
							Reset Password
						</Button>
					</div>
				) : (
					<div>
						<div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "30px 0" }}>
							<MdMarkEmailRead style={{ fontSize: "30px" }} />
						</div>

						<div className="" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<h2 className="fs-3  anton mb-5">We sent an email, Please check !!</h2>
						</div>
					</div>
				)}
			</Modal.Body>
		</Modal>
	);
};

export default ForgetPassword;
