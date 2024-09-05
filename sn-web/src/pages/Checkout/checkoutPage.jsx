import React, { useEffect, useState } from "react";
import snuslifeLogo from "../../assets/snuslifelogo.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signup from "../../components/signup/signup";
import Login from "../../components/signup/login";
import ForgetPassword from "../../components/signup/forgetPassword";
import { toast } from "react-toastify";
import { apiGET, apiPOST, apiPUT } from "../../utilities/apiHelpers";
import { removeUser, setUser } from "../../redux/users/users";
import { Button, Form, FormControl, Spinner } from "react-bootstrap";
import { Country } from "country-state-city";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { CiGift } from "react-icons/ci";
import { LuPlusCircle } from "react-icons/lu";
import { API_URL, WEB_URL } from "../../config";
import usaflag from "../../assets/usaflag.svg";
import canadaflag from "../../assets/canadaflag.svg";
import CheckoutAddress from "./checkoutAddress";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import CurrencyConvertComp from "../../components/currencyConvertComp";

const CheckoutPage = () => {
	const { userData = null, currency, currencyConvertedRate } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
	const [showLogin, setShowLogin] = useState(false);
	const [showForgetPassword, setShowForgetPassword] = useState(false);
	const [freeDelivery, setFreeDelivery] = useState(false);
	const [couponApplied, setCouponApplied] = useState(false);

	const [currentCoupon, setCurrentCoupon] = useState(null);
	const [couponCode, setCouponCode] = useState("");
	const [couponError, setCouponError] = useState("");
	const [couponDiscount, setCouponDiscount] = useState(0);
	const [couponLoading, setCouponLoading] = useState(false);
	const [vatCharge, setVatCharge] = useState(0);

	const [cartLoading, setCartLoading] = useState(true);
	const [cartWithCoupon, setCartWithCoupon] = useState([]);
	const [myCartData, setMyCartData] = useState([]);
	const [allAddresses, setAllAddresses] = useState([]);
	const [defaultAddress, setDefaultAddress] = useState({});
	const [showDefaultAddress, setShowDefaultAddress] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showAddressList, setShowAddressList] = useState(false);
	const [addressLoading, setAddressLoading] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const [currentStep, setCurrentStep] = useState(1);
	const [totalPrice, setTotalPrice] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [discountedSubTotal, setDiscountedSubTotal] = useState(0);
	const [deliveryCharge, setDeliveryCharge] = useState(0);
	const [originalDeliveryCharge, setOriginalDeliveryCharge] = useState(0);

	const [trnxNo, setTrnxNo] = useState(null);
	const [trnxId, setTrnxId] = useState(null);
	const [totalAmountToPay, setTotalAmountToPay] = useState(null);
	const [paymentLoading, setPaymentLoading] = useState(false);
	const [orderId, setOrderId] = useState(null);

	const [countryJson, setCountryJson] = useState([]);

	const [regions, setRegions] = useState([]);
	const [deliveryMethods, setDeliveryMethods] = useState([]);
	const [errorDelivery, setErrorDelivery] = useState("");
	const [royalmailServiceId, setRoyalMailServiceId] = useState("Royal Mail International Tracked");
	const [selectedOption, setSelectedOption] = useState("Royal Mail International Tracked");
	const [weightRange, setweightRanges] = useState([]);

	const [defaultDeliveryMethod, setDefaultDeliveryMethod] = useState({
		deliveryMethod: "",
		deliveryTime: "",
		shippingRate: "",
		shippingRateType: "",
	});

	const [showUSACanadaPopup, setShowUSACanadaPopup] = useState(false);

	const [newOrderNotes, setNewOrderNotes] = useState(defaultAddress?.orderNotes || "");
	const handleInputChange = (event) => {
		setNewOrderNotes(event.target.value);
	};
	// const getGeoInfo = () => {
	// 	axios.get("https://ipapi.co/json/")
	// 		.then((response) => {
	// 			let data = response.data;
	// 			if (
	// 				data.country_name == "United States" ||
	// 				data.country_name == "United States Minor Outlying Islands" ||
	// 				data.country_name == "Canada" ||
	// 				defaultAddress?.country == 'United States' ||
	// 				defaultAddress?.country == 'United States Minor Outlying Islands' ||
	// 				defaultAddress?.country == 'Canada'
	// 			) {
	// 				setShowUSACanadaPopup(true);
	// 			}
	// 		}).catch((error) => {
	// 			console.log(error);
	// 		});
	// }

	const handleShowSignup = () => {
		setShowLogin(false);
		setShowSignup(true);
	};

	const handleShowLogin = () => {
		setShowSignup(false);
		setShowLogin(true);
	};

	const handelShowForgetPassword = () => {
		setShowSignup(false);
		setShowLogin(false);
		setShowForgetPassword(true);
	};

	const handleCloseSignup = () => {
		setShowSignup(false);
	};

	const handleEditClick = () => {
		setEditMode(true);
	};

	const handleCloseLogin = () => {
		setShowLogin(false);
	};

	const handleCloseForgetPassword = () => {
		setShowForgetPassword(false);
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
				if (deliveryDetails[key] === "" || deliveryDetails[key] === undefined || deliveryDetails[key] == null) {
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

	const handleAddress = async () => {
		try {
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
				const response = await apiPOST(`/v1/address/update-address/${deliveryDetails?.id}`, payloadToUpdate);
				setAddressLoading(false);
				if (response?.status === 200) {
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
					getMyAllAddress();
					setShowDefaultAddress(true);
					setShowAddressList(false);
					setCurrentStep(2);
				} else {
					toast.error(response?.data?.data);
				}
			}
		} catch (error) {
			setAddressLoading(false);
			console.error("Error while add address:", error);
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
				handleAddress();
			} else if (userData == null) {
				let payload = { email: deliveryDetails?.email };
				let addUserResponse = await apiPOST("/v1/user/new-user", payload);
				if (addUserResponse.status == 200) {
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
					handleAddress();
					syncCart();
					getMyCart();
				} else {
					setAddressLoading(false);
					toast.error(addUserResponse?.data?.data);
				}
			}
		} catch (error) {
			setAddressLoading(false);
			console.error("Error while add address:", error);
		}
	};

	const updateOrdernotes = async () => {
		const payload = {
			orderNotes: newOrderNotes,
		};
		try {
			const response = await apiPUT(`/v1/address/update-ordernotes/${defaultAddress?.id}`, payload);
			if (response?.status === 200) {
				getMyAllAddress();
			} else {
				toast.error(response?.data?.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
		setEditMode(false);
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
	const matchedCountries = countryJson.filter((country) =>
		regions.some((regionCountry) => regionCountry === country.name)
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

	const initiatePayment = async () => {
		try {
			if (orderId === null || orderId == undefined || orderId == "") {
				toast.error("Error in order creation");
				return;
			}
			let payload = {
				session: {
					returnUrl: {
						url: `${WEB_URL}/checkout/thankyou/${orderId}`,
					},
					skin: "800018569",
					transactionNotification: {
						url: `${API_URL}/v1/transaction/updateTransaction`,
						format: "REST_JSON",
					},
				},
				customFields: {
					dataFieldOrTextFieldOrLabelField: [
						{
							dataField: {
								name: "dataFieldName1",
								value: trnxNo,
								transient: true,
							},
						},
						{
							dataField: {
								name: "dataFieldName2",
								value: royalmailServiceId,
								transient: true,
							},
						},
						{
							dataField: {
								name: "dataFieldName3",
								value: orderId,
								transient: true,
							},
						},
					],
				},
				transaction: {
					merchantReference:
						currency === "GBP"
							? "47128534"
							: currency === "USD"
							? "48616284"
							: currency === "CAD"
							? "48617674"
							: "47128534",
					money: {
						amount: {
							fixed: totalAmountToPay,
						},
						currency: currency != -undefined && currency !== "" ? currency : "GBP",
					},
				},
				customer: {
					identity: {
						merchantCustomerId: userData?.id,
					},
					details: {
						name: defaultAddress?.firstName + " " + defaultAddress?.lastName,
						address: {
							line1: defaultAddress?.address,
							line2: defaultAddress?.addressLine2,
							city: defaultAddress?.city,
							region: defaultAddress?.state || "",
							postcode: defaultAddress?.zip,
							countryCode: defaultAddress?.iso,
						},
						telephone: defaultAddress?.phone,
						emailAddress: userData?.email,
						ipAddress: "1.1.1.1",
						defaultCurrency: currency != -undefined && currency !== "" ? currency : "GBP",
					},
				},
				financialServices: {
					dateOfBirth: "19870818",
					surname: "Smith",
					accountNumber: "123ABC",
					postCode: "BS20",
				},
			};

			const response = await apiPOST("/v1/transaction/createpayment", payload);
			if (response?.status === 200) {
				window.location.href = response?.data?.data?.redirectUrl;
			} else {
				toast.error("Something went wrong, please try after some time.");
				setPaymentLoading(false);
			}
		} catch (error) {
			setPaymentLoading(false);
			toast.error("Error while payment initiate", error);
		}
	};
	const createCartProductDetails = async () => {
		let productDetail = [];
		let totalAmount = 0;
		if (cartWithCoupon?.length > 0) {
			for (let i = 0; i < cartWithCoupon?.length; i++) {
				let currentProduct = cartWithCoupon[i];
				if (!currentProduct.hasOwnProperty("productDetail")) {
					if (currentProduct.hasOwnProperty("sale_price")) {
						if (currentProduct?.variants) {
							productDetail.push({
								productId: currentProduct?.productDetails[0]?._id,
								quantity: currentProduct?.quantity,
								productDetailsObj: {
									...currentProduct?.productDetails[0],
									...{
										discountedSalePrice: currentProduct?.sale_price,
										couponName: currentProduct?.couponName,
									},
								},
								selectedVariant: currentProduct?.variants,
							});
						} else {
							productDetail.push({
								productId: currentProduct?.productDetails[0]?._id,
								quantity: currentProduct?.quantity,
								productDetailsObj: {
									...currentProduct?.productDetails[0],
									...{
										discountedSalePrice: currentProduct?.sale_price,
										couponName: currentProduct?.couponName,
									},
								},
							});
						}
					} else {
						if (currentProduct?.variants) {
							productDetail.push({
								productId: currentProduct?.productDetails[0]?._id,
								quantity: currentProduct?.quantity,
								productDetailsObj: currentProduct?.productDetails[0],
								selectedVariant: currentProduct?.variants,
							});
						} else {
							productDetail.push({
								productId: currentProduct?.productDetails[0]?._id,
								quantity: currentProduct?.quantity,
								productDetailsObj: currentProduct?.productDetails[0],
							});
						}
					}
				} else {
					// For normal product
					if (currentProduct?.hasOwnProperty("sale_price")) {
						productDetail.push({
							productId: currentProduct?.productDetails[0]?._id,
							quantity: currentProduct?.quantity,
							productDetailsObj: {
								...currentProduct?.productDetails[0],
								...{
									discountedSalePrice: currentProduct?.sale_price,
									couponName: currentProduct?.couponName,
								},
							},
							subProduct: currentProduct?.productDetail[0]?.subProduct || [],
						});
					} else {
						productDetail.push({
							productId: currentProduct?.productDetails[0]?._id,
							quantity: currentProduct?.quantity,
							productDetailsObj: currentProduct?.productDetails[0],
							subProduct: currentProduct?.productDetail[0]?.subProduct || [],
						});
					}
				}
				totalAmount += Number(
					(currentProduct?.hasOwnProperty("sale_price")
						? Number(currentProduct?.sale_price * currentProduct?.quantity)
						: Number(currentProduct?.productDetails[0]?.price * currentProduct?.quantity)
					).toFixed(2)
				);
			}
		}
		totalAmount += deliveryCharge;
		if (currentCoupon?.apply_to === "minimum_order_subtotal" && couponDiscount) {
			totalAmount = Number(Number(totalAmount - couponDiscount).toFixed(2));
		}
		return { productDetail, totalAmount };
	};

	const createTrnxToken = async () => {
		setPaymentLoading(true);
		try {
			if (cartWithCoupon?.length == 0) {
				toast.error("Your cart is empty");
				setPaymentLoading(false);
				return;
			}

			let { productDetail, totalAmount } = await createCartProductDetails();

			let payload = {
				productDetail,
				paymentMode: "online",
				paymentStatus: "unpaid",
				orderStatus: "unfulfilled",
				shippingAdderess: { shippingAddressId: defaultAddress?.id },
				deliveryMethod: selectedOption,
				deliveryCharge: Number((deliveryCharge * currencyConvertedRate).toFixed(2)),
				amountToPay: Number((totalPrice * currencyConvertedRate).toFixed(2)),
				currency,
				currencyRate: Number(currencyConvertedRate),
				couponId: currentCoupon?.id || null,
				couponType: currentCoupon?.type || "",
				couponName: currentCoupon?.name || "",
				couponDiscount:
					currentCoupon?.type == "free_shipping"
						? Number((originalDeliveryCharge * currencyConvertedRate).toFixed(2))
						: Number((couponDiscount * currencyConvertedRate).toFixed(2)) || 0,
			};
			if (defaultAddress?.country == "United Kingdom") {
				payload = { ...payload, vatCharge: vatCharge };
			}
			// console.log("payload to transaction :-", payload)
			const response = await apiPOST(`/v1/transaction/transactionRequest`, payload);
			if (response?.data?.status) {
				setTrnxId(response?.data?.data?.id);
				setTrnxNo(response?.data?.data?.trnxNo);
				setTotalAmountToPay(response?.data?.data?.amountToPay);
			} else {
				setPaymentLoading(false);
				toast.error(response?.data?.data);
			}
		} catch (error) {
			setPaymentLoading(false);
			toast.error("Error while payment initiate", error);
		}
	};

	const createOrder = async () => {
		try {
			if (cartWithCoupon?.length == 0) {
				toast.error("Your cart is empty");
				setPaymentLoading(false);
				return;
			}
			let { productDetail, totalAmount } = await createCartProductDetails();

			let payload = {
				productDetail,
				paymentMode: "online",
				paymentStatus: "unpaid",
				orderStatus: "unfulfilled",
				shippingAdderess: { shippingAddressId: defaultAddress?.id },
				deliveryMethod: selectedOption,
				deliveryCharge: Number((deliveryCharge * currencyConvertedRate).toFixed(2)),
				deliveryTime: defaultDeliveryMethod.deliveryTime,
				amountToPay: Number((totalPrice * currencyConvertedRate).toFixed(2)),
				currency,
				currencyRate: Number(currencyConvertedRate),
				transactionId: trnxId,
				couponId: currentCoupon?.id || null,
				couponType: currentCoupon?.type || "",
				couponName: currentCoupon?.name || "",
				couponDiscount:
					currentCoupon?.type == "free_shipping"
						? Number((originalDeliveryCharge * currencyConvertedRate).toFixed(2))
						: Number((couponDiscount * currencyConvertedRate).toFixed(2)) || 0,
			};
			if (defaultAddress?.country == "United Kingdom") {
				payload = { ...payload, vatCharge: vatCharge };
			}

			// console.log("Payload to order--", payload)
			const response = await apiPOST(`/v1/order/add-order`, payload);
			// setPaymentLoading(false)

			if (response?.data?.status) {
				setOrderId(response?.data?.data?.id);
				setTotalAmountToPay(response?.data?.data?.amountToPay);
			} else {
				toast.error(response?.data?.data);
				setPaymentLoading(false);
			}
		} catch (error) {
			setPaymentLoading(false);
			toast.error("Error while order creation", error);
		}
	};

	const getShippingMetByCountry = async () => {
		try {
			if (defaultAddress?.country == "" || defaultAddress?.country == undefined) {
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
					shippingRateType: shippings.data.data.shippingRateType,
				});

				arr.forEach((option) => {
					if (option.weightRanges) {
						setweightRanges(option.weightRanges);
					}
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

	const calculateShippingRateByWeight = (weightRanges) => {
		let totalWeight = 0;
		if (!couponApplied && !freeDelivery && cartWithCoupon?.length) {
			cartWithCoupon.forEach((item) => {
				item.productDetails.forEach((product) => {
					if (product.weight !== undefined && item.quantity !== undefined) {
						totalWeight += product.weight * item.quantity;
					} else {
						console.log("Product weight or item quantity is missing:", product, item.quantity);
					}
				});
			});

			for (let range of weightRanges) {
				if (
					totalWeight >= Number(range?.minWeight) &&
					range?.maxWeight !== "And Up" &&
					totalWeight < Number(range?.maxWeight)
				) {
					setDefaultDeliveryMethod({
						...defaultDeliveryMethod,
						shippingRate: Number(range.rate),
					});
					setDeliveryCharge(Number(range.rate));
					setOriginalDeliveryCharge(Number(range.rate));
					setDeliveryMethods((currentOptions) => {
						return currentOptions.map((option, index) => {
							if (index === 0) {
								// Check if it's the first item
								return { ...option, shippingRate: Number(range.rate) }; // Update shippingRate
							}
							return option; // Return other items unchanged
						});
					});
				} else if (totalWeight >= Number(range?.minWeight) && range?.maxWeight === "And Up") {
					setDefaultDeliveryMethod({
						...defaultDeliveryMethod,
						shippingRate: Number(range.rate),
					});
					setDeliveryCharge(Number(range.rate));
					setOriginalDeliveryCharge(Number(range.rate));
					setDeliveryMethods((currentOptions) => {
						return currentOptions.map((option, index) => {
							if (index === 0) {
								// Check if it's the first item
								return { ...option, shippingRate: Number(range.rate) }; // Update shippingRate
							}
							return option; // Return other items unchanged
						});
					});
				}
			}
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

	const applyCouponToCartItem = (cartItem, coupon) => {
		if (cartItem.productDetails && cartItem.productDetails[0]) {
			const productId = cartItem.productDetails[0]._id;
			const originalPrice = cartItem?.sale_price ? cartItem?.sale_price : cartItem.productDetails[0].price;
			if (
				(coupon.apply_to === "all_products" ||
					(coupon.apply_to === "specific_products" && coupon.specific_products?.includes(productId)) ||
					(coupon.apply_to === "specific_brand" &&
						cartItem?.productDetails[0]?.categoryArray.includes(coupon?.specific_brand))) &&
				coupon.type === "percentage"
			) {
				// Calculate the discounted price without multiplying by quantity
				const discountPercentage = coupon.discount_percentage;
				const discountedPrice = originalPrice - originalPrice * (discountPercentage / 100);
				cartItem.couponName = coupon.name;
				cartItem.sale_price = Number(discountedPrice.toFixed(2));
			} else if (
				(coupon.apply_to === "all_products" ||
					(coupon.apply_to === "specific_products" && coupon.specific_products?.includes(productId)) ||
					(coupon.apply_to === "specific_brand" &&
						cartItem?.productDetails[0]?.categoryArray.includes(coupon?.specific_brand))) &&
				coupon.type === "price"
			) {
				// Subtract the discount_price from the original price
				const discountedPrice = originalPrice - coupon.discount_price;
				// Ensure the discounted price is not negative
				const sale_price = Math.max(0, discountedPrice);
				cartItem.sale_price = Number(sale_price.toFixed(2));
				cartItem.couponName = coupon.name;
			}
		}

		return cartItem;
	};

	const applyCoupon = async () => {
		setCouponLoading(true);
		try {
			if (cartWithCoupon?.length == 0) {
				toast.error("Your cart is empty");
				setCouponLoading(false);
				return;
			}
			if (couponCode == "" || couponCode == undefined || couponCode == null) {
				setCouponError("Coupon code is empty");
				toast.error("Please enter coupon code");
				setCouponLoading(false);
				return;
			}

			let payload = {
				cartData: cartWithCoupon,
				couponCode,
				deliveryCharge: deliveryCharge,
			};

			setCouponLoading(false);
			const response = await apiPOST("v1/coupon/apply-coupon", payload);
			if (response?.status === 200) {
				let coupon = response?.data?.data;
				if (response?.data?.data?.coupon?.type == "free_shipping") {
					setDeliveryCharge(0);
					setFreeDelivery(true);
					setOriginalDeliveryCharge(Number(deliveryCharge));
					setCouponDiscount(Number(deliveryCharge));
					setCouponApplied(true);
					setCurrentCoupon(response?.data?.data?.coupon);
				} else {
					setSubTotal(Number(coupon?.originalPrice));
					setDiscountedSubTotal(Number(coupon?.discountedTotalPrice));
					setTotalPrice(Number(coupon?.discountedTotalPrice) + Number(deliveryCharge));
					setCouponApplied(true);
					setCurrentCoupon(coupon?.coupon);
					let cartDataWithDiscount = cartWithCoupon;
					if (coupon?.coupon?.apply_to == "all_products") {
						if (coupon?.coupon?.type == "percentage") {
							cartDataWithDiscount = cartWithCoupon.map((cartItem) =>
								applyCouponToCartItem(cartItem, coupon?.coupon)
							);
						} else if (coupon?.coupon?.type == "price") {
							cartDataWithDiscount = cartWithCoupon.map((cartItem) =>
								applyCouponToCartItem(cartItem, coupon?.coupon)
							);
						}
					} else if (coupon?.coupon?.apply_to == "specific_products") {
						if (coupon?.coupon?.type == "percentage") {
							cartDataWithDiscount = cartWithCoupon.map((cartItem) =>
								applyCouponToCartItem(cartItem, coupon?.coupon)
							);
						} else if (coupon?.coupon?.type == "price") {
							cartDataWithDiscount = cartWithCoupon.map((cartItem) =>
								applyCouponToCartItem(cartItem, coupon?.coupon)
							);
						}
					} else if (coupon?.coupon?.apply_to == "specific_brand") {
						if (coupon?.coupon?.type == "percentage") {
							cartDataWithDiscount = cartWithCoupon.map((cartItem) =>
								applyCouponToCartItem(cartItem, coupon?.coupon)
							);
						} else if (coupon?.coupon?.type == "price") {
							cartDataWithDiscount = cartWithCoupon.map((cartItem) =>
								applyCouponToCartItem(cartItem, coupon?.coupon)
							);
						}
					} else if (coupon.coupon?.apply_to == "minimum_order_subtotal") {
					}
					let discountedPrice = Number(
						(Number(coupon?.originalPrice) - Number(coupon?.discountedTotalPrice)).toFixed(2)
					);

					if (coupon.coupon?.apply_to == "minimum_order_subtotal_shipping") {
						setTotalPrice(Number(coupon?.discountedTotalPrice));
						setSubTotal(Number((Number(coupon?.originalPrice) - deliveryCharge).toFixed(2)));
						discountedPrice = Number(
							(Number(coupon?.originalPrice) - Number(coupon?.discountedTotalPrice)).toFixed(2)
						);
					}
					setCouponDiscount(discountedPrice);
					setCartWithCoupon(cartDataWithDiscount);
				}
			} else {
				setCouponApplied(false);
				setCouponError(response?.data?.data);
			}
		} catch (e) {
			setCouponLoading(false);
			toast.error("Error while apply coupon - ", e);
		}
	};
	// console.log("cart : ",cartWithCoupon);

	const handleRemoveCoupon = () => {
		setCouponLoading(true);
		getMyCart();
		setCouponCode("");
		setCouponError("");
		setCouponApplied(false);
		setFreeDelivery(false);
		setCurrentCoupon(null);
		setCouponDiscount(0);
		setDeliveryCharge(Number(originalDeliveryCharge));
		setTotalPrice(Number(discountedSubTotal) + Number(originalDeliveryCharge));
		setCouponLoading(false);
	};

	useEffect(() => {
		if (orderId != null) initiatePayment();
	}, [orderId]);
	useEffect(() => {
		if (trnxId != null) createOrder();
	}, [trnxId]);

	useEffect(() => {
		const vatCharges = cartWithCoupon && cartWithCoupon?.map((item) => item.productDetails[0].vatCharge);
		const maxVatCharge = vatCharges && vatCharges?.reduce((max, current) => Math.max(max, current), 0);
		setVatCharge(maxVatCharge);
	}, [cartWithCoupon]);

	useEffect(() => {
		const applyAutoDiscount = async () => {
			try {
				let payload = {
					cartData: myCartData || [],
				};
				const response = await apiPOST("v1/coupon/apply-auto-discount", payload);
				if (response?.status === 200) {
					setCartWithCoupon(response?.data?.data?.cartData);
					let carts = response?.data?.data?.cartData;
					let subTotal = 0;
					let discountedTotal = 0;
					if (carts?.length) {
						for (let i = 0; i < carts.length; i++) {
							subTotal += Number(carts[i]?.productDetails[0]?.price) * Number(carts[i]?.quantity);
							discountedTotal +=
								Number(carts[i]?.sale_price || carts[i]?.productDetails[0]?.price) *
								Number(carts[i]?.quantity);
						}
					}
					subTotal = Number(subTotal.toFixed(2));
					discountedTotal = Number(discountedTotal.toFixed(2));
					let finalPrice = Number(discountedTotal.toFixed(2)) + deliveryCharge;
					setTotalPrice(finalPrice);
					setSubTotal(discountedTotal);
					setDiscountedSubTotal(discountedTotal);
				}
			} catch (e) {
				toast.error("Error while apply auto discount coupon - ", e);
			}
		};

		applyAutoDiscount();
	}, [myCartData, deliveryCharge]);

	useEffect(() => {
		if (defaultAddress?.country != "" || defaultAddress?.country != undefined) {
			getShippingMetByCountry();
		}
	}, [defaultAddress?.country]);

	// useEffect(() => {
	// 	if (deliveryDetails?.country == 'United States'
	// 		|| deliveryDetails?.country == 'Canada'
	// 		|| deliveryDetails?.country === 'United States Minor Outlying Islands') {
	// 		setShowUSACanadaPopup(true)
	// 	}
	// }, [deliveryDetails?.country])

	useEffect(() => {
		if (userData != null) {
			syncCart();
			getMyAllAddress();
		} else {
			getMyCart();
		}
	}, [userData]);

	useEffect(() => {
		// getGeoInfo()
		getMyAllAddress();
		getMyCart();
		getCountryCodeByName();
		getAllShippingRegions();

		return () => {
			document.removeEventListener("mousedown", handleCloseSignup);
		};
	}, []);

	useEffect(() => {
		if (defaultDeliveryMethod?.shippingRateType && defaultDeliveryMethod?.shippingRateType === "Rate By Weight") {
			calculateShippingRateByWeight(weightRange);
		}
	}, [weightRange, cartWithCoupon]);

	return (
		<div className="container my-5">
			{/* {showUSACanadaPopup ? (
				<div className="over18modal">
					<div
						className="over18modal-div1"
						style={{
							padding: 10,
							marginTop: 20,
							backgroundColor: "#0396ff",
							color: "white",
							borderRadius: "10px",
						}}
					>
						<div className="d-flex gap-3 align-items-center justify-content-center">
							<LazyLoadImage effect='blur' src={canadaflag} height='20px' style={{ padding: "0px 5px" }} alt='canadaflag' />
							<LazyLoadImage effect='blur' src={usaflag} height='20px' style={{ padding: "0px 5px" }} alt='usaflag' />
						</div>
						<div
							className="w-100 font-serif text-size-low d-flex justify-content-center"
							style={{ color: "white" }}
						>
							<p
								style={{
									fontSize: "18px",
									fontWeight: "bold",
									marginTop: 10,
									alignSelf: "center",
									justifyContent: "center",
									justifySelf: "center",
									textAlign: "center",
								}}
							>
								We now have a dedicated site for Canada and USA customers !
							</p>
						</div>
						<div className="text-center" style={{ color: "white" }}>
							Head over to that site to complete your order. This one does not take orders for Canada and USA
						</div>

						<div className="isOver18Button">
							<button
								className="over18button px-4  border-0 text-black"
								style={{ borderRadius: "10px", background: "#F0F0F0" }}
							>
								<a href="http://thesnuslifeatlantic.com"
									target="_blank"
									className="text-decoration-none text-dark">
									Continue to
									<LazyLoadImage effect='blur' src={canadaflag} height='20px' style={{ padding: "0px 5px" }} alt='canadaflag' />
									and <LazyLoadImage effect='blur' src={usaflag} height='20px' style={{ padding: "0px 5px" }} alt='usaflag' />
									site
								</a>
							</button>
						</div>
					</div>
				</div>) : ""
			} */}
			<div className="d-flex align-items-center justify-content-between">
				<Link to="/" className="text-dark text-decoration-none d-flex gap-3 align-items-center">
					<LazyLoadImage effect="blur" src={snuslifeLogo} alt="Logo" style={{ width: "55px" }} />
					<p
						className="fs-4 mb-0 text-uppercase fw-bold"
						style={{ letterSpacing: "3px", textDecoration: "none" }}
					>
						Checkout
					</p>
				</Link>
				<Link to="/" className="text-dark text-decoration-none ">
					Continue Browsing
				</Link>
			</div>
			<hr className="bg-secondary " />

			<Signup show={showSignup} handleClose={handleCloseSignup} handleShowLogin={handleShowLogin} />
			<Login
				show={showLogin}
				handleClose={handleCloseLogin}
				handleShowSignup={handleShowSignup}
				handelShowForgetPassword={handelShowForgetPassword}
			/>
			<ForgetPassword show={showForgetPassword} handleClose={handleCloseForgetPassword} />

			<div className="row">
				<div className="col-12 col-lg-8">
					<div className="bg-secondary-subtle rounded-2 py-3 px-3 d-flex gap-4 align-items-center justify-content-between  ">
						<div className="d-flex gap-2 align-items-center">
							{userData?.email ? (
								<span>{userData?.email}</span>
							) : (
								<>
									<span>Already have an account?</span>
									<span
										onClick={() => handleShowLogin()}
										className="cursor-pointer text-decoration-underline "
									>
										Log In
									</span>
									<span>for a faster checkout.</span>
								</>
							)}
						</div>
						{userData?.email ? (
							<div
								className="cursor-pointer text-decoration-underline "
								onClick={() => {
									handleLogout();
								}}
							>
								Log Out
							</div>
						) : (
							""
						)}
					</div>

					<div className="mt-3">
						<div className="d-flex gap-4 align-items-center justify-content-between ">
							<div className="fs-5" style={{ fontWeight: 600 }}>
								Delivery Details
							</div>
							{!showAddressList && allAddresses?.length ? (
								<div
									className="cursor-pointer text-decoration-underline "
									onClick={() => {
										setShowAddressList(true);
										setCurrentStep(1);
										setTrnxId(null);
										setTrnxNo(null);
										setOrderId(null);
										setTotalAmountToPay(null);
									}}
								>
									Change
								</div>
							) : (
								""
							)}
						</div>
						{showAddressList && allAddresses?.length > 0 ? (
							<div className="mt-2">
								<div className="">Choose an address</div>
								<div className="mt-1">
									<div>
										<div
											className="d-flex justify-content-between align-items-center border border-black rounded-2 p-2"
											onClick={() => {
												setIsDropdownOpen(!isDropdownOpen);
											}}
										>
											{defaultAddress?.address} {defaultAddress?.city} {defaultAddress?.country}
											{isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
										</div>
										{isDropdownOpen ? (
											<div>
												{allAddresses.map((address, idx) => (
													<div
														key={idx}
														className="bg-secondary-subtle mt-1 p-2 cursor-pointer"
														onClick={() => {
															setDefaultAddress(allAddresses[idx]);
															setDeliveryDetails(allAddresses[idx]);
															setIsDropdownOpen(false);
														}}
													>
														{address?.firstName} {address?.lastName} {address?.email}
														<br />
														{address?.address} {address?.city} {address?.state}{" "}
														{address?.zip}
														<br />
														{address?.country} {address?.phone}
													</div>
												))}
												<div
													className="bg-secondary-subtle d-flex gap-2 p-2 cursor-pointer mt-1"
													onClick={() => {
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
														setIsDropdownOpen(false);
														setShowDefaultAddress(false);
													}}
												>
													<LuPlusCircle style={{ width: 20, height: 20 }} />
													<span className="">Add new address</span>
												</div>
											</div>
										) : (
											""
										)}
									</div>
								</div>
							</div>
						) : (
							""
						)}
						{defaultAddress?.country && showDefaultAddress ? (
							<div className="mt-2">
								<div className="d-flex justify-content-between">
									<div className="d-flex gap-2">
										<span>{defaultAddress?.firstName}</span>
										<span>{defaultAddress?.lastName}</span>
									</div>
									{showAddressList ? (
										<div
											className="text-decoration-underline me-2 cursor-pointer"
											onClick={() => {
												setShowDefaultAddress(false);
												setDeliveryDetails(defaultAddress);
											}}
										>
											Edit
										</div>
									) : (
										""
									)}
								</div>
								<div> {defaultAddress?.email}</div>
								<div>
									<span>
										{"  "}
										{defaultAddress?.address}
									</span>
									<span>
										{"  "} {defaultAddress?.addressLine2}
									</span>
									<span>
										{" "}
										{"  "}
										{defaultAddress?.city}
									</span>
									<span>
										{" "}
										{"  "}
										{defaultAddress?.state}
									</span>
									<span>
										{" "}
										{"  "}
										{defaultAddress?.zip},
									</span>
								</div>
								<div>{defaultAddress?.country}</div>
								<div>{defaultAddress?.phone}</div>
								<div>Order Note : {defaultAddress?.orderNotes}</div>
							</div>
						) : (
							<div className="mt-3 row gap-3 ">
								<div>
									<label className="mb-1">
										First Name <span className="text-danger ">*</span>
									</label>
									<input
										value={deliveryDetails?.firstName || ""}
										onChange={(e) => {
											let firstName = e.target.value;
											if (firstName == undefined || firstName == "" || firstName == null) {
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
										className={`form-control border ${
											formErrors?.firstName ? "border-danger " : "border-dark"
										}`}
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
											if (lastName == undefined || lastName == "" || lastName == null) {
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
										className={`form-control border ${
											formErrors?.lastName ? "border-danger " : "border-dark"
										}`}
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
											if (phone == undefined || phone == "" || phone == null) {
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
										className={`form-control border ${
											formErrors?.phone ? "border-danger " : "border-dark"
										}`}
										type="phone"
										placeholder="Phone"
									/>
								</div>
								<div>
									<label className="mb-1">
										Email <span className="text-danger">*</span>
									</label>
									<input
										value={deliveryDetails?.email || ""}
										onChange={(e) => {
											let email = e.target.value;
											if (email == undefined || email == "" || email == null) {
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
										className={`form-control border ${
											formErrors?.email ? "border-danger " : "border-dark"
										}`}
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
										className={`form-control border ${
											formErrors?.country ? "border-danger " : "border-dark"
										}`}
										onChange={(e) => {
											let country = e.target.value;
											if (country == undefined || country == "" || country == null) {
												setFormErrors({
													...formErrors,
													country: "Country is required field.",
												});
											} else {
												const { ["country"]: _, ...newState } = formErrors;
												setFormErrors(newState);
											}
											let countryIso = countryJson
												?.filter((e) => e.name == country)
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

								{/* <div>
									<label className='mb-1'>Address <span className='text-danger '>*</span></label>
									<input
										value={deliveryDetails?.address || ""}
										onChange={(e) => {
											let address = e.target.value;
											if (address == undefined || address == "" || address == null) {
												setFormErrors({
													...formErrors,
													address: "Address is required field."
												})
											} else {
												const { ["address"]: _, ...newState } = formErrors;
												setFormErrors(newState)
											}
											setDeliveryDetails({
												...deliveryDetails,
												address: address
											})
										}}
										name="address"
										className={`form-control border ${formErrors?.address ? 'border-danger ' : "border-dark"}`}
										type="text"
										placeholder="Address"
									/>
								</div> */}
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
											if (city == undefined || city == "" || city == null) {
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
										className={`form-control border ${
											formErrors?.city ? "border-danger " : "border-dark"
										}`}
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
												if (state == undefined || state == "" || state == null) {
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
											className={`form-control border ${
												formErrors?.state ? "border-danger " : "border-dark"
											}`}
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
												if (zip == undefined || zip == "" || zip == null) {
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
											className={`form-control border ${
												formErrors?.zip ? "border-danger " : "border-dark"
											}`}
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
											// if (orderNotes == undefined || orderNotes == "" || orderNotes == null) {
											// 	setFormErrors({
											// 		...formErrors,
											// 		orderNotes: "Order Notes is required field."
											// 	})
											// }
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

								<div className="d-flex gap-2 justify-content-center ">
									{!showDefaultAddress ? (
										<button
											type="button"
											className="btn btn-outline-dark w-100 "
											style={{ maxWidth: "48%", minHeight: 44 }}
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
										className={`btn btn-dark w-100 ${
											!showDefaultAddress ? "" : ""
										} d-flex gap-1 justify-content-center align-items-center `}
										style={{ maxWidth: "48%", minHeight: 44 }}
										onClick={() => {
											addAddress();
										}}
									>
										{addressLoading ? <Spinner animation="border" /> : ""}
										Save & Continue
									</Button>
								</div>
							</div>
						)}
						{showDefaultAddress && currentStep === 1 ? (
							<Button
								type="button"
								style={{ minHeight: 44 }}
								disabled={addressLoading}
								className={`mt-2 btn btn-dark w-100 d-flex gap-1 justify-content-center align-items-center `}
								onClick={() => {
									addAddress();
								}}
							>
								{addressLoading ? <Spinner animation="border" /> : ""}
								Continue
							</Button>
						) : (
							""
						)}
					</div>

					<hr />
					<div className="mt-4">
						<div className="d-flex gap-4 align-items-center justify-content-between ">
							<div className="fs-5" style={{ fontWeight: 600 }}>
								Delivery Method
							</div>
							{currentStep === 3 ? (
								<div
									className="cursor-pointer text-decoration-underline "
									onClick={() => {
										setCurrentStep(2);
										setTrnxId(null);
										setTrnxNo(null);
										setOrderId(null);
										setTotalAmountToPay(null);
									}}
								>
									Change
								</div>
							) : (
								""
							)}
						</div>

						{deliveryMethods?.length && currentStep === 2 ? (
							<div className="d-grid gap-2 mt-2 ">
								{deliveryMethods.map((delMethod, delId) => (
									<div
										key={delId}
										className="d-flex gap-3 border border-primary bg-primary-subtle rounded-1 p-2 cursor-pointer"
									>
										<Form.Check
											type="radio"
											onChange={() => {
												setDefaultDeliveryMethod({
													deliveryMethod: delMethod?.deliveryMethod,
													deliveryTime: delMethod?.deliveryTime,
													shippingRate: delMethod?.shippingRate,
												});
												setSelectedOption(delMethod?.deliveryMethod);
												setRoyalMailServiceId(delMethod?.deliveryMethod);
												setDeliveryCharge(Number(delMethod?.shippingRate));
												setOriginalDeliveryCharge(Number(delMethod?.shippingRate));
											}}
											checked={selectedOption === delMethod?.deliveryMethod}
											className="cursor-pointer"
											id={`check-${delId}`} // Ensure the ID is unique
										/>
										<label htmlFor={`check-${delId}`} className="html-label w-100 cursor-pointer">
											<div>
												<div className="d-flex flex-wrap gap-2 align-items-center justify-content-between ">
													<div>{delMethod?.deliveryMethod}</div>
													<div>
														<CurrencyConvertComp amount={delMethod?.shippingRate} />
													</div>
												</div>
												<div>{delMethod?.deliveryTime}</div>
											</div>
										</label>
									</div>
								))}
							</div>
						) : errorDelivery?.length === 0 &&
						  defaultDeliveryMethod?.deliveryMethod !== "" &&
						  currentStep === 3 ? (
							<div className="mt-2">
								<div className="d-flex flex-wrap gap-2 align-items-center justify-content-between ">
									<div>{defaultDeliveryMethod?.deliveryMethod}</div>
									<div>
										<CurrencyConvertComp amount={deliveryCharge} />
									</div>
								</div>
								<div>{defaultDeliveryMethod?.deliveryTime}</div>
							</div>
						) : (
							""
						)}

						{errorDelivery.length && currentStep === 2 ? <div>{errorDelivery}</div> : ""}

						{currentStep === 2 ? (
							<Button
								type="button"
								style={{ minHeight: 44 }}
								className={`mt-2 btn btn-dark w-100`}
								onClick={() => {
									// createTrnxToken()
									setCurrentStep(3);
								}}
							>
								Continue
							</Button>
						) : (
							""
						)}
					</div>

					<hr />
					<div className="mt-4">
						<div className="d-flex gap-4 align-items-center justify-content-between ">
							<div className="fs-5" style={{ fontWeight: 600 }}>
								Payment
							</div>
						</div>
						{showDefaultAddress && currentStep === 3 ? (
							<Button
								type="button"
								disabled={paymentLoading}
								style={{ minHeight: 44 }}
								className={`mt-2 btn btn-dark w-100 d-flex justify-content-center  align-items-center gap-1`}
								onClick={() => {
									createTrnxToken();
								}}
							>
								{paymentLoading ? <Spinner animation="border" /> : ""}
								Place Order & Pay
							</Button>
						) : (
							""
						)}
					</div>
					<hr />
				</div>

				{/* Order Summary */}
				<div className="col-12 col-lg-4 mt-3 mt-lg-0">
					<div className="bg-secondary-subtle rounded-2 p-3">
						<div className="d-flex gap-4 align-items-center justify-content-between ">
							<div className="fs-5" style={{ fontWeight: 600 }}>
								Order Summary ({cartWithCoupon?.length || 0})
							</div>
							<Link to="/cart" className="text-dark">
								Edit cart
							</Link>
						</div>
						<hr />
						{cartLoading ? (
							<div className="d-grid justify-content-center " style={{ placeItems: "center" }}>
								<div className="spinner-border text-primary" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
								Loading Cart ...
							</div>
						) : cartWithCoupon?.length ? (
							<div
								className="d-grid gap-3 cart-scrollbar"
								style={{ maxHeight: 400, overflowY: "scroll" }}
							>
								{cartWithCoupon.map((cartItem, cartId) =>
									!cartItem?.productDetail?.length ? (
										<div
											key={cartId}
											className="row gap-2 w-100 justify-content-between pb-1"
											style={{ borderBottom: "1px solid grey" }}
										>
											<div className="d-flex gap-3 col-8 ">
												<LazyLoadImage
													src={cartItem?.productDetails[0].productImageUrl}
													alt={
														cartItem?.productDetails[0]?.imageAltText ||
														cartItem?.productDetails[0]?.name
													}
													style={{ width: 60, height: 60 }}
													className="border border-secondary "
												/>
												<div>
													<div>{cartItem?.productDetails[0]?.name}</div>
													{cartItem?.variants?.pots ? (
														<div className="text-secondary" style={{ fontSize: 14 }}>
															({cartItem?.variants?.pots} Pots)
														</div>
													) : cartItem?.variants?.size ? (
														<div className="text-secondary" style={{ fontSize: 14 }}>
															({cartItem?.variants?.size} Size)
														</div>
													) : (
														""
													)}
													{cartItem?.couponName ? (
														<div className="text-primary" style={{ fontSize: 14 }}>
															{cartItem?.couponName}
														</div>
													) : (
														""
													)}
													<div className="mt-1">Qty : {cartItem?.quantity}</div>
												</div>
											</div>
											{cartItem?.sale_price ? (
												<div className="col-3 text-end " style={{fontSize:"14px"}}>
													<div className="text-decoration-line-through ">
														<CurrencyConvertComp
															amount={
																cartItem?.productDetails[0]?.price * cartItem?.quantity
															}
														/>
													</div>
													<div className="ml-1">
														<CurrencyConvertComp
															amount={cartItem?.sale_price * cartItem?.quantity}
														/>
													</div>
												</div>
											) : (
												<div className="col-3 text-end" style={{fontSize:"14px"}}>
													<CurrencyConvertComp
														amount={cartItem?.productDetails[0]?.price * cartItem?.quantity}
													/>
												</div>
											)}
										</div>
									) : (
										<div key={cartId} style={{ borderBottom: "1px solid grey" }}>
											<div className="row gap-2 w-100 justify-content-between pb-1">
												<div className="d-flex gap-3 col-8 ">
													<LazyLoadImage
														src={cartItem?.productDetails[0].productImageUrl}
														alt={
															cartItem?.productDetails[0]?.imageAltText ||
															cartItem?.productDetails[0]?.name
														}
														style={{ width: 60, height: 60 }}
														className="border border-secondary"
													/>
													<div>
														<div>{cartItem?.productDetails[0]?.name}</div>
														{cartItem?.variants?.pots ? (
															<div className="text-secondary" style={{ fontSize: 14 }}>
																({cartItem?.variants?.pots} Pots)
															</div>
														) : cartItem?.variants?.size ? (
															<div className="text-secondary" style={{ fontSize: 14 }}>
																({cartItem?.variants?.size} Size)
															</div>
														) : (
															""
														)}
														{cartItem?.couponName ? (
															<div className="text-primary" style={{ fontSize: 14 }}>
																{cartItem?.couponName}
															</div>
														) : (
															""
														)}
														<div className="mt-1">Qty : {cartItem?.quantity}</div>
													</div>
												</div>
												{cartItem?.sale_price ? (
													<div className="col-3 text-end" style={{fontSize:"14px"}}>
														<div className="text-decoration-line-through ">
															<CurrencyConvertComp
																amount={
																	cartItem?.productDetails[0]?.price *
																	cartItem?.quantity
																}
															/>
														</div>
														<div className="ml-1">
															<CurrencyConvertComp
																amount={cartItem?.sale_price * cartItem?.quantity}
															/>
														</div>
													</div>
												) : (
													<div className="col-3 text-end" style={{fontSize:"14px"}}>
														<CurrencyConvertComp
															amount={
																cartItem?.productDetails[0]?.price * cartItem?.quantity
															}
														/>
													</div>
												)}
											</div>
											{cartItem?.productDetail[0]?.subProduct?.length ? (
												<div className="d-grid gap-2" style={{ paddingLeft: 10 }}>
													{cartItem.productDetail[0].subProduct.map((subItem, subId) => (
														<div
															key={subId}
															className="row w-100 gap-2 justify-content-between pb-1"
														>
															<div className="d-flex gap-3 col-12 ">
																<LazyLoadImage
																	src={subItem?.productDetailsObj?.productImageUrl}
																	alt={
																		subItem?.productDetailsObj?.imageAltText ||
																		subItem?.productDetailsObj?.name
																	}
																	style={{ width: 50, height: 50 }}
																	className="border border-secondary "
																/>
																<div>
																	<div>{subItem?.productDetailsObj?.name}</div>
																	<div className="mt-1">
																		Qty : {subItem?.quantity}
																	</div>
																</div>
															</div>
														</div>
													))}
												</div>
											) : (
												""
											)}
										</div>
									)
								)}
							</div>
						) : (
							<div>Your cart is empty</div>
						)}
						<hr />
						{defaultAddress ? (
							<div>
								{" "}
								{`OrderNotes : ${defaultAddress?.orderNotes ? defaultAddress?.orderNotes : ""}`}
								<div>
									{editMode ? (
										<div>
											<FormControl
												style={{
													marginBottom: "5px",
													height: "3rem",
													border: "2px solid rgb(206, 212, 218)",
												}}
												type="text"
												placeholder="Enter order note here"
												value={newOrderNotes}
												onChange={handleInputChange}
											/>
											<Button
												variant="primary"
												style={{
													backgroundColor: "black",
													marginTop: "15px",
													width: "100%",
													height: "45px",
													marginBottom: "10px",
												}}
												onClick={updateOrdernotes}
											>
												Save
											</Button>
											{/* <button onClick={updateOrdernotes}>Save</button> */}
										</div>
									) : (
										<div>
											<span
												style={{ cursor: "pointer", textDecoration: "underline" }}
												onClick={handleEditClick}
											>
												<FaEdit style={{ fontSize: "1.3em", margin: "3px" }} />
												Edit
											</span>
										</div>
									)}
								</div>
							</div>
						) : (
							""
						)}
						<hr />

						<div>
							<div className="d-flex gap-2 align-items-center cursor-pointer">
								<CiGift style={{ width: 30, height: 30 }} />
								<span className="text-decoration-underline ">Enter a promo code</span>
							</div>
							<div className="mt-2">
								<input
									value={couponCode}
									disabled={couponApplied}
									onChange={(e) => {
										if (
											e.target.value == "" ||
											e.target.value == undefined ||
											e.target.value == null
										) {
											setCouponError("Coupon code is empty");
										} else {
											setCouponError("");
										}
										setCouponCode(e.target.value);
									}}
									name="couponCode"
									style={{
										borderColor:
											couponError && !couponApplied
												? "#dc3545"
												: couponApplied
												? "#198754"
												: "#000000",
										background:
											couponError && !couponApplied ? "#f8d7da" : couponApplied ? "#d1e7dd" : "",
									}}
									className={`form-control border-2`}
									placeholder="ex. SUMMERSALE20"
								/>
								{couponApplied ? (
									<div className="mt-2 text-success fw-bold">
										You Saved <CurrencyConvertComp amount={couponDiscount} />
									</div>
								) : (
									""
								)}
								{couponError ? <div className="mt-2 text-danger fw-bold">{couponError}</div> : ""}
								<Button
									type="button"
									style={{ minHeight: 44 }}
									disabled={
										couponError || couponCode == "" || couponCode == undefined || couponLoading
									}
									className={`mt-2 btn btn-dark w-100 d-flex justify-content-center align-items-center gap-1`}
									onClick={() => {
										if (couponApplied) {
											handleRemoveCoupon();
										} else {
											applyCoupon();
										}
									}}
								>
									{couponLoading ? <Spinner animation="border" /> : ""}
									{couponApplied ? "Remove" : "Apply"}
								</Button>
							</div>
						</div>
						<hr />

						<div>
							<div className="d-flex justify-content-between ">
								<div>Subtotal</div>
								<div className="d-flex gap-1 ">
									{couponApplied &&
									currentCoupon?.apply_to !== "minimum_order_subtotal_shipping" &&
									currentCoupon?.type !== "free_shipping" ? (
										<>
											<span className="text-decoration-line-through ">
												<CurrencyConvertComp amount={subTotal} />
											</span>{" "}
											<span>
												<CurrencyConvertComp amount={discountedSubTotal} />
											</span>
										</>
									) : couponApplied &&
									  currentCoupon?.apply_to === "minimum_order_subtotal_shipping" ? (
										<span className="">
											<CurrencyConvertComp amount={subTotal} />
										</span>
									) : (
										<span className="">
											<CurrencyConvertComp amount={subTotal} />
										</span>
									)}
								</div>
							</div>
							<div className="d-flex justify-content-between mt-1">
								<div>Delivery</div>
								<div className="d-flex gap-1 ">
									{freeDelivery ? (
										<span className="text-decoration-line-through">
											<CurrencyConvertComp amount={originalDeliveryCharge} />
										</span>
									) : (
										""
									)}
									<span>
										{defaultAddress?.country ? (
											<CurrencyConvertComp amount={deliveryCharge} />
										) : (
											"-"
										)}
									</span>
								</div>
							</div>
							{currentCoupon !== null ? (
								<div className="d-flex justify-content-between mt-1">
									<div>
										Promo code <span className="text-primary">{currentCoupon?.code}</span>
									</div>
									<div>
										<span></span>
										<span>
											- <CurrencyConvertComp amount={couponDiscount} />
										</span>
									</div>
								</div>
							) : (
								""
							)}
							{defaultAddress?.country == "United Kingdom" ? (
								<div className="d-flex justify-content-between ">
									<div>VAT</div>
									<div>
										<span></span>
										<span>{vatCharge}%</span>
									</div>
								</div>
							) : (
								""
							)}
						</div>
						<hr />

						<div className="d-flex justify-content-between fs-5">
							<div>Total</div>
							<div className="d-flex gap-2">
								<div>
									{currentCoupon?.apply_to == "minimum_order_subtotal_shipping" ? (
										<span className="text-decoration-line-through ">
											<CurrencyConvertComp amount={Number(subTotal) + deliveryCharge} />
										</span>
									) : (
										""
									)}
								</div>
								<span>
									<CurrencyConvertComp amount={totalPrice} />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
