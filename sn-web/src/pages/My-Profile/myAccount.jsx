import React, { useEffect, useState } from 'react'
import ProfileMenu from './ProfileMenu'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiPOST } from '../../utilities/apiHelpers';
import { updateUser } from '../../redux/users/users';

const MyAccount = () => {
	const { userData } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [Title, setTitle] = useState(userData?.userTitle);
	const [fname, setfname] = useState(userData?.fName);
	const [lname, setlname] = useState(userData?.lName);
	const [phoneNo, setphoneNo] = useState(userData?.phoneNo);

	const handlePhoneNoChange = (input) => {
		const sanitizedInput = input.replace(/[^0-9+]|(?!^)\+/g, "");
		setphoneNo(sanitizedInput);
	};

	const reset = ()=>{
		setTitle(userData?.userTitle)
		setfname(userData?.fName)
		setlname(userData?.lName)
		setphoneNo(userData?.phoneNo)
	}
	const updateUserDetails = async (product) => {
		try {
			let payload = { userTitle: Title, fName: fname, lName: lname, phoneNo: phoneNo };
			const response = await apiPOST("/v1/user/update-my-account", payload);

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
		<div className='py-5 d-flex justify-content-center'>
			<div className='container'>
				<div className='row gap-5 gap-lg-0'>
					<div className='col-lg-4'>
						<ProfileMenu />
					</div>
					<div className='col-lg-8'>
						<div className="anton fs-2">
							My Account
						</div>
						<div className='mt-2'>
							View and edit your personal info below.
						</div>
						<div className="mt-3 d-flex gap-3 align-items-center justify-content-end">
							<button
								onClick={reset}
								className="btn btn-outline-dark"
							>
								Discard
							</button>
							<button
								onClick={updateUserDetails}
								className="btn btn-dark"
							>
								Update Info
							</button>
						</div>
						<hr className='' />
						<div>
							<div>
								<div className="fs-4">
									Display Info
								</div>
							</div>
							<div className="row mt-2">
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
						<hr />
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

							<div className="mt-3 d-flex gap-3 align-items-center justify-content-end">
								<button
									onClick={reset}
									className="btn btn-outline-dark"
								>
									Discard
								</button>
								<button
									onClick={updateUserDetails}
									className="btn btn-dark"
								>
									Update Info
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAccount