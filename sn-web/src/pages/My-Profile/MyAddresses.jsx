import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import ButtonNew from "../../components/Button/Button";
import { apiGET, apiPOST } from "../../utilities/apiHelpers";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyAddAddresses from "./MyAddAddresses";

const MyAddresses = ({ address }) => {
	const [showModal, setShowModal] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState({});
	const [addresses, setAddresses] = useState([]);
	const { userData } = useSelector((state) => state.user);
	const [selectId, setSelectId] = useState("");
	const [showAdd, setShowAdd] = useState(false);
	const [showEdit, setShowEdit] = useState(true);
	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModalEdite = (addressId) => {
		setSelectId(addressId);
		setShowModalEdit((prevVisibility) => ({
			...prevVisibility,
			[addressId]: !prevVisibility[addressId],
		}));
	};
	const navigate = useNavigate();

	const getMyAdderss = async () => {
		try {
			const response = await apiGET(`/v1/address/get-my-address`);

			if (response?.status === 200) {
				setAddresses(response?.data?.data);
			} else {
				console.error("Error fetching Cart data:", response.error);
			}
		} catch (error) {
			console.error("Error fetching collection data:", error);
		}
	};

	const RemoveAddress = async (id) => {
		try {
			const response = await apiPOST(`/v1/address/remove-address/${id}`);
			if (response?.status === 200) {
				//setSelectId(id);
				toast.success("Address Removed Successfully");

				getMyAdderss(); // Refresh the address list after adding a new address
			} else {
				console.error("Error adding address:", response.error);
				toast.error(response?.data?.data);
			}
		} catch (error) {
			console.error("Error adding address:", error);
			toast.error(error);
		}
	};

	useEffect(() => {
		getMyAdderss();
		if (!userData) {
			toast.error("Please login first");
			navigate("/");
		}
	}, [showModal, showModalEdit]);
	useEffect(() => {
		getMyAdderss();
		setSelectId("");
	}, [showAdd, showEdit]);

	return (
		<div className='py-5 d-flex justify-content-center'>
			<div className='container'>
				<div className='row gap-5 gap-lg-0'>
					<div className='col-lg-4'>
						<ProfileMenu />
					</div>
					<div className='col-lg-8'>
						<div className="anton fs-2">
							My Address
						</div>
						<div className='mt-2'>
							Add and manage the addresses you use often.
						</div>
						<hr />
						<div className="  mt-3">
							<div className="  row ">
								{addresses?.length > 0 ? (
									addresses.map((item, index) => {
										return (
											<>
												{!(selectId === item.id) ? (
													<div className=" ">
														<div className="d-flex gap-2">
															<p>{item.firstName} </p>
															<p>{item.lastName}</p>
														</div>
														{/* <p>{addresses[0].companyName}</p> */}
														<p>{item.address}</p>
														<p>{item.addressLine2}</p>
														<p>{item.city}</p>
														<div className="d-flex gap-2">
															<p>{item.state}</p>
															<p>{item.zip}</p>
														</div>
														<p>{item.country}</p>
														<p>{item.phone}</p>
														<div className="d-flex justify-content-between  cursor-pointer">
															<div className="d-flex justify-content-between gap-4">
																<p
																	onClick={() =>
																		handleCloseModalEdite(item?.id)
																	}
																>
																	Edit
																</p>
																<p onClick={() => RemoveAddress(item?.id)}>
																	Remove
																</p>
															</div>
															<p>
																{item?.isDefault ? "Default Address" : ""}
															</p>
														</div>
														<hr />
													</div>
												) : (
													<div className="">
														<MyAddAddresses
															address={item}
															setShowEdit={setShowEdit}
															setSelectIdEdit={setSelectId}
															getMyAdderss={getMyAdderss}
														/>
													</div>
												)}
											</>
										);
									})
								) : (
									<div className=" w-100  mt-4 col-12">
										{addresses?.length === 0 && !showAdd && (
											<div>
												<div className="fs-4 text-center my-5">
													You haven't saved any addresses yet.
												</div>
												<div className="mb-4 ">
													<ButtonNew
														onClick={() => {
															handleShowModal();
															setShowAdd(!showAdd);
														}}
														Title={"Add New Address"}
														className={"px-sm-3 py-sm-2  "}
													>
														{" "}
													</ButtonNew>
												</div>
											</div>
										)}
										{addresses?.length === 0 && showAdd && (
											<div className=" ">
												<MyAddAddresses setShowAdd={setShowAdd} />
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default MyAddresses;
