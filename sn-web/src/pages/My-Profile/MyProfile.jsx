import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiPOST } from "../../../src/utilities/apiHelpers";
import { updateUser } from "../../redux/users/users";

const MyProfile = () => {
	const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
	const { userData } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [Title, setTitle] = useState(userData?.userTitle);
	const [fname, setfname] = useState(userData?.fName);
	const [lname, setlname] = useState(userData?.lName);
	const [phoneNo, setphoneNo] = useState(userData?.phoneNo);

	const dropdownArray = [
		{
			Title: "Your Community Page URl",
			Disc: "https://www.thenusife.com/profile",
			Botton: "Edit URL",
		},
		{
			Title: "Profile Visiblity",
			Disc: "Hide Your Profile Page , and social aspects of your account",
			Botton: "Make Profile Private",
		},
		{
			Title: "Blocked Members",
			Disc: "You have a no blocked members",
		},
	];

	const handleClickDropdown = (index) => {
		setOpenDropdownIndex(index === openDropdownIndex ? -1 : index);
	};
	const handlePhoneNoChange = (input) => {
		const sanitizedInput = input.replace(/[^0-9+]|(?!^)\+/g, "");

		// const sanitizedInput = numericInput.startsWith('+') ? numericInput : '';

		setphoneNo(sanitizedInput);
	};
	const updateUserDetails = async (product) => {
		try {
			let payload = { userTitle: Title, fName: fname, lName: lname, phoneNo: phoneNo };
			const response = await apiPOST("/v1/user/update-my-account", payload);
			console.log("response", response);
			if (response?.data?.status) {
				dispatch(updateUser({ user: response?.data?.data }));

				toast.success("Information Updated Successfully");
			} else {
				toast.error("Somthin Whent Wrong");
			}
		} catch (error) {
			return false;
		}
	};
	useEffect(() => {
		if (!userData) {
			toast.error("Please login first");
			navigate("/");
		}
	}, []);
	return (
		<>
			<div className=" container-fluid ">
				<div className="">
					<div className="px-0 row d-flex justify-content-center">
						<div className="col-12 mt-lg-3 col-lg-3 px-0">
							<ProfileMenu />
						</div>
						<div className="col-10 mt-5 mt-lg-3 col-md-8 px-0 mb-4 mx-auto">
							<div className=" container ">
								<div className="px-2 px-lg-5 mt-4 ">
									<div className="row d-flex justify-content-between">
										<div className="col-12">
											<h1 style={{ fontSize: "32px" }} className="anton">
												My Account
											</h1>
											<p className="mt-3">View and edit your personal info below.</p>
										</div>
										<div className="col-12 col-md-7 ">
											<div className="d-flex justify-content-evenly justify-content-md-end">
												<div className="px-0 px-md-2">
													<button className="px-5 px-md-3   py-1 bg-white  text-dark">
														Discard
													</button>
												</div>
												<Button
													onClick={updateUserDetails}
													className=""
													Title={"Update Info"}
												/>
											</div>
										</div>
									</div>
									<div className="border border-1 border-dark border-top-0 mt-4"></div>
									<div className="mt-4">
										<div>
											<div>
												<p className="mb-0" style={{ fontSize: "28px" }}>
													Display Info
												</p>
												<p className="mt-1">
													Your profile card is visible to all members of this site{" "}
												</p>
											</div>
											<div className="row mt-4">
												<div className=" col-sm-6 col-12 ">
													<div className="mb-2">
														<label>Display Name *</label>
													</div>
													<input
														type="text"
														className="px-2 py-1 w-100"
														disabled
														value={userData?.fName + " " + userData?.lName}
													/>
												</div>
												<div className="mt-3 mt-sm-0 col-sm-6 col-12 ">
													<div className="mb-2">
														<label>Title</label>
													</div>
													<input
														onChange={(e) => setTitle(e.target.value)}
														value={Title}
														type="text"
														className="px-2 py-1 w-100"
													></input>
												</div>
											</div>
										</div>
										<div className="border border-1 border-dark border-top-0 mt-5"></div>
									</div>

									<div className="mt-4">
										<div>
											<div>
												<p className="mb-0" style={{ fontSize: "28px" }}>
													Account
												</p>
											</div>
											<div className="mt-1">
												<p>Update your personal information.</p>
											</div>
										</div>
										<div>
											<label>Login Email:</label>
											<p className="" style={{ fontSize: "14px", marginTop: "-5px" }}>
												{userData?.email}
											</p>
											<p className="opacity-50" style={{ marginTop: "-18px" }}>
												Your Login email can't be changed
											</p>
										</div>
										<div>
											<div className="row">
												<div className=" col-md-6 col-12 ">
													<div className="mb-2 ">
														<label>First Name </label>
													</div>
													<input
														value={fname}
														onChange={(e) => setfname(e.target.value)}
														type="text"
														className="w-100 px-2 py-1"
													></input>
												</div>
												<div className=" mt-3 mt-sm-0 col-md-6 col-12 ">
													<div className="mb-2 ">
														<label>Last Name</label>
													</div>
													<input
														value={lname}
														onChange={(e) => setlname(e.target.value)}
														type="text"
														className="w-100 px-2 py-1"
													></input>
												</div>
											</div>
											<div className="row mt-4">
												<div className=" col-md-6 col-12 ">
													<div className="mb-2 ">
														<label>Email * </label>
													</div>
													<input
														type="text"
														disabled
														className="w-100 px-2 py-1"
														value={userData?.email}
													/>
												</div>
												<div className=" mt-3 mt-sm-0 col-md-6 col-12 ">
													<div className="mb-2 ">
														<label>Phone</label>
													</div>
													<input
														type="text"
														value={phoneNo}
														onChange={(e) => handlePhoneNoChange(e.target.value)}
														className="w-100 px-2 py-1"
													></input>
												</div>
											</div>
										</div>
										<div className="row mt-5    mb-5">
											<div className="col-12 ">
												<div className="d-flex justify-content-evenly justify-content-md-end">
													<div className="px-0 px-md-3">
														<button className="px-5 px-md-4    py-1 bg-white  text-dark">
															Discard
														</button>
													</div>
													<Button
														onClick={updateUserDetails}
														className=""
														Title={"Update Info"}
													/>
												</div>
											</div>
										</div>
									</div>
									{/* <div className='border border-1 border-dark border-top-0 mt-5'></div>
								<div className='mt-4'>
									<div>
										<p className='mb-0' style={{ fontSize: "28px" }}>Account Settings</p>
										<p className='mt-1'>Update your personal information.</p>

									</div>
								</div>
								<div className='mt-4'>
									{dropdownArray.map((item, i) => (
										<div key={i}>
											<div onClick={() => handleClickDropdown(i)} className='py-3' style={{ cursor: "pointer" }}>
												<div>
													<p className='mb-0' style={{ fontSize: "20px" }}>{item.Title}</p>
												</div>
												<div>
													{/* for dropdown svg */}
									{/* </div>
											</div>
											{openDropdownIndex === i && (
												<div>
													<p className='mt-1 mb-1'>{item.Disc}</p>
													<Link className='text-dark'> <span>{item.Botton}</span> </Link>
												</div>
											)}
											<div className={`${'border border-1 border-dark border-top-0 mt-4'} `}></div>
										</div>
									))}
								</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyProfile;
