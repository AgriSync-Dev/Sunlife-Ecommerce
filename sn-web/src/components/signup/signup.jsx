import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import google from "../../assets/google-color-icon.svg";
import Facebook from "../../assets/icons8-facebook.svg";
import Facebookblue from "../../assets/facebook-app-round-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPOST } from "../../utilities/apiHelpers";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setlastpath } from "../../redux/users/users";
import { toast } from "react-toastify";

import { API_URL, WEB_URL } from "../../config";

const Signup = ({ show, handleClose, handleShowLogin }) => {
	const [inputFormdisplay, setInputFormdisplay] = useState(true);
	const [buttonDisable, setButtonDisable] = useState(false);
	const [error, setError] = useState("");
	const { lastpath } = useSelector((s) => s.user);
	const [returnUrl, setReturnUrl] = useState();
	const navigate = useNavigate();
	const location = useLocation();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const dispatch = useDispatch();

	let q = useQuery();
	// Validation error states
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const clearError = () => {
		setEmailError("");
		setPasswordError("");
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateEmail = (email) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if (!email) {
			setEmailError("Email is required");
			return false;
		} else if (!emailRegex.test(email)) {
			setEmailError("Invalid email address");
			toast.error("Invalid email address");
			return false;
		} else {
			setEmailError("");
			return true;
		}
	};

	const validatePassword = (password) => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		if (!password) {
			setPasswordError("Password is required");
			return false;
		} else if (password.length < 8) {
			toast.error("Invalid Password");
			setPasswordError("Password must be at least 8 characters");
			return false;
		} else {
			setPasswordError("");
			return true;
		}
	};

	const handleSignUp = async () => {
		const validation1 = validateEmail(formData.email);
		const validation2 = validatePassword(formData.password);

		if (validation1 && validation2) {
			try {
				let resp = await apiPOST("/v1/user/signup-user", formData);
				// console.log('Response:', resp?.data?.data?.tokens?.access);
				if (resp.status === 200) {
					toast.success("Signup Successful");
					setFormData({
						email: "",
						password: "",
					});

					dispatch(
						setUser({
							user: resp?.data?.data?.user,
							access: resp?.data?.data?.tokens?.access,
							refresh: resp?.data?.data?.tokens?.refresh,
						})
					);

					localStorage.setItem("user", JSON.stringify(resp?.data?.data?.user));
					localStorage.setItem("accessToken", resp?.data?.data?.tokens?.access?.token);
					handleClose();
					navigate(lastpath);
					window.location.reload();
				} else if (resp.status === 400) {
					toast.error(resp?.data?.data);
				} else {
					// toast.success('Signup Successful');
				}
			} catch (err) {
				// Handle errors here
			}
		}
	};

	useEffect(() => {
		setInputFormdisplay(true);
		clearError();
	}, [show]);

	useEffect(() => {
		if (location?.pathname && location.pathname === "/checkout") {
			dispatch(setlastpath(location.pathname));
		}
	}, [location]);

	useEffect(() => {
		if (formData.email && formData.password) {
			setButtonDisable(false);
		} else {
			setButtonDisable(true);
		}
	}, [formData]);

	useEffect(() => {
		let rt = q.get("callbackUrl");
		if (rt) {
			socialAutoLogin(rt);
		}
		function getQueryVariable(variable) {
			var query = window.location.search.substring(1);
			//"app=article&act=news_content&aid=160990"
			var vars = query.split("&");
			//console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				//console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
				if (pair[0] === variable) {
					return pair[1];
				}
			}
			return false;
		}
		setReturnUrl(getQueryVariable("returnUrl"));
	}, []);

	const socialAutoLogin = async (token) => {
		let response = await apiPOST("/v1/auth/socialLogin", { token });
		if (response.data.code === 200) {
			const { user, tokens } = response.data.data;
			localStorage.setItem("accessToken", tokens.access.token);
			localStorage.setItem("refreshToken", tokens.refresh.token);

			if (returnUrl) {
				window.location.replace(`${WEB_URL}/${lastpath}`);
			}

			dispatch(
				setUser({
					user: user,
					access: tokens.access.token,
					refresh: tokens.refresh.token,
				})
			);

			clearError();
			navigate(lastpath);
			window.location.reload();
		} else {
			setError(response?.data?.message);
		}
	};

	return (
		<Modal show={show} onHide={() => handleClose()} className="w-100" centered size="xl">
			<Modal.Header closeButton className="border-0"></Modal.Header>
			<Modal.Body>
				{inputFormdisplay ? (
					<div className="text-center m-auto md-p-4 border-0 col-md-12 col-lg-5 col-sm-12 ">
						<h2 className="fs-1 anton mb-4 cursor-pointer">Sign Up</h2>
						<div className="text-18 pb-3 d-flex m-auto text-center gap-2 justify-content-center pointer-event">
							{" "}
							<div className="text-center">Already a member? </div>
							<div className="text-primary cursor-pointer" onClick={() => handleShowLogin()}>
								Log In
							</div>
						</div>
						<a style={{ textDecoration: "none" }} href={API_URL + "/web/auth/google"} rel="noreferrer">
							<Button className="btn-lg mt-3  my-3 rounded-0 bg-transparent text-black border w-100 align-content-center d-flex ">
								<div className="fix_icon ">
									<img className="" src={google} alt="" />
								</div>{" "}
								<span className="m-auto">Sign Up with Google</span>
							</Button>
						</a>
						<a style={{ textDecoration: "none" }} href={API_URL + "/web/auth/facebook"} rel="noreferrer">
							<Button
								variant="primary"
								className="btn-lg w-100 my-3 rounded-0 align-content-center d-flex"
							>
								<div className=" align-content-center ">
									<img className="fix_icon p-0" src={Facebook} alt="" />
								</div>{" "}
								<span className="m-auto">Sign Up with Facebook</span>
							</Button>
						</a>
						<Row className="align-items-center">
							<Col xs="5">
								<hr />
							</Col>
							<Col xs="2" className="text-muted">
								or
							</Col>
							<Col xs="5">
								<hr />
							</Col>
						</Row>
						<Button
							onClick={() => {
								setInputFormdisplay(!inputFormdisplay);
							}}
							className="btn-lg  my-3 rounded-0 bg-transparent text-black border w-100  "
						>
							Sign Up with Email
						</Button>
						<div class="d-flex  m-auto gap-2 mt-5 fs-6">
							{/* <input class="form-check-input" type="checkbox" value="" id="id" />
							 */}
						</div>
						{/* <Button variant="success" className="btn-lg w-100">
						Sign Up
					</Button> */}
					</div>
				) : (
					<div className="text-center m-auto md-p-4 border-0 col-md-12 col-lg-5 col-sm-12 ">
						<h2 className="anton fs-1">Sign Up</h2>
						<div className="text-18 pb-3 d-flex m-auto text-center gap-2 justify-content-center pointer-event">
							{" "}
							<div className="text-center">Already a member? </div>
							<div className="text-primary cursor-pointer" onClick={() => handleShowLogin()}>
								Log In
							</div>
						</div>

						<div className="mb-3 ">
							<label htmlFor="email" className="form-label">
								{" "}
								Email
							</label>
							<input
								type="email"
								className={`form-control shadow-none  text-center border-0 btn-outline-primary rounded-0  border-bottom ${
									emailError ? "border-danger" : ""
								}`}
								id="email"
								name="email"
								onFocus={() => setEmailError("")}
								value={formData.email}
								onChange={handleInputChange}
							/>
							<div className="text-danger d-flex">{emailError ? emailError : ""}</div>
						</div>

						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type={"password"}
								className={`form-control shadow-none text-center border-0 btn-outline-primary rounded-0  border-bottom ${
									passwordError ? "border-danger" : ""
								}`}
								id="password"
								name="password"
								value={formData.password}
								onFocus={() => setPasswordError("")}
								onChange={handleInputChange}
							/>
							<div className="text-danger d-flex">{passwordError ? passwordError : ""}</div>
						</div>
						<Button
							disabled={buttonDisable}
							className={`btn-lg ${
								buttonDisable ? `bg-secondary opacity-50` : `bg-primary`
							} border-0 rounded-0 w-100`}
							onClick={handleSignUp}
							style={{ cursor: "pointer" }}
						>
							Sign Up
						</Button>
						<Row className="align-items-center">
							<Col xs="4">
								<hr />
							</Col>
							<Col xs="4" className="text-muted">
								or sign up with
							</Col>
							<Col xs="4">
								<hr />
							</Col>
						</Row>

						<div className="d-flex gap-3 justify-content-center pb-3 mt-3">
							<div className="fix_icon">
								<img className="w-100" src={google} alt="" />
							</div>
							<div className="fix_icon">
								<img className="w-100" src={Facebookblue} alt="" />
							</div>
						</div>
						<div class="d-flex  m-auto gap-2 mt-5 fs-6">
							{/* <input class="form-check-input" type="checkbox" value="" id="id" />
							 */}
						</div>
					</div>
				)}
			</Modal.Body>
		</Modal>
	);
};

export default Signup;
function useQuery() {
	const { search } = window.location;
	return React.useMemo(() => new URLSearchParams(search), [search]);
}
