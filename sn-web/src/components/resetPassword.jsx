import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGET, apiPOST } from "../utilities/apiHelpers";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const ResetPassword = () => {
	const { token } = useParams();

	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [showForgetPassword, setShowForgetPassword] = useState(true);
	const [isTokenInvalid, setIsTokenInvalid] = useState(false);
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});

	let navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
		setPasswordError("");
		setConfirmPasswordError("");
	};

	const handleCloseForgetPassword = () => {
		setShowForgetPassword(false);
		navigate("/");
	};

	const verifyToken = async (token) => {
		try {
			const response = await apiGET(`v1/user/verify-token/${token}`);
			console.log(response);

			if (response?.data.status) {
			} else if (response.data.code === 400) {
				setIsTokenInvalid(true);
			} else {
				console.error("Error fetching collection data:", response.error);
			}
		} catch (error) {
			console.error("Error fetching collection data:", error);
			setIsTokenInvalid(true);
		}
	};

	const resetPassword = async () => {
		if (!formData.password) {
			setPasswordError(true);
			return;
		}
		if (!formData.confirmPassword) {
			setConfirmPasswordError(true);
			return;
		}
		let payload = {
			newPassword: formData.password,
			token: token,
		};

		if (formData.password === formData.confirmPassword) {
			try {
				const response = await apiPOST(`${API_URL}/v1/user/reset-password`, payload);
				if (response?.data?.status) {
					toast.success("Password Updated Successfully,  You can login with new credentials!! ");
					navigate("/");
				} else {
					toast.error("Error :", response?.data?.msg);
				}
			} catch (error) {
				console.error("Error resetting password:", error);
			}
		} else {
			toast.error("Passwords do not match.");
		}
	};
	
	useEffect(() => {
		if (token) {
			verifyToken(token);
		}
	}, [token]);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<div
			style={{
				height: "80vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div>
				{!isTokenInvalid ? (
					<Modal
						show={showForgetPassword}
						onHide={handleCloseForgetPassword}
						className="w-100"
						centered
						size="xl"
					>
						<Modal.Header closeButton className="border-0"></Modal.Header>
						<Modal.Body>
							{
								<div className="text-center m-auto md-p-4 border-0 col-md-12 col-lg-3 col-sm-12">
									<h2 className="fs-1 anton mb-4">Reset password</h2>
									<div className="text-18 pb-3 d-flex m-auto text-center gap-2 justify-content-center pointer-event mb-3">
										Enter your new password below
									</div>

									<div className={`mb-3 `}>
										<label htmlFor="password" className="form-label">
											Enter a new password
										</label>
										<div className="form-group">
											<div className="input-group">
												<input
													type={showPassword ? "text" : "password"}
													className={`pb-2 form-control text-center border border-bottom  border-top-0 border-end-0 border-start-0 input-outline-none rounded-0 ${
														!passwordError ? "" : "is-invalid"
													}`}
													id="password"
													name="password"
													value={formData.password}
													onChange={handleInputChange}
													style={{
														border: "1px solid #ced4da",
														borderRadius: "0",
														outline: "none",
														boxShadow: "none",
														borderColor: "#80bdff",
													}}
												/>
												<button
													style={{ borderBottom: "1px solid #E2E6E9", borderRadius: "0px" }}
													className="btn btn-link"
													type="button"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? <FaEyeSlash /> : <FaEye />}
												</button>
											</div>
										</div>
										{passwordError && <p className="text-danger">This field is required</p>}
									</div>

									<div className={`mb-3`}>
										<label htmlFor="confirmPassword" className="form-label">
											Confirm new password
										</label>
										<div className="form-group">
											<div className="input-group">
												<input
													type={showConfirmPassword ? "text" : "password"}
													className={`pb-2 form-control text-center border border-bottom border-top-0 border-end-0 border-start-0 input-outline-none rounded-0 ${
														!confirmPasswordError ? "" : "is-invalid"
													}`}
													id="confirmPassword"
													name="confirmPassword"
													value={formData.confirmPassword}
													onChange={handleInputChange}
													style={{
														border: "1px solid #ced4da",
														borderRadius: "0",
														outline: "none",
														boxShadow: "none",
														borderColor: "#80bdff",
													}}
												/>
												<button
													style={{ borderBottom: "1px solid #E2E6E9", borderRadius: "0px" }}
													className="btn btn-link " // Use btn-link for a button without background
													type="button"
													onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												>
													{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
												</button>
											</div>
										</div>
										{confirmPasswordError && <p className="text-danger">This field is required</p>}
									</div>

									<Button
										className="btn-lg bg-primary  border-0 rounded-0 w-100 pb-2 mb-5 mt-3"
										onClick={resetPassword}
									>
										Reset Password
									</Button>
								</div>
							}
						</Modal.Body>
					</Modal>
				) : (
					<div className="p-5">
						<h2 className="fs-1 anton mb-4"> Link Expired</h2>
						<Button
							className="btn-lg bg-primary  border-0 rounded-0 w-100 pb-2 mb-5 mt-3"
							onClick={() => navigate("/")}
						>
							Close
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ResetPassword;
