import React, { useEffect, useState } from "react";
import { apiGET, apiPOST } from "../../utilities/apiHelpers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../../redux/users/users";
import { Button, Spinner } from "react-bootstrap";
import { Country } from "country-state-city";
import CheckoutAddress from "../Checkout/checkoutAddress";
import axios from "axios";

const MyAddAddresses = ({ address, setShowAdd, getMyAdderss, setShowEdit, setSelectIdEdit }) => {
	const { userData } = useSelector((state) => state.user);
	const [selectId, setSelectId] = useState("");
	const dispatch = useDispatch();
	const [deliveryDetails, setDeliveryDetails] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		country: "",
		address: "",
		addressLine2: "",
		city: "",
		state: "",
		iso: "",
		zip: "",
		orderNotes: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [showSignup, setShowSignup] = useState(false);
	const [cartLoading, setCartLoading] = useState(true);
	const [myCartData, setMyCartData] = useState([]);
	const [allAddresses, setAllAddresses] = useState([]);
	const [defaultAddress, setDefaultAddress] = useState({});
	const [showDefaultAddress, setShowDefaultAddress] = useState(false);
	const [showAddressList, setShowAddressList] = useState(false);
	const [addressLoading, setAddressLoading] = useState(false);

	const [currentStep, setCurrentStep] = useState(1);
	const [totalPrice, setTotalPrice] = useState(0);
	const [deliveryCharge, setDeliveryCharge] = useState(0);
	const [originalDeliveryCharge, setOriginalDeliveryCharge] = useState(0);
	const [countryJson, setCountryJson] = useState([]);

	const [regions, setRegions] = useState([]);
	const [deliveryMethods, setDeliveryMethods] = useState([]);
	const [errorDelivery, setErrorDelivery] = useState("");
	const [royalmailServiceId, setRoyalMailServiceId] = useState("Royal Mail International Tracked");
	const [selectedOption, setSelectedOption] = useState("Royal Mail International Tracked");
	const [defaultDeliveryMethod, setDefaultDeliveryMethod] = useState({
		deliveryMethod: "",
		deliveryTime: "",
		shippingRate: "",
	});

	const [showUSACanadaPopup, setShowUSACanadaPopup] = useState(false);

	const getGeoInfo = () => {
		axios
			.get("https://ipapi.co/json/")
			.then((response) => {
				let data = response.data;
				if (
					data.country_name === "United States" ||
					data.country_name === "United States Minor Outlying Islands" ||
					data.country_name === "Canada" ||
					defaultAddress?.country === "United States" ||
					defaultAddress?.country === "United States Minor Outlying Islands" ||
					defaultAddress?.country === "Canada"
				) {
					setShowUSACanadaPopup(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleLogout = (e) => {
		dispatch(removeUser());
		localStorage.clear();
		navigate("/");
		window.location.reload();
	};

	const renewToken = async () => {
		try {
			let payload = {
				refreshToken: localStorage.getItem("refreshToken"),
			};
			const response = await apiPOST(`/v1/auth/renew-token`, payload);
			if (response?.status === 200) {
				dispatch(
					setUser({
						user: userData,
						...response?.data,
					})
				);
				localStorage.setItem("refreshToken", response?.data?.refresh?.token);
				localStorage.setItem("accessToken", response?.data?.access?.token);
			} else {
				handleLogout();
			}
		} catch (error) {
			console.error("Error renew token:", error);
		}
	};

	const validateDetails = () => {
		try {
			// Define an array of keys you want to exclude
			const keysToExclude = ["addressLine2", "orderNotes", "isDefault", "id", "userId"];

			// Use the array to filter out these keys from the object keys
			const deliveryDetailsKeys = Object.keys(deliveryDetails).filter((key) => !keysToExclude.includes(key));

			deliveryDetailsKeys.forEach((key) => {
				// Dynamically generate the field name for the error message
				const fieldName = key
					.replace(/([A-Z])/g, " $1")
					.trim()
					.toLowerCase();
				const formattedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
				// Check if the value is empty or undefined
				if (deliveryDetails[key] === "" || deliveryDetails[key] === undefined || deliveryDetails[key] === null) {
					setFormErrors((prevErrors) => ({
						...prevErrors,
						[key]: `${formattedFieldName} is a required field.`,
					}));
					// toast.error(`${formattedFieldName} is a required field.`);
					return false; // This will only exit the current iteration of the forEach loop
				}
			});

			if (Object.keys(formErrors)?.length > 0) {
				return false;
			}
			return true;
		} catch (error) {
			console.error("Error while change address:", error);
		}
	};

	const addAddress = async () => {
		setAddressLoading(true);
		try {
			if (!validateDetails()) {
				toast.error("Please fill all required field.");
				setAddressLoading(false);
				return;
			}

			if (userData) {
				if (deliveryDetails.hasOwnProperty("id")) {
					let payloadToUpdate = {
						firstName: deliveryDetails?.firstName,
						lastName: deliveryDetails?.lastName,
						email: deliveryDetails?.email,
						phone: deliveryDetails?.phone,
						country: deliveryDetails?.country,
						address: deliveryDetails?.address,
						addressLine2: deliveryDetails?.addressLine2,
						city: deliveryDetails?.city,
						state: deliveryDetails?.state,
						zip: deliveryDetails?.zip,
						iso: deliveryDetails?.iso,
						orderNotes: deliveryDetails?.orderNotes,
					};
					// return
					const response = await apiPOST(
						`/v1/address/update-address/${deliveryDetails?.id}`,
						payloadToUpdate
					);
					setAddressLoading(false);
					if (response?.status === 200) {
						toast.success("Address Updated Successfully");
						getMyAdderss();
						setShowEdit(false);
						setSelectIdEdit("");
						//getMyAdderss()
						setSelectId("");
						getMyAllAddress();
						setShowDefaultAddress(true);
						setShowAddressList(false);
						setCurrentStep(2);
					} else {
						toast.error(response?.data?.data);
					}
				} else {
					let payloadToAdd = {
						firstName: deliveryDetails?.firstName,
						lastName: deliveryDetails?.lastName,
						email: deliveryDetails?.email,
						phone: deliveryDetails?.phone,
						country: deliveryDetails?.country,
						address: deliveryDetails?.address,
						addressLine2: deliveryDetails?.addressLine2,
						city: deliveryDetails?.city,
						state: deliveryDetails?.state,
						zip: deliveryDetails?.zip,
						iso: deliveryDetails?.iso,
						orderNotes: deliveryDetails?.orderNotes,
					};
					// return
					const response = await apiPOST(`/v1/address/add-address`, payloadToAdd);
					setAddressLoading(false);
					if (response?.status === 200) {
						toast.success("Address Added Successfully");
						setShowAdd(false);
						// getMyAdderss()
						setSelectId("");
						getMyAllAddress();
						setShowDefaultAddress(true);
						setShowAddressList(false);
						setCurrentStep(2);
						setDeliveryDetails({
							firstName: "",
							lastName: "",
							phone: "",
							email: "",
							country: "",
							address: "",
							addressLine2: "",
							city: "",
							state: "",
							iso: "",
							zip: "",
							orderNotes: "",
						});
					} else {
						toast.error(response?.data?.data);
					}
				}
			} else {
				let payload = { email: deliveryDetails?.email };
				let addUserResponse = await apiPOST("/v1/user/new-user", payload);
				if (addUserResponse.status === 200) {
					let responseData = addUserResponse?.data?.data || {};
					dispatch(
						setUser({
							user: responseData?.user,
							access: responseData?.tokens?.access,
							refresh: responseData?.tokens?.refresh,
						})
					);
					localStorage.setItem("user", JSON.stringify(responseData?.user));
					localStorage.setItem("accessToken", responseData?.tokens?.access?.token);
					addAddress();
					syncCart();
					getMyCart();
				} else {
					toast.error(addUserResponse?.data?.data);
				}
			}
		} catch (error) {
			setAddressLoading(false);
			console.error("Error while add address:", error);
		}
	};

	const syncCart = async () => {
		let payload = {
			deviceId: localStorage.getItem("deviceId"),
		};
		try {
			const response = await apiPOST(`/v1/cart/sync-cart`, payload);
			if (response?.status === 200) {
				getMyCart();
			} else {
				console.error("Error sync cart :", response.error);
			}
		} catch (error) {
			console.error("Error fetching collection data:", error);
		}
	};

	const getCountryCodeByName = () => {
		const countries = Country.getAllCountries();
		setCountryJson(countries);
	};

	const excludedCountries = ["United States", "United States Minor Outlying Islands", "Canada"];

	const matchedCountries = countryJson.filter(
		(country) =>
			!excludedCountries.includes(country.name) && regions.some((regionCountry) => regionCountry === country.name)
	);

	const getMyCart = async () => {
		setCartLoading(true);
		if (userData != null) {
			try {
				const fetchCart = await apiGET(`/v1/cart/get-my-cart`);
				setCartLoading(false);
				if (fetchCart?.status === 200) {
					setMyCartData(fetchCart?.data?.data?.data?.cart);
					let carts = fetchCart?.data?.data?.data?.cart;
					let subTotal = 0;
					if (carts?.length) {
						for (let i = 0; i < carts.length; i++) {
							subTotal += Number(carts[i]?.productDetails[0]?.price) * Number(carts[i]?.quantity);
						}
					}
					subTotal = Number(subTotal.toFixed(2)) + deliveryCharge;
					setTotalPrice(Number(subTotal.toFixed(2)));
				} else {
					renewToken();
					console.error(fetchCart?.data?.message);
				}
			} catch (error) {
				setCartLoading(false);
				toast.error("Error fetching cart data:", error);
			}
		} else {
			try {
				let payload = {
					deviceId: localStorage.getItem("deviceId"),
				};
				const fetchCart = await apiPOST(`/v1/cart/nouser-get-my-cart`, payload);
				setCartLoading(false);
				if (fetchCart?.status === 200) {
					setMyCartData(fetchCart?.data?.data?.data?.cart);
					let carts = fetchCart?.data?.data?.data?.cart;
					let subTotal = 0;
					if (carts?.length) {
						for (let i = 0; i < carts.length; i++) {
							subTotal += Number(carts[i]?.productDetails[0]?.price) * Number(carts[i]?.quantity);
						}
					}
					subTotal = Number(subTotal.toFixed(2)) + deliveryCharge;
					setTotalPrice(Number(subTotal.toFixed(2)));
				} else {
					console.error(fetchCart.error);
				}
			} catch (error) {
				setCartLoading(false);
				toast.error("Error fetching cart data:", error);
			}
		}
	};

	const getShippingMetByCountry = async () => {
		try {
			if (defaultAddress?.country === "" || defaultAddress?.country === undefined) {
				return;
			}
			const shippings = await apiGET(
				`/v1/shipping/get-shipping-by-country-state?country=${defaultAddress?.country}`
			);
			if (shippings?.data?.code === 200) {
				let arr = shippings?.data?.data?.shippingOptions;
				setDeliveryMethods(arr);
				setSelectedOption(arr[0]?.deliveryMethod);
				setRoyalMailServiceId(arr[0]?.deliveryMethod);
				setDefaultDeliveryMethod({
					deliveryMethod: arr[0]?.deliveryMethod,
					deliveryTime: arr[0]?.deliveryTime,
					shippingRate: arr[0]?.shippingRate,
				});
				setDeliveryCharge(Number(arr[0]?.shippingRate));
				setOriginalDeliveryCharge(Number(arr[0]?.shippingRate));
				setErrorDelivery("");
			} else {
				setErrorDelivery(shippings?.data?.data);
				setDeliveryMethods([]);
				setDefaultDeliveryMethod({});
				setDeliveryCharge(null);
				setOriginalDeliveryCharge(null);
				setRoyalMailServiceId("");
				setSelectedOption("");
			}
		} catch (error) {
			toast.error("Error fetching shipping options:", error);
		}
	};

	const getAllShippingRegions = async () => {
		try {
			const response = await apiGET(`v1/shipping/get-all-shipping-country`);
			if (response?.status) {
				setRegions(response.data.data);
			}
		} catch (error) {
			toast.error("Error fetching shipping regions:", error);
		}
	};

	const getMyAllAddress = async () => {
		try {
			const fetchAddress = await apiGET(`/v1/address/get-my-address`);
			if (fetchAddress?.data?.status) {
				let allAddr = fetchAddress?.data?.data || [];
				setAllAddresses(allAddr);
				if (allAddr?.length > 0) {
					setDefaultAddress(allAddr.find((addr) => addr.isDefault === true) || allAddr[0]);
					setDeliveryDetails(allAddr.find((addr) => addr.isDefault === true) || allAddr[0]);
					setShowDefaultAddress(true);
					setCurrentStep(2);
				}
			}
		} catch (e) {
			toast.error("Error to fetch address");
		}
	};

	useEffect(() => {
		if (defaultAddress?.country != "" || defaultAddress?.country != undefined) {
			getShippingMetByCountry();
		}
	}, [defaultAddress?.country]);

	useEffect(() => {
		if (
			deliveryDetails?.country === "United States" ||
			deliveryDetails?.country === "Canada" ||
			deliveryDetails?.country === "United States Minor Outlying Islands"
		) {
			setShowUSACanadaPopup(true);
		}
	}, [deliveryDetails?.country]);

	useEffect(() => {
		if (userData != null) {
			syncCart();
			getMyAllAddress();
		} else {
			getMyCart();
		}
	}, [userData]);

	useEffect(() => {
		getGeoInfo();
		getMyAllAddress();
		getMyCart();
		getCountryCodeByName();
		getAllShippingRegions();
		if (address?.id) {
			setDeliveryDetails({
				...deliveryDetails,
				firstName: address?.firstName,
				lastName: address?.lastName,
				phone: address?.phone,
				email: address?.email,
				zip: address?.zip,
				iso: address?.countryIso,
				country: address?.country,
				addressLine2: address?.addressLine2,
				city: address?.city,
				state: address?.state,
				orderNotes: address?.orderNotes,
			});
		}

		return () => {
			document.removeEventListener("mousedown", handleCloseSignup);
		};
	}, []);

	const handleCloseSignup = () => {
		setShowSignup(false);
	};

	const navigate = useNavigate();

	return (
		<div className=" ">
			<div style={{ display: "flex" }}>
				<h3>{!address?.id ? "Add New Address" : "Update Address"}</h3>
			</div>
			<div>
				<label className="mb-1">
					First Name <span className="text-danger ">*</span>
				</label>
				<input
					value={deliveryDetails?.firstName || ""}
					onChange={(e) => {
						let firstName = e.target.value;
						if (firstName === undefined || firstName === "" || firstName === null) {
							setFormErrors({
								...formErrors,
								firstName: "First Name is required field.",
							});
						} else {
							const { ["firstName"]: _, ...newState } = formErrors;
							setFormErrors(newState);
						}
						setDeliveryDetails({
							...deliveryDetails,
							firstName: firstName,
						});
					}}
					name="firstName"
					className={`form-control border ${formErrors?.firstName ? "border-danger " : "border-dark"}`}
					type="text"
					placeholder="First name"
				/>
			</div>
			<div>
				<label className="mb-1">
					Last Name <span className="text-danger ">*</span>
				</label>
				<input
					value={deliveryDetails?.lastName || ""}
					onChange={(e) => {
						let lastName = e.target.value;
						if (lastName === undefined || lastName === "" || lastName === null) {
							setFormErrors({
								...formErrors,
								lastName: "Last Name is required field.",
							});
						} else {
							const { ["lastName"]: _, ...newState } = formErrors;
							setFormErrors(newState);
						}
						setDeliveryDetails({
							...deliveryDetails,
							lastName: lastName,
						});
					}}
					name="lastName"
					className={`form-control border ${formErrors?.lastName ? "border-danger " : "border-dark"}`}
					type="text"
					placeholder="Last name"
				/>
			</div>
			<div>
				<label className="mb-1">
					Phone <span className="text-danger ">*</span>
				</label>
				<input
					value={deliveryDetails?.phone || ""}
					onChange={(e) => {
						let phone = e.target.value;
						if (phone === undefined || phone === "" || phone === null) {
							setFormErrors({
								...formErrors,
								phone: "Phone is required field.",
							});
						} else {
							const { ["phone"]: _, ...newState } = formErrors;
							setFormErrors(newState);
						}
						setDeliveryDetails({
							...deliveryDetails,
							phone: phone,
						});
					}}
					name="phone"
					className={`form-control border ${formErrors?.phone ? "border-danger " : "border-dark"}`}
					type="phone"
					placeholder="Phone"
				/>
			</div>
			<div>
				<label className="mb-1">
					Email <span className="text-danger ">*</span>
				</label>
				<input
					value={deliveryDetails?.email || ""}
					onChange={(e) => {
						let email = e.target.value;
						if (email === undefined || email === "" || email === null) {
							setFormErrors({
								...formErrors,
								email: "Email is required field.",
							});
						} else {
							const { ["email"]: _, ...newState } = formErrors;
							setFormErrors(newState);
						}
						setDeliveryDetails({
							...deliveryDetails,
							email: email,
						});
					}}
					name="email"
					className={`form-control border ${formErrors?.email ? "border-danger " : "border-dark"}`}
					type="email"
					placeholder="Email"
				/>
			</div>
			<div>
				<label className="mb-1">
					Country <span className="text-danger ">*</span>
				</label>
				<select
					value={deliveryDetails?.country || ""}
					name="country"
					className={`form-control border ${formErrors?.country ? "border-danger " : "border-dark"}`}
					onChange={(e) => {
						let country = e.target.value;
						if (country === undefined || country === "" || country === null) {
							setFormErrors({
								...formErrors,
								country: "Country is required field.",
							});
						} else {
							const { ["country"]: _, ...newState } = formErrors;
							setFormErrors(newState);
						}
						let countryIso = countryJson
							?.filter((e) => e.name === country)
							.map((e) => e.isoCode)
							.toString();

						setDeliveryDetails({
							...deliveryDetails,
							iso: countryIso,
							country: country,
						});
					}}
				>
					<option value="" disabled>
						Select a country
					</option>
					{matchedCountries?.length
						? matchedCountries.map((country, idx) => (
							<option key={idx} value={country.name}>
								{country.name}
							</option>
						))
						: ""}
				</select>
			</div>
			<CheckoutAddress
				deliveryDetails={deliveryDetails}
				setDeliveryDetails={setDeliveryDetails}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
			/>

			<div>
				<label className="mb-1">Address Line 2</label>
				<input
					value={deliveryDetails?.addressLine2 || ""}
					onChange={(e) => {
						let addressLine2 = e.target.value;
						setDeliveryDetails({
							...deliveryDetails,
							addressLine2: addressLine2,
						});
					}}
					name="addressLine2"
					className={`form-control border border-dark`}
					type="text"
					placeholder="Address Line 2"
				/>
			</div>
			<div>
				<label className="mb-1">
					City <span className="text-danger ">*</span>
				</label>
				<input
					value={deliveryDetails?.city || ""}
					onChange={(e) => {
						let city = e.target.value;
						if (city === undefined || city === "" || city === null) {
							setFormErrors({
								...formErrors,
								city: "City is required field.",
							});
						} else {
							const { ["city"]: _, ...newState } = formErrors;
							setFormErrors(newState);
						}
						setDeliveryDetails({
							...deliveryDetails,
							city: city,
						});
					}}
					name="city"
					className={`form-control border ${formErrors?.city ? "border-danger " : "border-dark"}`}
					type="text"
					placeholder="City"
				/>
			</div>
			<div className="d-flex gap-4 align-items-center ">
				<div className="w-100">
					<label className="mb-1">
						State <span className="text-danger ">*</span>
					</label>
					<input
						value={deliveryDetails?.state || ""}
						onChange={(e) => {
							let state = e.target.value;
							if (state === undefined || state === "" || state === null) {
								setFormErrors({
									...formErrors,
									state: "State is required field.",
								});
							} else {
								const { ["state"]: _, ...newState } = formErrors;
								setFormErrors(newState);
							}
							setDeliveryDetails({
								...deliveryDetails,
								state: state,
							});
						}}
						name="state"
						className={`form-control border ${formErrors?.state ? "border-danger " : "border-dark"}`}
						type="text"
						placeholder="State"
					/>
				</div>
				<div className="w-100">
					<label className="mb-1">
						Zip / Postal Code <span className="text-danger ">*</span>
					</label>
					<input
						value={deliveryDetails?.zip || ""}
						onChange={(e) => {
							let zip = e.target.value;
							if (zip === undefined || zip === "" || zip === null) {
								setFormErrors({
									...formErrors,
									zip: "Zip / Postal Code is required field.",
								});
							} else {
								const { ["zip"]: _, ...newState } = formErrors;
								setFormErrors(newState);
							}
							setDeliveryDetails({
								...deliveryDetails,
								zip: zip,
							});
						}}
						name="zip"
						className={`form-control border ${formErrors?.zip ? "border-danger " : "border-dark"}`}
						type="text"
						placeholder="Zip / Postal Code"
					/>
				</div>
			</div>
			<div>
				<label className="mb-1">Order Notes</label>
				<input
					value={deliveryDetails?.orderNotes || ""}
					onChange={(e) => {
						let orderNotes = e.target.value;

						setDeliveryDetails({
							...deliveryDetails,
							orderNotes: orderNotes,
						});
					}}
					name="orderNotes"
					className={`form-control border border-dark`}
					type="text"
					placeholder="Order Notes"
				/>
			</div>

			<div className="d-flex gap-2 justify-content-center mt-3">
				{!showDefaultAddress ? (
					<button
						type="button"
						className="btn btn-outline-dark w-100 "
						style={{
							maxWidth: "48%",
							minHeight: 44,
						}}
						onClick={() => {
							setShowDefaultAddress(true);
						}}
					>
						Cancel
					</button>
				) : (
					""
				)}
				<Button
					type="button"
					disabled={addressLoading}
					className={`btn btn-dark w-100 addressSaveButton ${!showDefaultAddress ? "" : ""
						} d-flex gap-1 justify-content-center align-items-center `}
					style={{ minHeight: 44 }}
					onClick={() => {
						addAddress();
					}}
				>
					{addressLoading ? <Spinner animation="border" /> : ""}
					Save & Continue
				</Button>
			</div>
		</div>
	);
};

export default MyAddAddresses;